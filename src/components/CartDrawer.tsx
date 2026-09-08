import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const generateDeliverySlots = () => {
  const slots: string[] = [];
  for (let totalMinutes = 9 * 60; totalMinutes <= 21 * 60; totalMinutes += 30) {
    const hour24 = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const period = hour24 < 12 ? "AM" : "PM";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    slots.push(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`);
  }
  return slots;
};

const deliveryTimeSlots = generateDeliverySlots();

const addOnOptions = [
  { id: "extra-protein", name: "Extra Protein", price: 50 },
  { id: "extra-dressing", name: "Extra Dressing", price: 30 },
  { id: "fresh-juice", name: "Fresh Juice", price: 80 },
  { id: "green-tea", name: "Green Tea", price: 40 },
];

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOnOptions.find((option) => option.id === addOnId);
    return total + (addOn?.price || 0);
  }, 0);

  const finalTotal = totalPrice + addOnsTotal;

  const handleCheckout = () => {
    if (items.length === 0) return;

    if (!customerName.trim() || !address.trim() || !deliveryTime.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, address, and preferred delivery time.",
        variant: "destructive",
      });
      return;
    }

    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`)
      .join("%0A");

    const addOnsList = selectedAddOns.length > 0
      ? "%0A%0AAdd-ons:%0A" +
        selectedAddOns
          .map((addOnId) => {
            const addOn = addOnOptions.find((option) => option.id === addOnId);
            return `${addOn?.name} - ₹${addOn?.price}`;
          })
          .join("%0A")
      : "";

    const message = `Hello Lett-Us Eat Healthy! I'd like to place an order:%0A%0AName: ${encodeURIComponent(customerName)}%0AAddress: ${encodeURIComponent(address)}%0APreferred Delivery Time: ${encodeURIComponent(deliveryTime)}%0A%0AItems:%0A${itemsList}${addOnsList}%0A%0ATotal: ₹${finalTotal}`;

    window.open(`https://wa.me/8261811035?text=${message}`, "_blank");
    clearCart();
    setCustomerName("");
    setAddress("");
    setDeliveryTime("");
    setSelectedAddOns([]);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </DrawerTitle>
          <DrawerDescription>
            Review your items and checkout via WhatsApp
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-4 max-h-[50vh]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add items from our menu to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-muted/50 rounded-xl border border-border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="font-bold text-primary mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add-ons Section */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-foreground mb-3">Add-ons</h3>
                <div className="space-y-3">
                  {addOnOptions.map((addOn) => (
                    <div key={addOn.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={addOn.id}
                          checked={selectedAddOns.includes(addOn.id)}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                        />
                        <Label htmlFor={addOn.id} className="cursor-pointer">
                          {addOn.name}
                        </Label>
                      </div>
                      <span className="text-sm font-medium text-primary">₹{addOn.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Details Section */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold text-foreground mb-3">Delivery Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Delivery Time *</Label>
                  <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                    <SelectTrigger id="time">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select a delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryTimeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        <DrawerFooter className="border-t border-border">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>
            {addOnsTotal > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Add-ons:</span>
                <span className="font-semibold">₹{addOnsTotal}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-lg font-semibold text-foreground">Total:</span>
              <span className="text-2xl font-bold text-primary">₹{finalTotal}</span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Checkout via WhatsApp
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
