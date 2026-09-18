import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/contexts/CartContext";
import type { Database } from "@/integrations/supabase/types";

export type OrderType = Database["public"]["Enums"]["order_type"];
export type OrderStatus = Database["public"]["Enums"]["order_status"];
export type CreatedOrder = Database["public"]["Functions"]["create_order"]["Returns"];

export interface OrderAddOn {
  name: string;
  price: number;
}

export interface CreateOrderInput {
  orderType: OrderType;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  deliveryTime?: string;
  deliveryInstructions?: string;
  items: CartItem[];
  addOns: OrderAddOn[];
  subtotal: number;
  addOnsTotal: number;
  total: number;
}

export async function createOrder(input: CreateOrderInput): Promise<CreatedOrder> {
  const items = [
    ...input.items.map((item) => ({
      product_id: item.id,
      product_name: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      item_subtotal: item.price * item.quantity,
    })),
    ...input.addOns.map((addOn) => ({
      product_id: 0,
      product_name: addOn.name,
      unit_price: addOn.price,
      quantity: 1,
      item_subtotal: addOn.price,
    })),
  ];

  const { data, error } = await supabase.rpc("create_order", {
    p_order_type: input.orderType,
    p_customer_name: input.customerName,
    p_customer_phone: input.customerPhone,
    p_delivery_address: input.deliveryAddress ?? null,
    p_delivery_time: input.deliveryTime ?? null,
    p_delivery_instructions: input.deliveryInstructions ?? null,
    p_items: items,
    p_subtotal: input.subtotal,
    p_addons_total: input.addOnsTotal,
    p_total: input.total,
  });

  if (error) throw error;

  return (Array.isArray(data) ? data[0] : data) as CreatedOrder;
}
