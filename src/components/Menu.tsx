import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Plus } from "lucide-react";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { useCart } from "@/contexts/CartContext";
import milletSalad from "@/assets/chickpea.jpg";
import wrap from "@/assets/wrap.jpg";
import vsmoothie from "@/assets/vanilla-smoothie.jpg";
import csmoothie from "@/assets/chocolate-smoothie.jpg";
import ssmoothie from "@/assets/strawberry-smoothie.jpg";
import heroSalad from "@/assets/hero-salad.jpg";
import mexicanSalad from "@/assets/mexican-salad.jpg";
import tofuSalad from "@/assets/tofusalad.jpg";
import quinoasalad from "@/assets/quinoa.jpg";
import trisproutsalad from "@/assets/trisprout.jpg";
import pastasalad from "@/assets/pastasalad.jpg";
import grilledPaneerSalad from "@/assets/grilled-paneer-salad.png";

const sandwichPlaceholder = "/placeholder.svg";

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantityControl = ({ quantity, onDecrease, onIncrease }: QuantityControlProps) => (
  <div className="w-full flex items-center justify-between rounded-full border-2 border-primary bg-background px-5 py-2.5">
    <button
      type="button"
      onClick={onDecrease}
      aria-label="Remove one"
      className="text-primary hover:text-primary/70 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
    </button>
    <span className="font-bold text-foreground">{quantity}</span>
    <button
      type="button"
      onClick={onIncrease}
      aria-label="Add one more"
      className="text-primary hover:text-primary/70 transition-colors"
    >
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

const menuItems = {
  salads: [
    {
      id: 1,
      name: "Millet Chickpea Salad",
      description: "Dahi–Paneer Cream Dressing. Millets with roasted chickpea, beetroot & hung curd, olives, tossed with crisp lettuce and mixed veggies.",
      calories: "264 kcal",
      protein: "13.1g",
      fiber: "7.3g",
      price: 190,
      category: "Salads",
      image: milletSalad,
    },
    {
      id: 2,
      name: "Mexican Bhuddha Bowl",
      description: "Tomato–Garlic Dressing. Cooked rice with cooked beans, guac, cherry tomatoes & grated cheese, tossed with crisp lettuce and mixed veggies.",
      calories: "309 kcal",
      protein: "12g",
      fiber: "9.5g",
      price: 190,
      category: "Salads",
      image: mexicanSalad,
    },
    {
      id: 3,
      name: "Tofu Salad",
      description: "Sesame Soy-Ginger Dressing. Matta rice with marinated tofu, hummus, mushroom, broccoli & tomato salsa, tossed with crisp lettuce and mixed veggies.",
      calories: "277 kcal",
      protein: "17.2g",
      fiber: "6.2g",
      price: 190,
      category: "Salads",
      image: tofuSalad,
    },
    {
      id: 4,
      name: "Grilled Paneer Salad",
      description: "Mint–Cilantro Dressing. Matta rice with grilled paneer, hummus, roasted cauliflower & olives, tossed with crisp lettuce and mixed veggies. Finished with a super-seed crunch.",
      calories: "423 kcal",
      protein: "22g",
      fiber: "7.2g",
      price: 190,
      category: "Salads",
      image: grilledPaneerSalad,
    },
    {
      id: 5,
      name: "Mediterranean Quinoa Salad",
      description: "Classic Tahini Dressing. Boiled quinoa with black beans, red hummus, feta cheese & olives, tossed with crisp lettuce and mixed veggies.",
      calories: "347 kcal",
      protein: "16.9g",
      fiber: "13.7g",
      price: 190,
      category: "Salads",
      image: quinoasalad,
    },
    {
      id: 6,
      name: "Soya Chunks Quinoa Salad",
      description: "Quinoa with cooked soya chunks, hummus, mushroom & broccoli, tossed with crisp lettuce and mixed veggies. A protein-packed, plant-based bowl.",
      calories: "296 kcal",
      protein: "21.4g",
      fiber: "10.9g",
      price: 190,
      category: "Salads",
      image: heroSalad,
    },
    {
      id: 7,
      name: "Creamy Pasta Salad",
      description: "Light Caesar Dressing. Pasta with zucchini, broccoli, mushroom & hung curd, tossed with crisp lettuce and mixed veggies.",
      calories: "230 kcal",
      protein: "14.5g",
      fiber: "9.3g",
      price: 190,
      category: "Salads",
      image: pastasalad,
    },
    {
      id: 8,
      name: "Tri-Sprout Harmony",
      description: "Cilantro Hung Curd Dressing. Moong, matki & black chana sprouts with crisp lettuce and mixed veggies. Topped with superseeds, feta cheese, pomegranate, roasted crushed peanuts & cherry tomatoes.",
      calories: "419 kcal",
      protein: "22.6g",
      fiber: "14.2g",
      price: 190,
      category: "Salads",
      image: trisproutsalad,
    },
  ],
  wraps: [
    {
      id: 9,
      name: "Grilled Paneer Wrap",
      description: "Grilled paneer + hummus + fresh greens + bell peppers in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 10,
      name: "Soya Tikki Wrap",
      description: "Soya tikki + hummus + fresh greens + sauces + fresh veggies in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 11,
      name: "Herbed Tofu Wrap",
      description: "Herbed tofu + hummus + fresh greens + sauces + fresh veggies in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 12,
      name: "Mexican Fajita Beans Wrap",
      description: "Grilled vegetables + hummus + fresh greens + sauces + fresh veggies in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 13,
      name: "Sprouts Tikki Wrap",
      description: "Pulse powered tikkis + hummus + fresh greens + sauces + fresh veggies wrapped in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 14,
      name: "Falafel Delight Wrap",
      description: "Crispy falafel + hummus + fresh greens + sauces + fresh veggies wrapped in whole wheat tortilla ",
      calories: "380 kcal",
      protein: "18g",
      price: 150,
      category: "Wraps",
      image: wrap
    }
  ],
  smoothies: [
    {
      id: 15,
      name: "Vanilla Oatmeal Smoothie",
      description: "A classic blend of milky vanilla goodness and banana, chia seeds, topped with loads of fruits and nuts",
      calories: "245 kcal",
      protein: "15g",
      price: 150,
      category: "Smoothies",
      image: vsmoothie
    },
    {
      id: 16,
      name: "Chocolate Oatmeal Smoothie",
      description: "Creamy oats meet rich cocoa, chia seeds and banana, topped with loads of fruits and nuts. Your guilt-free energy boost in a glass.",
      calories: "280 kcal",
      protein: "8g",
      price: 150,
      category: "Smoothies",
      image: csmoothie
    },
    {
      id: 17,
      name: "Strawberry Oatmeal Smoothie",
      description: "A refreshing blend of oats and juicy strawberries. Packed with fibre, and natural sweetness, topped with loads of fruits and nuts. Your guilt-free energy boost in a glass.",
      calories: "280 kcal",
      protein: "8g",
      price: 150,
      category: "Smoothies",
      image: ssmoothie
    }
  ],
  sandwiches: [
    {
      id: 18,
      name: "Veggie Vibes",
      description: "Loaded with fresh crisp veggies and signature sauces, grilled to perfection between whole wheat bread.",
      calories: "320 kcal",
      protein: "10g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 19,
      name: "Paneer Paradise",
      description: "Grilled paneer with fresh veggies and signature sauces, layered between whole wheat bread.",
      calories: "360 kcal",
      protein: "16g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 20,
      name: "Creamy Corn",
      description: "Sweet corn tossed in a creamy dressing with fresh veggies, layered between whole wheat bread.",
      calories: "310 kcal",
      protein: "9g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 21,
      name: "Mushroom Magic",
      description: "Sauteed mushrooms with fresh veggies and signature sauces, grilled between whole wheat bread.",
      calories: "300 kcal",
      protein: "11g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 22,
      name: "Tofu Twist",
      description: "Herbed tofu with fresh veggies and signature sauces, layered between whole wheat bread.",
      calories: "330 kcal",
      protein: "17g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    }
  ]
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState("salads");
  const { ref, isVisible, getItemStyle } = useStaggerAnimation({ 
    threshold: 0.2,
    staggerDelay: 120 
  });
  const { items: cartItems, addToCart, updateQuantity } = useCart();

  const handleAddToCart = (item: typeof menuItems.salads[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  return (
    <section 
      ref={ref as any}
      className={`py-20 bg-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted meals packed with nutrition and flavor
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 h-auto p-1 bg-muted/50">
            <TabsTrigger
              value="salads"
              className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
            >
              Salads
            </TabsTrigger>
            <TabsTrigger
              value="wraps"
              className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
            >
              Wraps
            </TabsTrigger>
            <TabsTrigger
              value="smoothies"
              className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
            >
              Smoothies
            </TabsTrigger>
            <TabsTrigger
              value="sandwiches"
              className="font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
            >
              Sandwiches
            </TabsTrigger>
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                  <Card 
                    key={index} 
                    style={getItemStyle(index)}
                    className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                      isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="text-lg font-bold">
                          ₹{item.price}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3 bg-card">
                      <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                      <p className="text-sm font-bold text-primary">
                        {item.calories} &nbsp;|&nbsp; Protein {item.protein}
                        {'fiber' in item ? ` · Fiber ${item.fiber}` : ''}
                      </p>
                      <CardDescription className="text-sm leading-snug">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter>
                      {(() => {
                        const cartItem = cartItems.find((cartEntry) => cartEntry.id === item.id);
                        if (cartItem) {
                          return (
                            <QuantityControl
                              quantity={cartItem.quantity}
                              onDecrease={() => updateQuantity(item.id, cartItem.quantity - 1)}
                              onIncrease={() => updateQuantity(item.id, cartItem.quantity + 1)}
                            />
                          );
                        }
                        return (
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        );
                      })()}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Menu;
