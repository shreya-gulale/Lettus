import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users, Package, Utensils, Shield, LogOut } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
}

interface Subscription {
  id: string;
  user_id: string;
  plan_name: string;
  total_meals: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

interface MealRecord {
  id: string;
  user_id: string;
  subscription_id: string;
  meal_date: string;
  meal_type: string;
}

interface UserWithProfile {
  user_id: string;
  full_name: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [meals, setMeals] = useState<MealRecord[]>([]);
  const [userProfiles, setUserProfiles] = useState<Map<string, string>>(new Map());
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedSubId, setSelectedSubId] = useState("");

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      loadAllData();
    } catch (error) {
      console.error("Admin check error:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllData = async () => {
    // Load profiles
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    setProfiles(profilesData || []);

    // Create a map of user_id to full_name
    const profileMap = new Map<string, string>();
    profilesData?.forEach((p) => {
      profileMap.set(p.user_id, p.full_name || "Unknown");
    });
    setUserProfiles(profileMap);

    // Load subscriptions
    const { data: subsData } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    setSubscriptions(subsData || []);

    // Load meals
    const { data: mealsData } = await supabase
      .from("meals_consumed")
      .select("*")
      .order("meal_date", { ascending: false });

    setMeals(mealsData || []);
  };

  const handleCreateSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from("subscriptions").insert({
        user_id: formData.get("user_id") as string,
        plan_name: formData.get("plan_name") as string,
        total_meals: parseInt(formData.get("total_meals") as string),
        start_date: formData.get("start_date") as string,
        end_date: formData.get("end_date") as string,
        is_active: true,
      });

      if (error) throw error;

      toast.success("Subscription created successfully!");
      loadAllData();
      e.currentTarget.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to create subscription");
    }
  };

  const handleAddMeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from("meals_consumed").insert({
        user_id: selectedUserId,
        subscription_id: formData.get("subscription_id") as string,
        meal_date: formData.get("meal_date") as string,
        meal_type: formData.get("meal_type") as string,
      });

      if (error) throw error;

      toast.success("Meal added successfully!");
      loadAllData();
      e.currentTarget.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to add meal");
    }
  };

  const handleToggleSubscription = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("subscriptions")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Subscription ${!currentStatus ? "activated" : "deactivated"}`);
      loadAllData();
    } catch (error: any) {
      toast.error(error.message || "Failed to update subscription");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              Admin Panel
            </h1>
            <p className="text-muted-foreground">Manage subscriptions and user data</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{profiles.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Package className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                      <p className="text-2xl font-bold">
                        {subscriptions.filter((s) => s.is_active).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <Utensils className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Meals Served</p>
                      <p className="text-2xl font-bold">{meals.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>View and manage user profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>User ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">{profile.full_name || "N/A"}</TableCell>
                        <TableCell>{profile.phone || "N/A"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {profile.user_id}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <Card className="border-border/50 shadow">
              <CardHeader>
                <CardTitle>Create Subscription</CardTitle>
                <CardDescription>Add a new subscription for a user</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateSubscription} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="user_id">User</Label>
                      <Select name="user_id" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                          {profiles.map((profile) => (
                            <SelectItem key={profile.user_id} value={profile.user_id}>
                              {profile.full_name || profile.user_id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plan_name">Plan Name</Label>
                      <Input id="plan_name" name="plan_name" required placeholder="7-Day Plan" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total_meals">Total Meals</Label>
                      <Input
                        id="total_meals"
                        name="total_meals"
                        type="number"
                        required
                        min="1"
                        placeholder="7"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input id="start_date" name="start_date" type="date" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end_date">End Date</Label>
                      <Input id="end_date" name="end_date" type="date" required />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Create Subscription</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>All Subscriptions</CardTitle>
                <CardDescription>Manage existing subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Meals</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">
                          {userProfiles.get(sub.user_id) || "Unknown"}
                        </TableCell>
                        <TableCell>{sub.plan_name}</TableCell>
                        <TableCell>{sub.total_meals}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(sub.start_date).toLocaleDateString()} -{" "}
                          {new Date(sub.end_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              sub.is_active
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {sub.is_active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleSubscription(sub.id, sub.is_active)}
                          >
                            {sub.is_active ? "Deactivate" : "Activate"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meals" className="space-y-4">
            <Card className="border-border/50 shadow">
              <CardHeader>
                <CardTitle>Add Meal Record</CardTitle>
                <CardDescription>Log a meal consumption for a user</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMeal} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="meal_user">User</Label>
                      <Select
                        onValueChange={(value) => {
                          setSelectedUserId(value);
                          setSelectedSubId("");
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                          {profiles.map((profile) => (
                            <SelectItem key={profile.user_id} value={profile.user_id}>
                              {profile.full_name || profile.user_id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subscription_id">Subscription</Label>
                      <Select name="subscription_id" required disabled={!selectedUserId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subscription" />
                        </SelectTrigger>
                        <SelectContent>
                          {subscriptions
                            .filter((s) => s.user_id === selectedUserId && s.is_active)
                            .map((sub) => (
                              <SelectItem key={sub.id} value={sub.id}>
                                {sub.plan_name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meal_date">Date</Label>
                      <Input id="meal_date" name="meal_date" type="date" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meal_type">Meal Type</Label>
                      <Input
                        id="meal_type"
                        name="meal_type"
                        placeholder="e.g., Salad Bowl, Wrap"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Add Meal Record</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle>Meal History</CardTitle>
                <CardDescription>All recorded meal consumptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Meal Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meals.map((meal) => (
                      <TableRow key={meal.id}>
                        <TableCell className="font-medium">
                          {userProfiles.get(meal.user_id) || "Unknown"}
                        </TableCell>
                        <TableCell>{new Date(meal.meal_date).toLocaleDateString()}</TableCell>
                        <TableCell>{meal.meal_type || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
