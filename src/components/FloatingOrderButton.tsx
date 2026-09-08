import { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingOrderButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleOrderClick = () => {
    window.open(
      "https://wa.me/8261811035?text=Hello%20Lett-Us%20Eat%20Healthy!%20I'd%20like%20to%20place%20an%20order.",
      "_blank"
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded menu */}
      {isExpanded && (
        <div className="animate-fade-in bg-card border-2 border-primary/20 rounded-2xl shadow-2xl p-4 backdrop-blur-md">
          <div className="space-y-3 min-w-[200px]">
            <button
              onClick={handleOrderClick}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="font-semibold">Order via WhatsApp</span>
            </button>
            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-all hover:scale-105"
            >
              <span className="font-semibold">View Menu</span>
            </button>
            <button
              onClick={() => document.getElementById('subscription')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-all hover:scale-105"
            >
              <span className="font-semibold">View Plans</span>
            </button>
          </div>
        </div>
      )}

      {/* Main floating button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="icon"
        className="h-16 w-16 rounded-full bg-gradient-to-br from-accent via-secondary to-primary shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 animate-bounce hover:animate-none"
      >
        {isExpanded ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <ShoppingBag className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  );
};

export default FloatingOrderButton;
