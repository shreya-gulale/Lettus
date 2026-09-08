import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Info } from "lucide-react";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { useCart } from "@/contexts/CartContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const menuItems = {
  salads: [
    {
      id: 1,
      name: "Millet Chickpea Salad",
      description: "Dahi–Paneer Cream Dressing. Millets with roasted chickpeas, sweet corn, olives & beetroot-hung curd, tossed with crisp fresh veggies. ",
      calories: "460 kcal",
      protein: "17g",
      price: 190,
      category: "Salads",
      image: milletSalad,
      nutrition: "60g Carbs · 14g Fat · 12g Fiber"
    },
    {
      id: 2,
      name: "Mexican Bowl",
      description: "Tomato–Garlic Dressing. Cilantro-lime rice, black beans, corn, shredded cheese, guac & crisp fresh veggies. ✨ A fiesta of bold flavors and fresh crunch.",
      calories: "353 kcal",
      protein: "15g",
      price: 190,
      category: "Salads",
      image: mexicanSalad,
      nutrition: "55g Carbs · 15g Fat · 11g Fiber"
    },
    {
      id: 3,
      name: "Herbed Tofu Salad",
      description: "Sesame Soy-Ginger Dressing. Matta red rice / barley base, marinated tofu with mushrooms, charred broccoli, salsa & crisp fresh veggies. A plant-based protein powerhouse. ✨ Delicately herbed, rich in flavor, 100% plant-based.",
      calories: "400 kcal",
      protein: "18g",
      price: 190,
      category: "Salads",
      image: tofuSalad,
      nutrition: "45g Carbs · 14g Fat · 10g Fiber"
    },
    {
      id: 8,
      name: "Grilled Paneer Salad",
      description: "Mint–Cilantro Dressing. Barley / matta red rice base with grilled paneer, roasted cauliflower, sweet corn, olives & crisp fresh veggies. Finished with a super-seed crunch. ✨ Smoky, hearty, and refreshingly green.",
      calories: "480 kcal",
      protein: "21g",
      price: 190,
      category: "Salads",
      image: grilledPaneerSalad,
      nutrition: "48g Carbs · 18g Fat · 9g Fiber"
    },
    {
      id: 9,
      name: "Mediterranean Quinoa Salad",
      description: "Classic Tahini Dressing. Quinoa with black beans, hummus, feta, olives & crisp fresh veggies. Finished with mixed herbs.✨ A classic Med bowl—nutty, creamy, and vibrant.",
      calories: "490 kcal",
      protein: "19g",
      price: 190,
      category: "Salads",
      image: quinoasalad,
      nutrition: "55g Carbs · 17g Fat · 10g Fiber"
    },
    {
      id: 9,
      name: "Creamy Pasta Salad",
      description: "Light Caesar Dressing. Pasta with roasted garlic, olives, broccoli, zucchini, herbs, croutons & crisp fresh veggies.",
      calories: "510 kcal",
      protein: "16g",
      price: 190,
      category: "Salads",
      image: pastasalad,
      nutrition: "65g Carbs · 18g Fat · 8g Fiber"
    },
    {
      id: 9,
      name: "Tri-Sprout Salad",
      description: "Cilantro Hung curd dressing. Rajma, moong, moth & chana sprouts with crisp fresh veggies. Topped with toasted sesame, fets cheese, roasted peanuts & pomegranates.",
      calories: "420 kcal",
      protein: "20g",
      price: 190,
      category: "Salads",
      image: trisproutsalad,
      nutrition: "52g Carbs · 12g Fat · 13g Fiber"
    },
  ],
  wraps: [
    {
      id: 4,
      name: "Grilled Paneer Wrap",
      description: "Grilled paneer + hummus + fresh greens + bell peppers in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 4,
      name: "Soya Tikki Wrap",
      description: "Soya tikki + hummus + fresh greens + sauces + fresh veggies in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 4,
      name: "Herbed Tofu Wrap",
      description: "Herbed tofu + hummus + fresh greens + sauces + fresh veggies in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 4,
      name: "Mexican Fajita Beans Wrap",
      description: "Grilled vegetables + hummus + fresh greens + sauces + fresh veggies in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 4,
      name: "Sprouts Tikki Wrap",
      description: "Pulse powered tikkis + hummus + fresh greens + sauces + fresh veggies wrapped in whole wheat tortilla",
      calories: "340 kcal",
      protein: "16g",
      price: 150,
      category: "Wraps",
      image: wrap
    },
    {
      id: 5,
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
      id: 6,
      name: "Vanilla Oatmeal Smoothie",
      description: "A classic blend of milky vanilla goodness and banana, chia seeds, topped with loads of fruits and nuts",
      calories: "245 kcal",
      protein: "15g",
      price: 150,
      category: "Smoothies",
      image: vsmoothie
    },
    {
      id: 7,
      name: "Chocolate Oatmeal Smoothie",
      description: "Creamy oats meet rich cocoa, chia seeds and banana, topped with loads of fruits and nuts. Your guilt-free energy boost in a glass.",
      calories: "280 kcal",
      protein: "8g",
      price: 150,
      category: "Smoothies",
      image: csmoothie
    },
    {
      id: 7,
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
      id: 10,
      name: "Veggie Vibes",
      description: "Loaded with fresh crisp veggies and signature sauces, grilled to perfection between whole wheat bread.",
      calories: "320 kcal",
      protein: "10g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 11,
      name: "Paneer Paradise",
      description: "Grilled paneer with fresh veggies and signature sauces, layered between whole wheat bread.",
      calories: "360 kcal",
      protein: "16g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 12,
      name: "Creamy Corn",
      description: "Sweet corn tossed in a creamy dressing with fresh veggies, layered between whole wheat bread.",
      calories: "310 kcal",
      protein: "9g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 13,
      name: "Mushroom Magic",
      description: "Sauteed mushrooms with fresh veggies and signature sauces, grilled between whole wheat bread.",
      calories: "300 kcal",
      protein: "11g",
      price: 180,
      category: "Sandwiches",
      image: sandwichPlaceholder
    },
    {
      id: 14,
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
  const { addToCart } = useCart();

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
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                          {item.calories}
                        </Badge>
                        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                          {item.protein} Protein
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription className="text-base line-clamp-2">
                        {item.description}
                      </CardDescription>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-primary">
                            <Info className="h-3 w-3 mr-1" />
                            Read more
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{item.name}</DialogTitle>
                            <DialogDescription className="text-base pt-2">
                              {item.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Calories:</span>
                              <span>{item.calories}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Protein:</span>
                              <span>{item.protein}</span>
                            </div>
                            {'nutrition' in item && (
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Additional:</span>
                                <span>{item.nutrition}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm pt-2 border-t">
                              <span className="font-bold">Price:</span>
                              <span className="font-bold text-primary">₹{item.price}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
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
