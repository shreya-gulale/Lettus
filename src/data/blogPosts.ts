import blogNutrition from "@/assets/blog-nutrition.jpg";
import blogWellness from "@/assets/blog-wellness.jpg";
import blogMealPrep from "@/assets/blog-meal-prep.jpg";
import blogSuperfoods from "@/assets/blog-superfoods.jpg";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: "nutrition" | "recipe" | "wellness";
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Superfoods You Should Add to Your Diet Today",
    slug: "superfoods-healthy-diet",
    excerpt: "Discover the power-packed foods that can transform your health and boost your energy levels naturally.",
    content: `
# 10 Superfoods You Should Add to Your Diet Today

In today's fast-paced world, maintaining optimal health is more important than ever. One of the simplest ways to enhance your nutrition is by incorporating superfoods into your daily meals. These nutrient-dense powerhouses provide exceptional health benefits and can help you feel your best.

## What Makes a Food "Super"?

Superfoods are rich in vitamins, minerals, antioxidants, and other beneficial compounds that support overall health. They're nature's multivitamins, packed with everything your body needs to thrive.

## Our Top 10 Superfoods

### 1. Quinoa
This ancient grain is a complete protein, containing all nine essential amino acids. It's also rich in fiber, iron, and magnesium.

### 2. Avocado
Loaded with healthy fats, avocados support heart health and keep you feeling satisfied longer.

### 3. Berries
Blueberries, strawberries, and raspberries are antioxidant powerhouses that fight inflammation and support brain health.

### 4. Leafy Greens
Spinach, kale, and Swiss chard are packed with vitamins A, C, and K, plus essential minerals.

### 5. Chia Seeds
These tiny seeds are loaded with omega-3 fatty acids, fiber, and protein.

### 6. Sweet Potatoes
Rich in beta-carotene and fiber, they're a delicious way to boost your vitamin A intake.

### 7. Chickpeas
High in protein and fiber, chickpeas are perfect for plant-based eating.

### 8. Greek Yogurt
Packed with probiotics and protein, it supports gut health and keeps you full.

### 9. Nuts and Seeds
Almonds, walnuts, and pumpkin seeds provide healthy fats and essential nutrients.

### 10. Broccoli
This cruciferous vegetable is rich in vitamins C and K, plus cancer-fighting compounds.

## How to Incorporate Superfoods

The best part about superfoods? They're incredibly versatile! Add berries to your morning smoothie, toss quinoa into your salad, or snack on nuts throughout the day.

At Lett-us Eat Healthy, we've made it easy by incorporating these superfoods into our delicious bowls, wraps, and smoothies. Every meal is designed to nourish your body with the best ingredients nature has to offer.

**Ready to supercharge your diet? Order your superfood-packed meal today!**
    `,
    image: blogSuperfoods,
    category: "nutrition",
    author: "Lett-us Team",
    date: "2025-01-15",
    readTime: "5 min read",
    tags: ["nutrition", "superfoods", "healthy eating", "wellness"]
  },
  {
    id: "2",
    title: "Meal Prep Made Simple: A Beginner's Guide",
    slug: "meal-prep-beginners-guide",
    excerpt: "Learn how to save time, money, and stress with our easy meal prep strategies for busy professionals.",
    content: `
# Meal Prep Made Simple: A Beginner's Guide

Meal prepping is a game-changer for anyone looking to eat healthier while saving time and money. Whether you're a busy professional, a student, or a parent, having nutritious meals ready to go can transform your week.

## Why Meal Prep?

- **Save Time**: Prepare once, eat all week
- **Save Money**: Reduce impulse purchases and food waste
- **Eat Healthier**: Control ingredients and portions
- **Reduce Stress**: No more "what's for dinner?" panic

## Getting Started: Essential Tools

You don't need fancy equipment to start meal prepping. Here are the basics:

- Glass or BPA-free plastic containers
- A good set of knives
- Cutting boards
- Sheet pans for roasting

## The Simple 4-Step Process

### Step 1: Plan Your Menu
Choose 2-3 recipes for the week. Start simple with bowls, salads, or wraps that use similar ingredients.

### Step 2: Shop Smart
Make a detailed grocery list and stick to it. Buy fresh produce, proteins, and whole grains in bulk.

### Step 3: Prep in Batches
Dedicate 2-3 hours on Sunday (or any day that works for you) to:
- Wash and chop vegetables
- Cook grains and proteins
- Portion meals into containers

### Step 4: Store Properly
Label containers with dates and store in the fridge for 3-4 days or freezer for longer.

## Beginner-Friendly Meal Prep Ideas

**Buddha Bowls**: Base of quinoa or brown rice + roasted vegetables + protein + tasty dressing

**Mason Jar Salads**: Layer dressing at bottom, hearty vegetables, grains, greens on top

**Overnight Oats**: Mix oats, milk, and toppings the night before for grab-and-go breakfast

## Pro Tips

1. Don't prep everything at once - start with lunches only
2. Use versatile ingredients that work in multiple dishes
3. Prep components, not just complete meals
4. Invest in quality storage containers

## No Time to Prep?

We get it - life gets busy! That's exactly why we created Lett-us Eat Healthy. Our subscription service delivers freshly prepared, nutritious meals right to your door. All the benefits of meal prep, with zero work required!

**Try our 7-day meal plan and experience the convenience of healthy eating without the prep work.**
    `,
    image: blogMealPrep,
    category: "wellness",
    author: "Lett-us Team",
    date: "2025-01-20",
    readTime: "7 min read",
    tags: ["meal prep", "time management", "healthy lifestyle", "tips"]
  },
  {
    id: "3",
    title: "The Rainbow on Your Plate: Eating Colorful for Better Health",
    slug: "rainbow-eating-colorful-health",
    excerpt: "Discover why eating a variety of colorful fruits and vegetables is the key to optimal nutrition and vibrant health.",
    content: `
# The Rainbow on Your Plate: Eating Colorful for Better Health

Have you ever noticed how the most nutritious foods tend to be the most colorful? That's no coincidence! Nature has designed fruits and vegetables with specific pigments that indicate their unique health benefits.

## Why Color Matters

Each color group contains specific phytonutrients - powerful plant compounds that protect your health in different ways. By eating a rainbow of colors, you ensure you're getting a wide spectrum of nutrients.

## Your Color-Coded Nutrition Guide

### Red Foods 🔴
**Examples**: Tomatoes, red peppers, strawberries, watermelon

**Benefits**: Rich in lycopene and anthocyanins, which support heart health and may reduce cancer risk.

### Orange & Yellow Foods 🟠🟡
**Examples**: Carrots, sweet potatoes, mangoes, oranges, bell peppers

**Benefits**: Packed with beta-carotene and vitamin C for immune support and eye health.

### Green Foods 🟢
**Examples**: Spinach, kale, broccoli, avocados, kiwi

**Benefits**: High in chlorophyll, folate, and vitamins K and E. Support detoxification and bone health.

### Blue & Purple Foods 🔵🟣
**Examples**: Blueberries, eggplant, purple cabbage, blackberries

**Benefits**: Rich in anthocyanins that support brain health and memory.

### White & Brown Foods 🤍🟤
**Examples**: Cauliflower, mushrooms, onions, garlic

**Benefits**: Contain allicin and other compounds that boost immunity and heart health.

## How to Eat the Rainbow Every Day

### Breakfast
Start with a colorful smoothie bowl topped with berries, banana, and kiwi.

### Lunch
Create a vibrant salad with mixed greens, cherry tomatoes, carrots, purple cabbage, and chickpeas.

### Dinner
Roast a rainbow of vegetables - peppers, sweet potatoes, broccoli, and red onions.

### Snacks
Keep colorful options handy: carrot sticks, apple slices, or mixed berries.

## The Lett-us Approach

At Lett-us Eat Healthy, we're passionate about bringing you the full spectrum of nutrition in every bowl. Our meals are designed to be visually stunning and nutritionally complete, featuring a rainbow of fresh, seasonal ingredients.

Each of our signature bowls includes at least 5 different colored vegetables, ensuring you get a diverse array of nutrients with every meal.

## Challenge Yourself!

This week, try to eat at least one food from each color group every day. Take photos of your colorful plates and share your rainbow journey with us on Instagram!

**Ready to eat the rainbow? Explore our colorful menu and order your nutrient-packed meal today!**
    `,
    image: blogNutrition,
    category: "nutrition",
    author: "Lett-us Team",
    date: "2025-01-25",
    readTime: "6 min read",
    tags: ["nutrition", "vegetables", "healthy eating", "colorful food"]
  },
  {
    id: "4",
    title: "Mindful Eating: Transform Your Relationship with Food",
    slug: "mindful-eating-guide",
    excerpt: "Learn how to slow down, savor your meals, and develop a healthier, more joyful relationship with food.",
    content: `
# Mindful Eating: Transform Your Relationship with Food

In our fast-paced world, we often eat on autopilot - scrolling through our phones, working at our desks, or rushing between tasks. Mindful eating invites us to slow down and reconnect with the simple pleasure of nourishing our bodies.

## What is Mindful Eating?

Mindful eating is the practice of being fully present while eating. It means paying attention to the colors, smells, textures, and flavors of your food, as well as your body's hunger and fullness cues.

## The Benefits

Research shows that mindful eating can:
- Reduce overeating and emotional eating
- Improve digestion
- Increase satisfaction from meals
- Help maintain a healthy weight
- Reduce stress around food
- Enhance appreciation for food

## 7 Simple Mindful Eating Practices

### 1. Remove Distractions
Put away your phone, turn off the TV, and step away from your computer. Make your meal the main event.

### 2. Engage Your Senses
Before taking your first bite, look at your food. Notice the colors and arrangement. Smell the aromas. What does it remind you of?

### 3. Take Smaller Bites
Smaller bites allow you to taste more thoroughly and help you eat more slowly.

### 4. Chew Thoroughly
Aim for 20-30 chews per bite. This aids digestion and gives your brain time to register fullness.

### 5. Put Your Fork Down
Between bites, set down your utensils. This simple act helps you slow down and check in with your hunger levels.

### 6. Ask Questions
Throughout your meal, pause and ask:
- Am I still hungry?
- How does this taste?
- How do I feel?

### 7. Express Gratitude
Take a moment to appreciate your food - the farmers who grew it, the hands that prepared it, and the nourishment it provides.

## Start Small

You don't have to practice mindful eating at every meal. Start with one mindful meal per week, perhaps a leisurely weekend breakfast or a peaceful lunch break.

## The Lett-us Experience

We design our meals to be enjoyed mindfully. Each bowl is crafted with care, featuring fresh ingredients arranged beautifully. When you order from Lett-us Eat Healthy, you're not just getting food - you're getting an invitation to slow down and nourish yourself fully.

### Try This Exercise

With your next Lett-us meal:
1. Find a peaceful spot to sit
2. Take three deep breaths before eating
3. Notice three things about your meal's appearance
4. Eat the first three bites slowly, noticing flavors and textures
5. Reflect on how you feel afterward

**Ready for a mindful eating experience? Order your thoughtfully crafted meal today.**
    `,
    image: blogWellness,
    category: "wellness",
    author: "Lett-us Team",
    date: "2025-01-28",
    readTime: "6 min read",
    tags: ["mindfulness", "wellness", "healthy habits", "mental health"]
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
