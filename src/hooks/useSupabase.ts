import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useStore } from '@/stores/useStore';
import { defaultPackages, defaultAddons, defaultGalleryImages, defaultBusinessSettings } from '@/data/defaults';
import type { Package, Addon, GalleryImage, BusinessSettings, Enquiry, DashboardStats, Vendor, Testimonial } from '@/types';

/**
 * Fetch packages with inclusions
 */
export function usePackages() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { packages, setPackages } = useStore();

  useEffect(() => {
    async function fetchPackages() {
      if (!isSupabaseConfigured()) {
        setPackages(defaultPackages);
        setLoading(false);
        return;
      }
      try {
        const { data, error: err } = await supabase
          .from('packages')
          .select('*, inclusions:package_inclusions(*)')
          .eq('is_active', true)
          .order('sort_order');
        if (err) throw err;
        setPackages(data || defaultPackages);
      } catch (e: any) {
        setError(e.message);
        setPackages(defaultPackages);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, [setPackages]);

  return { packages, loading, error };
}

/**
 * Fetch addons
 */
export function useAddons() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addons, setAddons } = useStore();

  useEffect(() => {
    async function fetchAddons() {
      if (!isSupabaseConfigured()) {
        setAddons(defaultAddons);
        setLoading(false);
        return;
      }
      try {
        const { data, error: err } = await supabase
          .from('addons')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
        if (err) throw err;
        setAddons(data || defaultAddons);
      } catch (e: any) {
        setError(e.message);
        setAddons(defaultAddons);
      } finally {
        setLoading(false);
      }
    }
    fetchAddons();
  }, [setAddons]);

  return { addons, loading, error };
}

/**
 * Fetch gallery images
 */
export function useGalleryImages(category?: string) {
  const [images, setImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      if (!isSupabaseConfigured()) {
        const filtered = category && category !== 'all'
          ? defaultGalleryImages.filter((img: GalleryImage) => img.category === category)
          : defaultGalleryImages;
        setImages(filtered);
        setLoading(false);
        return;
      }
      try {
        let query = supabase
          .from('gallery_images')
          .select('*')
          .eq('is_published', true)
          .order('sort_order');
        if (category && category !== 'all') {
          query = query.eq('category', category);
        }
        const { data, error: err } = await query;
        if (err) throw err;
        setImages(data || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [category]);

  return { images, loading, error };
}

/**
 * Fetch business settings
 */
export function useBusinessSettings() {
  const { settings, setSettings } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      if (!isSupabaseConfigured()) {
        setSettings(defaultBusinessSettings);
        setLoading(false);
        return;
      }
      try {
        const { data, error: err } = await supabase
          .from('business_settings')
          .select('*')
          .single();
        if (err) throw err;
        if (data) setSettings(data);
      } catch {
        setSettings(defaultBusinessSettings);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [setSettings]);

  return { settings, loading };
}

/**
 * Submit an enquiry
 */
export function useSubmitEnquiry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitEnquiry = useCallback(async (enquiryData: Partial<Enquiry>) => {
    setLoading(true);
    setError(null);
    
    if (!isSupabaseConfigured()) {
      // Simulate submission in demo mode
      await new Promise(resolve => setTimeout(resolve, 600));
      setLoading(false);
      return { success: true, referenceNumber: enquiryData.reference_number || 'DEMO-REF' };
    }

    try {
      const { data, error: err } = await supabase
        .from('enquiries')
        .insert(enquiryData)
        .select()
        .single();
      if (err) throw err;
      
      // Insert addon selections if present
      if (enquiryData.enquiry_addons && enquiryData.enquiry_addons.length > 0) {
        const addonInserts = enquiryData.enquiry_addons.map((a: any) => ({
          ...a,
          enquiry_id: data.id,
        }));
        await supabase.from('enquiry_addons').insert(addonInserts);
      }

      setLoading(false);
      return { success: true, referenceNumber: data.reference_number };
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      return { success: false, referenceNumber: null };
    }
  }, []);

  return { submitEnquiry, loading, error };
}

/**
 * Fetch testimonials
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!isSupabaseConfigured()) {
        setTestimonials([]);
        setLoading(false);
        return;
      }
      try {
        const { data, error: err } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        if (err) throw err;
        setTestimonials(data || []);
      } catch {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return { testimonials, loading };
}

// ============ ADMIN HOOKS ============

/**
 * Fetch dashboard statistics (admin)
 */
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0, pendingEnquiries: 0, confirmedBookings: 0,
    upcomingEvents: 0, completedEvents: 0, cancelledBookings: 0,
    estimatedRevenue: 0, vendorBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    try {
      const { data: enquiries } = await supabase.from('enquiries').select('status, estimated_total, assigned_vendor_id');
      if (enquiries) {
        setStats({
          totalEnquiries: enquiries.length,
          pendingEnquiries: enquiries.filter((e: any) => ['new', 'contacted', 'quotation_sent', 'awaiting_confirmation'].includes(e.status)).length,
          confirmedBookings: enquiries.filter((e: any) => e.status === 'confirmed').length,
          upcomingEvents: enquiries.filter((e: any) => ['confirmed', 'in_progress'].includes(e.status)).length,
          completedEvents: enquiries.filter((e: any) => e.status === 'completed').length,
          cancelledBookings: enquiries.filter((e: any) => e.status === 'cancelled').length,
          estimatedRevenue: enquiries.filter((e: any) => ['confirmed', 'completed'].includes(e.status)).reduce((s: number, e: any) => s + (e.estimated_total || 0), 0),
          vendorBookings: enquiries.filter((e: any) => e.assigned_vendor_id).length,
        });
      }
    } catch { } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
}

/**
 * Fetch all enquiries (admin)
 */
export function useAdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = useCallback(async () => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    try {
      const { data, error: err } = await supabase
        .from('enquiries')
        .select('*, enquiry_addons(*)')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setEnquiries(data || []);
    } catch { } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (id: string, status: string, notes?: string) => {
    if (!isSupabaseConfigured()) return;
    const updates: any = { status, updated_at: new Date().toISOString() };
    if (notes !== undefined) updates.internal_notes = notes;
    await supabase.from('enquiries').update(updates).eq('id', id);
    fetchEnquiries();
  }, [fetchEnquiries]);

  useEffect(() => { fetchEnquiries(); }, [fetchEnquiries]);

  return { enquiries, loading, refetch: fetchEnquiries, updateStatus };
}

/**
 * Admin packages management
 */
export function useAdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = useCallback(async () => {
    if (!isSupabaseConfigured()) { setPackages(defaultPackages); setLoading(false); return; }
    try {
      const { data } = await supabase.from('packages').select('*, inclusions:package_inclusions(*)').order('sort_order');
      setPackages(data || []);
    } catch { } finally { setLoading(false); }
  }, []);

  const savePackage = useCallback(async (pkg: Partial<Package>) => {
    if (!isSupabaseConfigured()) return;
    if (pkg.id) {
      await supabase.from('packages').update(pkg).eq('id', pkg.id);
    } else {
      await supabase.from('packages').insert(pkg);
    }
    fetchPackages();
  }, [fetchPackages]);

  const deletePackage = useCallback(async (id: string) => {
    if (!isSupabaseConfigured()) return;
    await supabase.from('packages').update({ is_active: false }).eq('id', id);
    fetchPackages();
  }, [fetchPackages]);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);
  return { packages, loading, refetch: fetchPackages, savePackage, deletePackage };
}

/**
 * Admin addons management
 */
export function useAdminAddons() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddons = useCallback(async () => {
    if (!isSupabaseConfigured()) { setAddons(defaultAddons); setLoading(false); return; }
    try {
      const { data } = await supabase.from('addons').select('*').order('sort_order');
      setAddons(data || []);
    } catch { } finally { setLoading(false); }
  }, []);

  const saveAddon = useCallback(async (addon: Partial<Addon>) => {
    if (!isSupabaseConfigured()) return;
    if (addon.id) {
      await supabase.from('addons').update(addon).eq('id', addon.id);
    } else {
      await supabase.from('addons').insert(addon);
    }
    fetchAddons();
  }, [fetchAddons]);

  const deleteAddon = useCallback(async (id: string) => {
    if (!isSupabaseConfigured()) return;
    await supabase.from('addons').update({ is_active: false }).eq('id', id);
    fetchAddons();
  }, [fetchAddons]);

  useEffect(() => { fetchAddons(); }, [fetchAddons]);
  return { addons, loading, refetch: fetchAddons, saveAddon, deleteAddon };
}

/**
 * Admin vendors management
 */
export function useAdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = useCallback(async () => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    try {
      const { data } = await supabase.from('vendors').select('*').eq('is_active', true).order('name');
      setVendors(data || []);
    } catch { } finally { setLoading(false); }
  }, []);

  const saveVendor = useCallback(async (vendor: Partial<Vendor>) => {
    if (!isSupabaseConfigured()) return;
    if (vendor.id) {
      await supabase.from('vendors').update(vendor).eq('id', vendor.id);
    } else {
      await supabase.from('vendors').insert(vendor);
    }
    fetchVendors();
  }, [fetchVendors]);

  const deleteVendor = useCallback(async (id: string) => {
    if (!isSupabaseConfigured()) return;
    await supabase.from('vendors').update({ is_active: false }).eq('id', id);
    fetchVendors();
  }, [fetchVendors]);

  useEffect(() => { fetchVendors(); }, [fetchVendors]);
  return { vendors, loading, refetch: fetchVendors, saveVendor, deleteVendor };
}

/**
 * Admin gallery management
 */
export function useAdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    if (!isSupabaseConfigured()) { setImages(defaultGalleryImages); setLoading(false); return; }
    try {
      const { data } = await supabase.from('gallery_images').select('*').order('sort_order');
      setImages(data || []);
    } catch { } finally { setLoading(false); }
  }, []);

  const uploadImage = useCallback(async (file: File, metadata: Partial<GalleryImage>) => {
    if (!isSupabaseConfigured()) return;
    const fileName = `gallery/${Date.now()}-${file.name}`;
    const { data: fileData } = await supabase.storage.from('images').upload(fileName, file);
    if (fileData) {
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
      await supabase.from('gallery_images').insert({ ...metadata, image_url: publicUrl });
      fetchImages();
    }
  }, [fetchImages]);

  const deleteImage = useCallback(async (id: string) => {
    if (!isSupabaseConfigured()) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    fetchImages();
  }, [fetchImages]);

  const togglePublish = useCallback(async (id: string, published: boolean) => {
    if (!isSupabaseConfigured()) return;
    await supabase.from('gallery_images').update({ is_published: published }).eq('id', id);
    fetchImages();
  }, [fetchImages]);

  useEffect(() => { fetchImages(); }, [fetchImages]);
  return { images, loading, refetch: fetchImages, uploadImage, deleteImage, togglePublish };
}

/**
 * Admin business settings management
 */
export function useAdminSettings() {
  const [settings, setSettings] = useState<BusinessSettings>(defaultBusinessSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!isSupabaseConfigured()) { setSettings(defaultBusinessSettings); setLoading(false); return; }
    try {
      const { data } = await supabase.from('business_settings').select('*').single();
      if (data) setSettings(data);
    } catch { } finally { setLoading(false); }
  }, []);

  const saveSettings = useCallback(async (updated: Partial<BusinessSettings>) => {
    if (!isSupabaseConfigured()) return;
    await supabase.from('business_settings').update({ ...updated, updated_at: new Date().toISOString() }).eq('id', settings.id);
    fetchSettings();
  }, [settings.id, fetchSettings]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);
  return { settings, loading, saveSettings, refetch: fetchSettings };
}

/**
 * Auth hook for admin
 */
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, signIn, signOut };
}
