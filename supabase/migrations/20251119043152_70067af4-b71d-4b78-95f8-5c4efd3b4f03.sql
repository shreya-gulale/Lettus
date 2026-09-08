-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  availability BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Public can view available menu items
CREATE POLICY "Anyone can view available menu items"
ON public.menu_items
FOR SELECT
USING (availability = true);

-- Admins can manage all menu items
CREATE POLICY "Admins can insert menu items"
ON public.menu_items
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update menu items"
ON public.menu_items
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete menu items"
ON public.menu_items
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all menu items"
ON public.menu_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'));