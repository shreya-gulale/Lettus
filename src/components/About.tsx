import { Leaf, Heart, Globe, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const values = [
  {
    icon: Leaf,
    title: "Fresh",
    description: "Made daily with the freshest ingredients"
  },
  {
    icon: Heart,
    title: "Wholesome",
    description: "Nutritious meals that fuel your body"
  },
  {
    icon: Globe,
    title: "Sustainable",
    description: "Eco-friendly packaging and practices"
  },
  {
    icon: Sparkles,
    title: "Made with Love",
    description: "Every bowl crafted with care"
  }
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={ref as any}
      className={`py-20 bg-gradient-to-b from-background via-muted/20 to-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Our Story
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            At <span className="text-primary font-semibold">Lett-us Eat Healthy</span>, we believe eating right shouldn't be boring! 
            Our mission is to make healthy eating easy, accessible, and exciting — one salad, wrap, or smoothie at a time.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you're working from home, hitting the gym, or just craving something fresh, 
            we've got you covered with delicious, nutritious meals delivered right to your door.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-gradient-to-br from-card to-muted/30 hover:from-primary/10 hover:to-secondary/10 border-2 border-transparent hover:border-primary/20 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl group"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
