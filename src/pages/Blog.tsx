import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import logo from "@/assets/logo.png";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Lett-us Eat Healthy" className="h-16 w-auto" />
            </Link>
            <Button asChild variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Wellness Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your source for healthy eating tips, delicious recipes, and wellness inspiration
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="max-w-7xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12 h-auto p-1 bg-muted/50">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
              >
                Nutrition
              </TabsTrigger>
              <TabsTrigger 
                value="recipe"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
              >
                Recipes
              </TabsTrigger>
              <TabsTrigger 
                value="wellness"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
              >
                Wellness
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground capitalize">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground group"
                      >
                        <Link to={`/blog/${post.slug}`}>
                          Read More 
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No posts found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
