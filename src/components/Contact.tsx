import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={ref as any}
      className={`py-20 bg-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Let's Get in Touch!
            </h2>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/20 rounded-full">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">WhatsApp</h3>
                    <p className="text-muted-foreground">Chat with us instantly</p>
                  </div>
                </div>
                <Button 
                  onClick={() => window.open("https://wa.me/8261811035", "_blank")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  Message Us
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Email</h3>
                    <p className="text-muted-foreground text-sm">lettuseathealthy@gmail.com</p>
                  </div>
                </div>
                <Button 
                  onClick={() => window.location.href = "mailto:lettuseathealthy@gmail.com"}
                  variant="outline"
                  className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  size="lg"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Location</h3>
                    <p className="text-muted-foreground">Pune, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/20 rounded-full">
                    <Instagram className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Instagram</h3>
                    <p className="text-muted-foreground">Follow us for daily updates</p>
                  </div>
                </div>
                <Button 
                  onClick={() => window.open("https://www.instagram.com/lett_us_eathealthy/", "_blank")}
                  variant="outline"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  size="lg"
                >
                  Follow Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
