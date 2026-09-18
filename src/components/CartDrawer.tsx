import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Store, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type CartItem } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { createOrder, type CreatedOrder, type OrderAddOn } from "@/lib/orders";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CheckoutStep = "cart" | "method" | "outlet" | "whatsapp" | "confirmation";

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

const isValidMobileNumber = (value: string) => /^[6-9]\d{9}$/.test(value.replace(/\D/g, "").slice(-10));

interface OrderSummaryProps {
  items: CartItem[];
  addOns: OrderAddOn[];
  subtotal: number;
  addOnsTotal: number;
  total: number;
}

const OrderSummary = ({ items, addOns, subtotal, addOnsTotal, total }: OrderSummaryProps) => (
  <div className="border-t pt-4 space-y-3">
    <h3 className="font-semibold text-foreground">Order Summary</h3>
    <div className="space-y-1.5">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {item.name} × {item.quantity}
          </span>
          <span className="font-medium">₹{item.price * item.quantity}</span>
        </div>
      ))}
      {addOns.map((addOn) => (
        <div key={addOn.name} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{addOn.name}</span>
          <span className="font-medium">₹{addOn.price}</span>
        </div>
      ))}
    </div>
    <div className="space-y-2 pt-2 border-t">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Subtotal:</span>
        <span className="font-semibold">₹{subtotal}</span>
      </div>
      {addOnsTotal > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Add-ons:</span>
          <span className="font-semibold">₹{addOnsTotal}</span>
        </div>
      )}
      <div className="flex justify-between items-center pt-2 border-t">
        <span className="text-lg font-semibold text-foreground">Total:</span>
        <span className="text-2xl font-bold text-primary">₹{total}</span>
      </div>
    </div>
  </div>
);

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const [step, setStep] = useState<CheckoutStep>("cart");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const [confirmedOrder, setConfirmedOrder] = useState<CreatedOrder | null>(null);
  const [confirmedSnapshot, setConfirmedSnapshot] = useState<{
    items: CartItem[];
    addOns: OrderAddOn[];
    total: number;
    customerName: string;
    customerPhone: string;
  } | null>(null);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const selectedAddOnObjects: OrderAddOn[] = selectedAddOns.map((addOnId) => {
    const addOn = addOnOptions.find((option) => option.id === addOnId);
    return { name: addOn?.name || "", price: addOn?.price || 0 };
  });

  const addOnsTotal = selectedAddOnObjects.reduce((total, addOn) => total + addOn.price, 0);
  const finalTotal = totalPrice + addOnsTotal;

  const resetCheckoutFields = () => {
    setCustomerName("");
    setCustomerPhone("");
    setAddress("");
    setDeliveryTime("");
    setSelectedAddOns([]);
  };

  const handleDrawerOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !isSubmitting) {
      setStep("cart");
      setConfirmedOrder(null);
      setConfirmedSnapshot(null);
    }
    onOpenChange(nextOpen);
  };

  const handlePlaceOutletOrder = async () => {
    if (items.length === 0 || isSubmitting) return;

    if (!customerName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidMobileNumber(customerPhone)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await createOrder({
        orderType: "OUTLET",
        customerName,
        customerPhone,
        items,
        addOns: selectedAddOnObjects,
        subtotal: totalPrice,
        addOnsTotal,
        total: finalTotal,
      });

      setConfirmedOrder(order);
      setConfirmedSnapshot({
        items,
        addOns: selectedAddOnObjects,
        total: finalTotal,
        customerName,
        customerPhone,
      });
      clearCart();
      resetCheckoutFields();
      setStep("confirmation");
    } catch (error: any) {
      toast({
        title: "Could Not Place Order",
        description: error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppCheckout = async () => {
    if (items.length === 0 || isSubmitting) return;

    if (!customerName.trim() || !address.trim() || !deliveryTime.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, address, and preferred delivery time.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrder({
        orderType: "DELIVERY",
        customerName,
        customerPhone: customerPhone || "N/A",
        deliveryAddress: address,
        deliveryTime,
        items,
        addOns: selectedAddOnObjects,
        subtotal: totalPrice,
        addOnsTotal,
        total: finalTotal,
      });
    } catch (error) {
      console.warn("Could not record delivery order (WhatsApp checkout still proceeds):", error);
    }

    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`)
      .join("%0A");

    const addOnsList = selectedAddOnObjects.length > 0
      ? "%0A%0AAdd-ons:%0A" +
        selectedAddOnObjects.map((addOn) => `${addOn.name} - ₹${addOn.price}`).join("%0A")
      : "";

    const message = `Hello Lett-Us Eat Healthy! I'd like to place an order:%0A%0AName: ${encodeURIComponent(customerName)}%0AAddress: ${encodeURIComponent(address)}%0APreferred Delivery Time: ${encodeURIComponent(deliveryTime)}%0A%0AItems:%0A${itemsList}${addOnsList}%0A%0ATotal: ₹${finalTotal}`;

    window.open(`https://wa.me/8261811035?text=${message}`, "_blank");
    clearCart();
    resetCheckoutFields();
    setStep("cart");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const renderCartStep = () => (
    <>
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
          onClick={() => setStep("method")}
          disabled={items.length === 0}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Proceed to Checkout
        </Button>
      </DrawerFooter>
    </>
  );

  const renderMethodStep = () => (
    <>
      <div className="px-4">
        <Button variant="ghost" size="sm" onClick={() => setStep("cart")} className="mb-2 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Button>
      </div>
      <div className="px-4 pb-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center">
          How would you like to place your order?
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => setStep("outlet")}
            className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-border hover:border-primary bg-muted/30 hover:bg-muted/60 transition-all text-left"
          >
            <div className="p-3 rounded-full bg-primary/10">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">🏪 Checkout at Outlet</p>
              <p className="text-sm text-muted-foreground">Place your order and collect at our outlet</p>
            </div>
          </button>
          <button
            onClick={() => setStep("whatsapp")}
            className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-border hover:border-accent bg-muted/30 hover:bg-muted/60 transition-all text-left"
          >
            <div className="p-3 rounded-full bg-accent/10">
              <MessageCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">📱 Checkout via WhatsApp</p>
              <p className="text-sm text-muted-foreground">Get it delivered, confirm via WhatsApp</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );

  const renderOutletStep = () => (
    <>
      <div className="px-4">
        <Button variant="ghost" size="sm" onClick={() => setStep("method")} className="mb-2 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Change Checkout Method
        </Button>
      </div>
      <div className="overflow-y-auto px-4 pb-4 max-h-[55vh] space-y-4">
        <h3 className="font-semibold text-foreground">Outlet Order Details</h3>
        <div className="space-y-2">
          <Label htmlFor="outlet-name">Name *</Label>
          <Input
            id="outlet-name"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="outlet-phone">Mobile Number *</Label>
          <Input
            id="outlet-phone"
            type="tel"
            placeholder="Enter your 10-digit mobile number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>

        <OrderSummary
          items={items}
          addOns={selectedAddOnObjects}
          subtotal={totalPrice}
          addOnsTotal={addOnsTotal}
          total={finalTotal}
        />
      </div>

      <DrawerFooter className="border-t border-border">
        <Button
          onClick={handlePlaceOutletOrder}
          disabled={items.length === 0 || isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Placing Order...
            </>
          ) : (
            <>
              <Store className="mr-2 h-5 w-5" />
              Place Outlet Order
            </>
          )}
        </Button>
      </DrawerFooter>
    </>
  );

  const renderWhatsAppStep = () => (
    <>
      <div className="px-4">
        <Button variant="ghost" size="sm" onClick={() => setStep("method")} className="mb-2 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Change Checkout Method
        </Button>
      </div>
      <div className="overflow-y-auto px-4 pb-4 max-h-[55vh] space-y-4">
        <h3 className="font-semibold text-foreground">Delivery Details</h3>
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

        <OrderSummary
          items={items}
          addOns={selectedAddOnObjects}
          subtotal={totalPrice}
          addOnsTotal={addOnsTotal}
          total={finalTotal}
        />
      </div>

      <DrawerFooter className="border-t border-border">
        <Button
          onClick={handleWhatsAppCheckout}
          disabled={items.length === 0 || isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Preparing Order...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Checkout via WhatsApp
            </>
          )}
        </Button>
      </DrawerFooter>
    </>
  );

  const renderConfirmationStep = () => {
    if (!confirmedOrder || !confirmedSnapshot) return null;

    return (
      <div className="px-4 pb-6 space-y-4">
        <div className="text-center py-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Store className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Order Placed Successfully!</h3>
        </div>

        <div className="bg-muted/50 rounded-xl border border-border p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order ID:</span>
            <span className="font-semibold">#{confirmedOrder.order_number}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order Type:</span>
            <span className="font-semibold">Outlet Order</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Customer:</span>
            <span className="font-semibold">{confirmedSnapshot.customerName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mobile:</span>
            <span className="font-semibold">{confirmedSnapshot.customerPhone}</span>
          </div>

          <div className="pt-2 border-t space-y-1.5">
            {confirmedSnapshot.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
              </div>
            ))}
            {confirmedSnapshot.addOns.map((addOn) => (
              <div key={addOn.name} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{addOn.name}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold text-foreground">Total:</span>
            <span className="text-xl font-bold text-primary">₹{confirmedSnapshot.total}</span>
          </div>

          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-semibold text-primary">{confirmedOrder.status}</span>
          </div>
        </div>

        <Button
          onClick={() => {
            setStep("cart");
            setConfirmedOrder(null);
            setConfirmedSnapshot(null);
            onOpenChange(false);
          }}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
        >
          Done
        </Button>
      </div>
    );
  };

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {step === "confirmation"
              ? "Order Confirmation"
              : `Your Cart (${items.length} ${items.length === 1 ? "item" : "items"})`}
          </DrawerTitle>
          <DrawerDescription>
            {step === "cart" && "Review your items and proceed to checkout"}
            {step === "method" && "Choose how you'd like to place your order"}
            {step === "outlet" && "We'll have it ready for pickup at the outlet"}
            {step === "whatsapp" && "Review your items and checkout via WhatsApp"}
            {step === "confirmation" && "Thank you for your order"}
          </DrawerDescription>
        </DrawerHeader>

        {step === "cart" && renderCartStep()}
        {step === "method" && renderMethodStep()}
        {step === "outlet" && renderOutletStep()}
        {step === "whatsapp" && renderWhatsAppStep()}
        {step === "confirmation" && renderConfirmationStep()}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
