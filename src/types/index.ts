// Database types matching Supabase schema
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url?: string;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  inclusions?: PackageInclusion[];
}

export interface PackageInclusion {
  id: string;
  package_id: string;
  item_name: string;
  quantity?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Addon {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category: string;
  max_quantity: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  image_url?: string;
  category: 'direct' | 'partner';
  group?: 'wedding' | 'birthday' | 'family' | 'special';
  group_name?: string;
  tagline?: string;
  features?: string[];
  pricing_note?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  reference_number: string;
  customer_name: string;
  phone: string;
  email?: string;
  event_category: string;
  event_date: string;
  event_time?: string;
  event_location?: string;
  venue_name?: string;
  venue_type?: 'indoor' | 'outdoor' | 'both';
  guest_count?: string;
  budget_range?: string;
  package_id?: string;
  package_name?: string;
  package_price?: number;
  addons_total?: number;
  estimated_total?: number;
  decoration_requirements?: string;
  decoration_style?: string;
  additional_notes?: string;
  reference_images?: string[];
  enquiry_type: 'package' | 'custom';
  status: EnquiryStatus;
  internal_notes?: string;
  assigned_vendor_id?: string;
  created_at: string;
  updated_at: string;
  enquiry_addons?: EnquiryAddon[];
}

export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'quotation_sent'
  | 'awaiting_confirmation'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface EnquiryAddon {
  id: string;
  enquiry_id: string;
  addon_id: string;
  addon_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Vendor {
  id: string;
  name: string;
  contact_number: string;
  email?: string;
  location: string;
  services_provided: string[];
  base_quotation?: number;
  commission_type?: 'percentage' | 'fixed';
  commission_value?: number;
  is_active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface VendorAssignment {
  id: string;
  vendor_id: string;
  enquiry_id: string;
  quoted_amount?: number;
  commission_amount?: number;
  payment_status: 'pending' | 'partial' | 'paid';
  notes?: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  event_type: string;
  rating: number;
  review_text: string;
  is_published: boolean;
  created_at: string;
}

export interface BusinessSettings {
  id: string;
  company_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  instagram_url?: string;
  facebook_url?: string;
  service_areas: string[];
  updated_at: string;
}

// Frontend types
export interface SelectedAddon {
  addon: Addon;
  quantity: number;
}

export interface BookingFormData {
  customerName: string;
  phone: string;
  email?: string;
  eventDate: string;
  eventTime?: string;
  eventLocation: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  selectedAddons: SelectedAddon[];
  addonsTotal: number;
  estimatedTotal: number;
  additionalRequirements?: string;
}

export interface CustomQuoteFormData {
  customerName: string;
  phone: string;
  email?: string;
  eventCategory: string;
  eventDate: string;
  venueName?: string;
  venueLocation?: string;
  venueType?: 'indoor' | 'outdoor' | 'both';
  guestCount?: string;
  budgetRange?: string;
  decorationRequirements?: string;
  decorationStyle?: string;
  referenceImages?: File[];
}

export interface DashboardStats {
  totalEnquiries: number;
  pendingEnquiries: number;
  confirmedBookings: number;
  upcomingEvents: number;
  completedEvents: number;
  cancelledBookings: number;
  estimatedRevenue: number;
  vendorBookings: number;
}
