import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroSalad from "@/assets/hero-salad.png";
import logo from "@/assets/logo.png";
const Hero = () => {
  const navigate = useNavigate();
  const handleOrderClick = () => {
    window.open("https://wa.me/8261811035?text=Hello%20Lett-Us%20Eat%20Healthy!%20I'd%20like%20to%20place%20an%20order.", "_blank");
  };
  return <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0">
        <img 
          src={heroSalad} 
          alt="Fresh healthy salad bowl"
          className="w-full h-full object-cover"
        />
        {/* Left-to-right overlay: readable text on the left, image blends in smoothly toward the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/10 pointer-events-none" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
            Fresh, Healthy,{" "}
            <span className="text-primary">Full of Flavours!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/90">
            Wholesome salads, smoothies, and wraps made with real ingredients and a whole lot of love.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleOrderClick} className="bg-gradient-to-r from-accent via-accent to-secondary text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              Order Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-secondary bg-background/80 backdrop-blur-sm hover:bg-secondary hover:text-secondary-foreground shadow-lg hover:shadow-xl">
              View Menu
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('subscription')?.scrollIntoView({
            behavior: 'smooth'
          })} className="border-2 border-primary bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl">
              View Plans
            </Button>
          </div>
          
          {/* Quick highlights */}
          <div className="flex flex-col gap-4 pt-8">
            <div className="inline-flex items-center gap-2 text-sm bg-primary/5 px-3 py-1.5 rounded-full">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">Freshly made daily</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm bg-secondary/10 px-3 py-1.5 rounded-full">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="text-foreground font-medium">Subscription available</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm bg-accent/10 px-3 py-1.5 rounded-full">
              <Heart className="h-5 w-5 text-accent" />
              <span className="text-foreground font-medium">Doorstep delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
