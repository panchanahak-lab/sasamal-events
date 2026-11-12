import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, PlusCircle, MessageSquare, Users,
  Image, Settings, LogOut, Menu, X, ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/hooks/useSupabase';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Packages', path: '/admin/packages', icon: Package },
  { name: 'Add-ons', path: '/admin/addons', icon: PlusCircle },
  { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  { name: 'Vendors', path: '/admin/vendors', icon: Users },
  { name: 'Gallery', path: '/admin/gallery', icon: Image },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-heading text-lg font-bold text-charcoal">Sasamal Admin</span>
        <div className="w-9" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl animate-slide-down">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-heading text-lg font-bold text-charcoal">Admin Panel</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {sidebarLinks.map(link => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-gold/10 text-gold-dark' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
              <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
          <div className="flex items-center gap-2 px-6 py-5 border-b">
            <div>
              <span className="font-heading text-xl font-bold text-charcoal">Sasamal</span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-gold">Admin Panel</span>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-gold/10 text-gold-dark' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500 mb-3 px-3">
              Signed in as<br />
              <span className="text-charcoal font-medium">{user?.email || 'admin@sasamalevents.com'}</span>
            </div>
            <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
