-- ==============================================================================
-- SASAMAL EVENTS - Production Supabase Database Schema
-- Location: Navi Mumbai, Maharashtra, India
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Clean Existing Tables (for fresh initialization)
DROP TABLE IF EXISTS vendor_assignments CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS enquiry_addons CASCADE;
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS package_inclusions CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS addons CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS business_settings CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- ==============================================================================
-- 3. PROFILES TABLE (Admin Users)
-- ==============================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. BUSINESS SETTINGS TABLE
-- ==============================================================================
CREATE TABLE business_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'Sasamal Events',
  tagline TEXT NOT NULL DEFAULT 'Making Every Celebration Special',
  phone TEXT NOT NULL DEFAULT '+91 XXXXX XXXXX',
  whatsapp TEXT NOT NULL DEFAULT '919999999999',
  email TEXT NOT NULL DEFAULT 'hello@sasamalevents.com',
  address TEXT NOT NULL DEFAULT 'Navi Mumbai',
  city TEXT NOT NULL DEFAULT 'Navi Mumbai',
  state TEXT NOT NULL DEFAULT 'Maharashtra',
  instagram_url TEXT DEFAULT 'https://instagram.com/sasamalevents',
  facebook_url TEXT,
  service_areas TEXT[] DEFAULT ARRAY['Navi Mumbai', 'Vashi', 'Kharghar', 'Nerul', 'Belapur', 'Seawoods', 'Panvel'],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. SERVICES TABLE
-- ==============================================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('direct', 'partner')),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. PACKAGES TABLE (Birthday & Direct Celebrations)
-- ==============================================================================
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  category TEXT NOT NULL DEFAULT 'birthday',
  image_url TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Package Inclusions Table
CREATE TABLE package_inclusions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity TEXT DEFAULT 'Included',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- ==============================================================================
-- 7. ADDONS TABLE (Modular Decoration Items)
-- ==============================================================================
CREATE TABLE addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'balloons',
  max_quantity INT DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. ENQUIRIES TABLE
-- ==============================================================================
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_category TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT,
  event_location TEXT,
  venue_name TEXT,
  venue_type TEXT CHECK (venue_type IN ('indoor', 'outdoor', 'both')),
  guest_count TEXT,
  budget_range TEXT,
  package_id UUID REFERENCES packages(id) ON DELETE SET NULL,
  package_name TEXT,
  package_price NUMERIC(10, 2),
  addons_total NUMERIC(10, 2) DEFAULT 0,
  estimated_total NUMERIC(10, 2),
  decoration_requirements TEXT,
  decoration_style TEXT,
  additional_notes TEXT,
  reference_images TEXT[],
  enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('package', 'custom')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'contacted', 'quotation_sent', 'awaiting_confirmation', 'confirmed', 'in_progress', 'completed', 'cancelled')
  ),
  internal_notes TEXT,
  assigned_vendor_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiry Add-ons Junction Table
CREATE TABLE enquiry_addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  addon_id UUID REFERENCES addons(id) ON DELETE SET NULL,
  addon_name TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price NUMERIC(10, 2) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL
);

-- ==============================================================================
-- 9. VENDORS TABLE (Confidential Local Partners - Model B)
-- ==============================================================================
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT,
  location TEXT NOT NULL,
  services_provided TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  base_quotation NUMERIC(10, 2),
  commission_type TEXT DEFAULT 'percentage' CHECK (commission_type IN ('percentage', 'fixed')),
  commission_value NUMERIC(10, 2) DEFAULT 15.00,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor Assignments Junction
CREATE TABLE vendor_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  quoted_amount NUMERIC(10, 2),
  commission_amount NUMERIC(10, 2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 10. BOOKINGS TABLE (Confirmed Operational Events)
-- ==============================================================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id UUID UNIQUE REFERENCES enquiries(id) ON DELETE RESTRICT,
  booking_reference TEXT NOT NULL UNIQUE,
  final_amount NUMERIC(10, 2) NOT NULL,
  advance_received NUMERIC(10, 2) DEFAULT 0,
  balance_due NUMERIC(10, 2),
  event_date DATE NOT NULL,
  setup_start_time TIMESTAMPTZ,
  event_end_time TIMESTAMPTZ,
  lead_decorator_name TEXT,
  booking_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (
    booking_status IN ('confirmed', 'setup_ready', 'completed', 'cancelled')
  ),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 11. GALLERY IMAGES TABLE
-- ==============================================================================
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('birthday', 'engagement', 'wedding', 'reception', 'family')),
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 12. TESTIMONIALS TABLE
-- ==============================================================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 13. INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_event_date ON enquiries(event_date);
CREATE INDEX idx_packages_active ON packages(is_active, sort_order);
CREATE INDEX idx_addons_active ON addons(is_active, sort_order);
CREATE INDEX idx_gallery_published ON gallery_images(is_published, category);

-- ==============================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Anonymous Visitors)
CREATE POLICY "Public can view business settings" ON business_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active packages" ON packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active package inclusions" ON package_inclusions FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active addons" ON addons FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published gallery images" ON gallery_images FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (is_published = true);

-- PUBLIC WRITE POLICIES (Enquiries Submission Only)
CREATE POLICY "Public can submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit enquiry addons" ON enquiry_addons FOR INSERT WITH CHECK (true);

-- AUTHENTICATED ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admins full access profiles" ON profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access business settings" ON business_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access services" ON services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access packages" ON packages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access inclusions" ON package_inclusions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access addons" ON addons FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access enquiries" ON enquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access enquiry addons" ON enquiry_addons FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access vendors" ON vendors FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access vendor assignments" ON vendor_assignments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access bookings" ON bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access gallery" ON gallery_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access testimonials" ON testimonials FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- 15. SEED DATA (Packages, Add-ons, Services, Gallery Placeholders)
-- ==============================================================================

-- Initial Business Settings
INSERT INTO business_settings (company_name, tagline, phone, whatsapp, email, address, city, state, instagram_url)
VALUES (
  'Sasamal Events',
  'Making Every Celebration Special',
  '+91 XXXXX XXXXX',
  '919999999999',
  'hello@sasamalevents.com',
  'Navi Mumbai',
  'Navi Mumbai',
  'Maharashtra',
  'https://instagram.com/sasamalevents'
);

-- Seed Packages (₹1,500 Basic Celebration & ₹2,000 Standard Celebration)
INSERT INTO packages (id, name, slug, description, short_description, price, is_popular, is_active, sort_order)
VALUES
(
  'a1111111-1111-1111-1111-111111111111',
  'Basic Celebration',
  'basic-celebration',
  'Beautiful and simple birthday decoration for intimate celebrations.',
  'Simple and elegant birthday decoration setup.',
  1500.00,
  false,
  true,
  1
),
(
  'a2222222-2222-2222-2222-222222222222',
  'Standard Celebration',
  'standard-celebration',
  'An enhanced birthday decoration setup for a more special celebration.',
  'Enhanced decoration for a memorable birthday.',
  2000.00,
  true,
  true,
  2
);

-- Seed Package Inclusions
INSERT INTO package_inclusions (package_id, item_name, quantity, sort_order) VALUES
('a1111111-1111-1111-1111-111111111111', 'Balloon arrangement (assorted colours)', '1 set', 1),
('a1111111-1111-1111-1111-111111111111', 'Happy Birthday banner', '1', 2),
('a1111111-1111-1111-1111-111111111111', 'Ribbon decoration', '1 set', 3),
('a1111111-1111-1111-1111-111111111111', 'Table centrepiece', '1', 4),
('a1111111-1111-1111-1111-111111111111', 'Basic setup and arrangement', 'Included', 5),

('a2222222-2222-2222-2222-222222222222', 'Premium balloon arrangement', '1 set', 1),
('a2222222-2222-2222-2222-222222222222', 'Happy Birthday foil banner', '1', 2),
('a2222222-2222-2222-2222-222222222222', 'Ribbon and streamer decoration', '1 set', 3),
('a2222222-2222-2222-2222-222222222222', 'LED fairy lights', '1 string', 4),
('a2222222-2222-2222-2222-222222222222', 'Table centrepiece with flowers', '1', 5),
('a2222222-2222-2222-2222-222222222222', 'Photo corner setup', '1', 6),
('a2222222-2222-2222-2222-222222222222', 'Complete setup and arrangement', 'Included', 7);

-- Seed Addons
INSERT INTO addons (name, price, category, max_quantity, sort_order) VALUES
('Extra Balloons (pack of 25)', 150.00, 'balloons', 5, 1),
('Foil Number Balloons', 100.00, 'balloons', 10, 2),
('Foil Letter Balloons (per letter)', 80.00, 'balloons', 15, 3),
('LED Fairy Lights (extra string)', 200.00, 'lighting', 5, 4),
('Confetti Balloons', 120.00, 'balloons', 5, 5),
('Themed Backdrop Banner', 350.00, 'backdrop', 1, 6),
('Flower Bouquet (artificial)', 250.00, 'flowers', 3, 7),
('Party Props Set', 200.00, 'props', 2, 8);

-- Seed Services
INSERT INTO services (name, slug, description, short_description, category, sort_order) VALUES
('Ring Ceremony & Engagement', 'engagement-ring-ceremony', 'Elegant engagement stages, ring ceremony decorations and couple seating arrangements that create the perfect setting.', 'Elegant engagement stages, ring ceremony decorations and couple seating.', 'partner', 1),
('Haldi & Mehendi Decoration', 'haldi-mehendi-decorations', 'Vibrant yellow marigold setups, brass urlis, colorful Rajasthani drapes and decorated couple swings.', 'Bright marigold canopies, urli seating, tassel drapes and festive swings.', 'partner', 2),
('Wedding Mandap Decoration', 'wedding-mandap-decorations', 'Sacred square and dome mandaps styled with fresh marigolds, roses, brass lamps, havan kund and grand aisle pillars.', 'Traditional and modern mandaps, havan kund setup and grand aisle pillars.', 'partner', 3),
('Reception Stage & Seating', 'reception-decorations', 'Grand reception stages featuring floral walls, geometric LED frames, modern pendants and luxury couple seating.', 'Grand reception stages, floral walls, mood lighting and royal seating.', 'partner', 4),
('Birthday Celebrations', 'birthday-celebrations', 'Kids'' birthdays, adult birthdays and themed birthday decoration. Affordable direct packages from ₹1,500.', 'Kids'' birthdays, adult birthdays and themed balloon decoration.', 'direct', 5),
('Family Functions', 'family-functions', 'Baby showers, anniversaries, naming ceremonies and housewarming celebrations decorated with warmth and care.', 'Baby showers, anniversaries, naming ceremonies and housewarming celebrations.', 'direct', 6),
('Special Events & Proposals', 'special-events', 'Proposals, private parties and customised celebrations. Whatever the occasion, we create a personalised experience.', 'Terrace candlelit setups, romantic proposals and private events.', 'partner', 7);

-- Seed Demonstration Gallery Images
INSERT INTO gallery_images (title, description, image_url, category, sort_order) VALUES
('Birthday Balloon Setup', 'Colourful balloon arrangement for birthday celebration', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&fit=crop', 'birthday', 1),
('Kids Birthday Party', 'Themed decoration for a children''s birthday party', 'https://images.unsplash.com/photo-1464349153459-f0199f4a3a18?w=800&fit=crop', 'birthday', 2),
('Engagement Stage', 'Elegant engagement ceremony stage decoration', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&fit=crop', 'engagement', 3),
('Wedding Mandap', 'Traditional wedding mandap decoration with flowers', 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&fit=crop', 'wedding', 4),
('Reception Stage', 'Grand reception stage with floral arrangements', 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&fit=crop', 'reception', 5),
('Baby Shower', 'Pastel-themed baby shower decoration', 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&fit=crop', 'family', 6);
