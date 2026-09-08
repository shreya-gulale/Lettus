import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

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
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 mb-12">
            {/* Article Header */}
            <div className="mb-8 space-y-4">
              <Badge className="bg-primary text-primary-foreground capitalize">
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div>
                  <span>By {post.author}</span>
                </div>
                <Button 
                  onClick={handleShare}
                  variant="ghost" 
                  size="sm"
                  className="ml-auto text-accent hover:text-accent hover:bg-accent/10"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl text-center">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Ready to Start Your Healthy Journey?
              </h3>
              <p className="text-muted-foreground mb-6">
                Order fresh, nutritious meals delivered to your door
              </p>
              <Button 
                onClick={() => window.open("https://wa.me/8261811035?text=Hello%20Lett-Us%20Eat%20Healthy!%20I'd%20like%20to%20place%20an%20order.", "_blank")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                Order Now
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6 bg-card">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
