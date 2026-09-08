import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Utensils, Calendar, TrendingDown, LogOut } from "lucide-react";

interface Profile {
  full_name: string;
  phone: string;
}

interface Subscription {
  id: string;
  plan_name: string;
  total_meals: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

interface MealConsumed {
  id: string;
  meal_date: string;
  meal_type: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [mealsConsumed, setMealsConsumed] = useState<MealConsumed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
    loadDashboardData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile(profileData);

      // Load active subscription
      const { data: subData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      setSubscription(subData);

      // Load meals consumed
      if (subData) {
        const { data: mealsData } = await supabase
          .from("meals_consumed")
          .select("*")
          .eq("subscription_id", subData.id)
          .order("meal_date", { ascending: false });

        setMealsConsumed(mealsData || []);

        // Subscribe to real-time updates
        const channel = supabase
          .channel("dashboard-changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "meals_consumed",
              filter: `subscription_id=eq.${subData.id}`,
            },
            () => {
              loadMeals(subData.id);
            }
          )
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "subscriptions",
              filter: `id=eq.${subData.id}`,
            },
            () => {
              loadSubscription(user.id);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    } catch (error: any) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMeals = async (subscriptionId: string) => {
    const { data } = await supabase
      .from("meals_consumed")
      .select("*")
      .eq("subscription_id", subscriptionId)
      .order("meal_date", { ascending: false });

    setMealsConsumed(data || []);
  };

  const loadSubscription = async (userId: string) => {
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    setSubscription(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  const mealsLeft = subscription ? subscription.total_meals - mealsConsumed.length : 0;
  const progressPercentage = subscription
    ? ((mealsConsumed.length / subscription.total_meals) * 100)
    : 0;

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome back, {profile?.full_name || "Subscriber"}!
            </h1>
            <p className="text-muted-foreground">Track your meal subscription</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {!subscription ? (
          <Card className="border-border/50 shadow-lg">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You don't have an active subscription yet.</p>
              <Button onClick={() => navigate("/")}>Browse Plans</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Subscription Overview */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  {subscription.plan_name}
                </CardTitle>
                <CardDescription>
                  Active from {new Date(subscription.start_date).toLocaleDateString()} to{" "}
                  {new Date(subscription.end_date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Meal Balance</span>
                    <span className="text-sm text-muted-foreground">
                      {mealsLeft} of {subscription.total_meals} remaining
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Utensils className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Meals Left</p>
                      <p className="text-2xl font-bold">{mealsLeft}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <TrendingDown className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Consumed</p>
                      <p className="text-2xl font-bold">{mealsConsumed.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <Calendar className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Days Left</p>
                      <p className="text-2xl font-bold">
                        {Math.max(
                          0,
                          Math.ceil(
                            (new Date(subscription.end_date).getTime() - new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Meals */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Meals</CardTitle>
                <CardDescription>Your meal consumption history</CardDescription>
              </CardHeader>
              <CardContent>
                {mealsConsumed.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No meals consumed yet</p>
                ) : (
                  <div className="space-y-3">
                    {mealsConsumed.slice(0, 10).map((meal) => (
                      <div
                        key={meal.id}
                        className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{meal.meal_type || "Meal"}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(meal.meal_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Utensils className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
