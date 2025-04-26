/*
  # Create users and orders tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `is_admin` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `gas_type` (jsonb)
      - `station` (jsonb)
      - `quantity` (integer)
      - `total_price` (numeric)
      - `status` (text)
      - `delivery_address` (text)
      - `payment_method` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  phone text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  gas_type jsonb NOT NULL,
  station jsonb NOT NULL,
  quantity integer NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  delivery_address text NOT NULL,
  payment_method text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

-- Insert initial users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'john@student.ku.ac.ke', crypt('password123', gen_salt('bf')), now()),
  ('22222222-2222-2222-2222-222222222222', 'mary@admin.ku.ac.ke', crypt('admin123', gen_salt('bf')), now()),
  ('33333333-3333-3333-3333-333333333333', 'peter@student.ku.ac.ke', crypt('password123', gen_salt('bf')), now()),
  ('44444444-4444-4444-4444-444444444444', 'sarah@student.ku.ac.ke', crypt('password123', gen_salt('bf')), now()),
  ('55555555-5555-5555-5555-555555555555', 'james@student.ku.ac.ke', crypt('password123', gen_salt('bf')), now()),
  ('66666666-6666-6666-6666-666666666666', 'lucy@student.ku.ac.ke', crypt('password123', gen_salt('bf')), now()),
  ('77777777-7777-7777-7777-777777777777', 'mike@student.ku.ac.ke', crypt('password123', gen_salt('bf')), now()),
  ('88888888-8888-8888-8888-888888888888', 'admin1@admin.ku.ac.ke', crypt('admin123', gen_salt('bf')), now()),
  ('99999999-9999-9999-9999-999999999999', 'admin2@admin.ku.ac.ke', crypt('admin123', gen_salt('bf')), now());

-- Insert profiles for users
INSERT INTO profiles (id, name, phone, is_admin)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'John Kamau', '+254712345678', false),
  ('22222222-2222-2222-2222-222222222222', 'Mary Wanjiku', '+254723456789', true),
  ('33333333-3333-3333-3333-333333333333', 'Peter Omondi', '+254734567890', false),
  ('44444444-4444-4444-4444-444444444444', 'Sarah Njeri', '+254745678901', false),
  ('55555555-5555-5555-5555-555555555555', 'James Kiprop', '+254756789012', false),
  ('66666666-6666-6666-6666-666666666666', 'Lucy Adhiambo', '+254767890123', false),
  ('77777777-7777-7777-7777-777777777777', 'Mike Mwangi', '+254778901234', false),
  ('88888888-8888-8888-8888-888888888888', 'Admin One', '+254789012345', true),
  ('99999999-9999-9999-9999-999999999999', 'Admin Two', '+254790123456', true);