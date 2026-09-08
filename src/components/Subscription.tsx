import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const plans = [{
  name: "7-Meals Plan",
  duration: "14 days",
  pricePerMeal: "₹180",
  total: "₹1,260",
  perks: ["Daily variety", "Taste test before you commit"],
  popular: false
}, {
  name: "15-Meals Plan",
  duration: "30 days",
  pricePerMeal: "₹170",
  total: "₹2,550",
  perks: ["Build healthy habits effortlessly", "Priority custom menu", "Save ₹150"],
  popular: true
}, {
  name: "28-Meals Plan",
  duration: "60 days",
  pricePerMeal: "₹160",
  total: "₹4,480",
  perks: ["Commit to a healthier, happier lifestyle", "Personalized nutrition support", "Save ₹560", "Best value"],
  popular: false
}];
const Subscription = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation({
    threshold: 0.2
  });
  const handleSubscribe = (planName: string) => {
    const message = `Hello Lett-Us Eat Healthy! I am interested in subscribing to your ${planName.toLowerCase()} `;
    window.open(`https://wa.me/8261811035?text=${encodeURIComponent(message)}`, "_blank");
  };
  return <section id="subscription" ref={ref as any} className={`py-20 bg-gradient-to-b from-muted/30 to-background transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Eat Smart, Save More!
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a plan that fits your lifestyle and enjoy fresh, healthy meals every day
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${plan.popular ? 'border-2 border-accent shadow-lg' : 'border border-border'}`}>
              {plan.popular && <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 rounded-bl-lg flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-semibold">Most Popular</span>
                </div>}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-display">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.duration}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-foreground">{plan.pricePerMeal}</p>
                  <p className="text-sm text-muted-foreground mt-1">per meal</p>
                  <p className="text-xl text-primary font-semibold mt-4">Total: {plan.total}</p>
                </div>
                
                <div className="space-y-3 pt-4">
                  {plan.perks.map((perk, perkIndex) => <div key={perkIndex} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{perk}</p>
                    </div>)}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button onClick={() => handleSubscribe(plan.name)} className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`} size="lg">
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-8">All plans include doorstep delivery. New flavours are added regularly!</p>
      </div>
    </section>;
};
export default Subscription;
