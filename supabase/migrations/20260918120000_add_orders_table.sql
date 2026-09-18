-- Orders (Outlet + WhatsApp/Delivery) support
--
-- Adds persistent, trackable orders for both "Checkout at Outlet" and
-- "Checkout via WhatsApp" flows. Orders are created through the
-- public.create_order() SECURITY DEFINER function (same pattern as
-- public.has_role) so anonymous customers can place orders without an
-- account, while the underlying tables stay admin-only for direct access.

CREATE TYPE public.order_type AS ENUM ('OUTLET', 'DELIVERY');

CREATE TYPE public.order_status AS ENUM ('NEW', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED');

CREATE SEQUENCE public.order_number_seq START WITH 1001;

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  order_type public.order_type NOT NULL,
  status public.order_status NOT NULL DEFAULT 'NEW',
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT,
  delivery_time TEXT,
  delivery_instructions TEXT,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  addons_total NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  item_subtotal NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Only admins may read/manage orders directly. Public order creation goes
-- through create_order() below, which bypasses RLS as a SECURITY DEFINER
-- function (same precedent as public.has_role).
CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders"
ON public.orders FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all order items"
ON public.order_items FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.create_order(
  p_order_type public.order_type,
  p_customer_name TEXT,
  p_customer_phone TEXT,
  p_delivery_address TEXT,
  p_delivery_time TEXT,
  p_delivery_instructions TEXT,
  p_items JSONB,
  p_subtotal NUMERIC,
  p_addons_total NUMERIC,
  p_total NUMERIC
) RETURNS public.orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_order public.orders;
  v_prefix TEXT;
  v_item JSONB;
BEGIN
  IF p_customer_name IS NULL OR btrim(p_customer_name) = '' THEN
    RAISE EXCEPTION 'Customer name is required';
  END IF;

  IF p_customer_phone IS NULL OR btrim(p_customer_phone) = '' THEN
    RAISE EXCEPTION 'Customer phone is required';
  END IF;

  IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'Order must contain at least one item';
  END IF;

  v_prefix := CASE WHEN p_order_type = 'OUTLET' THEN 'OUT' ELSE 'WA' END;

  INSERT INTO public.orders (
    order_number, order_type, customer_name, customer_phone,
    delivery_address, delivery_time, delivery_instructions,
    subtotal, addons_total, total_amount
  ) VALUES (
    v_prefix || '-' || nextval('public.order_number_seq'),
    p_order_type, btrim(p_customer_name), btrim(p_customer_phone),
    p_delivery_address, p_delivery_time, p_delivery_instructions,
    p_subtotal, p_addons_total, p_total
  ) RETURNING * INTO v_order;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO public.order_items (
      order_id, product_id, product_name, unit_price, quantity, item_subtotal
    ) VALUES (
      v_order.id,
      (v_item->>'product_id')::INTEGER,
      v_item->>'product_name',
      (v_item->>'unit_price')::NUMERIC,
      (v_item->>'quantity')::INTEGER,
      (v_item->>'item_subtotal')::NUMERIC
    );
  END LOOP;

  RETURN v_order;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_order(
  public.order_type, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB, NUMERIC, NUMERIC, NUMERIC
) TO anon, authenticated;
