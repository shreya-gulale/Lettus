import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { blogPosts } from "@/data/blogPosts";

const BlogPreview = () => {
  const featuredPosts = blogPosts.slice(0, 3);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={ref as any}
      className={`py-20 bg-gradient-to-b from-muted/30 to-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Wellness & Nutrition Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert tips, delicious recipes, and wellness inspiration to support your healthy journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {featuredPosts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
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
                <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button 
                  asChild
                  variant="link"
                  className="p-0 h-auto text-accent hover:text-accent/80"
                >
                  <Link to={`/blog/${post.slug}`}>
                    Read Article →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link to="/blog">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
