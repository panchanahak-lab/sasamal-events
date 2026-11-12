import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AdminLayout } from '@/components/layout/AdminLayout';

// Lazy-loaded Customer Facing Pages
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PackagesPage = lazy(() => import('@/pages/PackagesPage').then(m => ({ default: m.PackagesPage })));
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const CancellationPolicyPage = lazy(() => import('@/pages/CancellationPolicyPage').then(m => ({ default: m.CancellationPolicyPage })));

// Lazy-loaded Admin Pages
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminPackagesPage = lazy(() => import('@/pages/admin/AdminPackagesPage').then(m => ({ default: m.AdminPackagesPage })));
const AdminAddonsPage = lazy(() => import('@/pages/admin/AdminAddonsPage').then(m => ({ default: m.AdminAddonsPage })));
const AdminEnquiriesPage = lazy(() => import('@/pages/admin/AdminEnquiriesPage').then(m => ({ default: m.AdminEnquiriesPage })));
const AdminVendorsPage = lazy(() => import('@/pages/admin/AdminVendorsPage').then(m => ({ default: m.AdminVendorsPage })));
const AdminGalleryPage = lazy(() => import('@/pages/admin/AdminGalleryPage').then(m => ({ default: m.AdminGalleryPage })));
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

// Supabase synchronization hooks
import { useBusinessSettings, usePackages, useAddons, useAuth } from '@/hooks/useSupabase';
import { isSupabaseConfigured } from '@/lib/supabase';

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF8F3]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-[#C5A46D]/30 border-t-[#C5A46D] rounded-full animate-spin" />
        <span className="font-heading text-sm text-[#77716B] tracking-wider uppercase">Sasamal Events</span>
      </div>
    </div>
  );
}

// Protected Admin Guard
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const isDemoAdmin = localStorage.getItem('sasamal_demo_admin') === 'true';

  if (!isSupabaseConfigured() || isDemoAdmin) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C5A46D]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export function App() {
  // Initialize and preload remote business settings, packages, and addons
  useBusinessSettings();
  usePackages();
  useAddons();

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Customer Facing Website Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="cancellation-policy" element={<CancellationPolicyPage />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Console Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="packages" element={<AdminPackagesPage />} />
            <Route path="addons" element={<AdminAddonsPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="vendors" element={<AdminVendorsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
