import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Leaf, Wheat, Zap, ChevronDown, Bean, Egg, Sprout, Droplets } from "lucide-react";

const DaysFlavours = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [showBaseGuide, setShowBaseGuide] = useState(false);
  const [showProteinGuide, setShowProteinGuide] = useState(false);
  const [showDressingGuide, setShowDressingGuide] = useState(false);

  return (
    <section 
      ref={ref as any}
      className={`py-20 bg-gradient-to-b from-muted/50 via-background to-muted/30 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            7 Days, 7 Flavours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every day brings a new delicious and nutritious combination
          </p>
        </div>
        
        {/* Choose Your Bowl Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Choose Your Bowl • Your Way
            </h3>
            <p className="text-lg text-muted-foreground">
              Customize your perfect meal in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <button 
              onClick={() => setShowBaseGuide(!showBaseGuide)}
              className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="text-xl font-bold text-foreground">Pick Your Base</h4>
              <p className="text-muted-foreground">Rice / Millet / Quinoa</p>
              <ChevronDown className={`h-5 w-5 mx-auto text-primary transition-transform duration-300 ${showBaseGuide ? 'rotate-180' : ''}`} />
            </button>

            {/* Step 2 */}
            <button 
              onClick={() => setShowProteinGuide(!showProteinGuide)}
              className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="text-xl font-bold text-foreground">Pick Your Protein</h4>
              <p className="text-muted-foreground">Paneer / Tofu / Chickpeas / Sprouts</p>
              <ChevronDown className={`h-5 w-5 mx-auto text-secondary transition-transform duration-300 ${showProteinGuide ? 'rotate-180' : ''}`} />
            </button>

            {/* Step 3 */}
            <button 
              onClick={() => setShowDressingGuide(!showDressingGuide)}
              className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="text-xl font-bold text-foreground">Pick Your Dressing</h4>
              <p className="text-muted-foreground">Choose from our signature dressings</p>
              <ChevronDown className={`h-5 w-5 mx-auto text-accent transition-transform duration-300 ${showDressingGuide ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Base Options Guide */}
        {showBaseGuide && (
          <div className="mt-12 animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Choose Your Perfect Base
              </h3>
              <p className="text-lg text-muted-foreground">
                Each base brings unique nutritional benefits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Rice */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                    <Wheat className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-3 text-center">Rice</h4>
                  <p className="text-muted-foreground text-center mb-6">
                    Classic comfort grain
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Quick energy source</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Easy to digest</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Naturally gluten-free</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Rich in B vitamins</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Millet */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shadow-lg">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-3 text-center">Millet</h4>
                  <p className="text-muted-foreground text-center mb-6">
                    Ancient superfood grain
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">High in protein & fiber</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Low glycemic index</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Rich in antioxidants</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Heart-healthy choice</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quinoa */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                    <Leaf className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-3 text-center">Quinoa</h4>
                  <p className="text-muted-foreground text-center mb-6">
                    Complete protein powerhouse
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Complete protein source</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">All 9 essential amino acids</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">High in magnesium & iron</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">Supports muscle recovery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Protein Options Guide */}
        {showProteinGuide && (
          <div className="mt-12 animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Power Up With Protein
              </h3>
              <p className="text-lg text-muted-foreground">
                Choose your favorite plant-based protein
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Paneer */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shadow-lg">
                    <Egg className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Paneer</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Creamy cottage cheese
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">High in calcium</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">18g protein per 100g</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Rich & satisfying</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tofu */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                    <Leaf className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Tofu</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Versatile soy protein
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Complete protein</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Low in calories</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Rich in iron</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chickpeas */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                    <Bean className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Chickpeas</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Fiber-rich legumes
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">High in fiber</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Keeps you full longer</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Heart healthy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sprouts */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
                    <Sprout className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Sprouts</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Living nutrition
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Enzyme rich</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Easy to digest</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Packed with vitamins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dressing Options Guide */}
        {showDressingGuide && (
          <div className="mt-12 animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Finish With Flavor
              </h3>
              <p className="text-lg text-muted-foreground">
                Our signature house-made dressings
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Tahini */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                    <Droplets className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Tahini</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Creamy sesame bliss
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Rich in healthy fats</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Nutty & smooth</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lemon Herb */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                    <Zap className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Lemon Herb</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Light & zesty
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Fresh citrus notes</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Low calorie option</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peanut Ginger */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shadow-lg">
                    <Bean className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Peanut Ginger</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Asian-inspired
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Bold & savory</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Anti-inflammatory</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mint Yogurt */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                    <Leaf className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2 text-center">Mint Yogurt</h4>
                  <p className="text-muted-foreground text-center text-sm mb-4">
                    Cool & refreshing
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Probiotic-rich</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-xs text-foreground">Aids digestion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DaysFlavours;
