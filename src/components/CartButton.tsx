import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";

const CartButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          size="icon"
          className="h-16 w-16 rounded-full bg-gradient-to-br from-accent via-secondary to-primary shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 relative"
        >
          <ShoppingBag className="h-6 w-6 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      <CartDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};

export default CartButton;
