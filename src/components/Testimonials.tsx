import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";

const testimonials = [
  {
    name: "Aditi K.",
    text: "Lett-us has changed my lunch routine! So fresh and filling. I love that I don't have to think about what to eat anymore.",
    rating: 5
  },
  {
    name: "Rahul M.",
    text: "The subscription plan is perfect for my busy schedule. Healthy, delicious, and delivered on time every day!",
    rating: 5
  },
  {
    name: "Priya S.",
    text: "Best salad bowls in Pune! The millet chickpea salad is my absolute favorite. Great value for money.",
    rating: 5
  },
  {
    name: "Vikram P.",
    text: "Finally, healthy food that actually tastes good! The wraps are incredible and keep me energized throughout the day.",
    rating: 5
  }
];

const Testimonials = () => {
  const { ref, isVisible, getItemStyle } = useStaggerAnimation({ 
    threshold: 0.2,
    staggerDelay: 150 
  });

  return (
    <section 
      ref={ref as any}
      className={`py-20 bg-gradient-to-b from-background to-muted/30 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Loved by Our Community 💚
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of happy customers eating healthier every day
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              style={getItemStyle(index)}
              className={`border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
