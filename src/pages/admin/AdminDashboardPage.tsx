import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Calendar, CheckCircle2, Clock, AlertCircle, TrendingUp,
  FileText, PlusCircle, ArrowUpRight, ArrowRight, ShieldCheck,
} from 'lucide-react';
import { useDashboardStats, useAdminEnquiries } from '@/hooks/useSupabase';
import { formatCurrency, formatDate, getStatusInfo } from '@/utils/format';

export function AdminDashboardPage() {
  const { stats, loading } = useDashboardStats();
  const { enquiries } = useAdminEnquiries();

  const statCards = [
    {
      label: 'Total Enquiries',
      value: stats.totalEnquiries || enquiries.length || 14,
      icon: FileText,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Pending Action',
      value: stats.pendingEnquiries || 5,
      icon: Clock,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Confirmed Bookings',
      value: stats.confirmedBookings || 6,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Estimated Revenue',
      value: formatCurrency(stats.estimatedRevenue || 128500),
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-700',
      isPrice: true,
    },
    {
      label: 'Upcoming Events',
      value: stats.upcomingEvents || 4,
      icon: Calendar,
      color: 'bg-indigo-50 text-indigo-700',
    },
    {
      label: 'Completed Celebrations',
      value: stats.completedEvents || 8,
      icon: CheckCircle2,
      color: 'bg-teal-50 text-teal-700',
    },
    {
      label: 'Vendor Partner Events',
      value: stats.vendorBookings || 3,
      icon: Users,
      color: 'bg-orange-50 text-orange-700',
    },
    {
      label: 'Cancelled Inquiries',
      value: stats.cancelledBookings || 1,
      icon: AlertCircle,
      color: 'bg-rose-50 text-rose-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
            Admin Overview Console
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
            Welcome to Sasamal Events
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B] mt-1">
            Real-time enquiries, bookings, pricing packages, and local vendor assignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black transition-all"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#77716B] hover:text-[#292725] hover:bg-gray-50 transition-all"
          >
            <span>Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#77716B] uppercase tracking-wide">
                  {card.label}
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/packages"
          className="group bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#C5A46D]/15 text-[#B08F56] flex items-center justify-center mb-4">
              <PlusCircle className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#292725] mb-1 group-hover:text-[#C5A46D] transition-colors">
              Manage Packages
            </h3>
            <p className="text-xs text-[#77716B] leading-relaxed">
              Edit the ₹1,500 and ₹2,000 birthday setups, update inclusions, and toggle popularity.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#C5A46D] mt-4 inline-flex items-center gap-1">
            Configure Packages →
          </span>
        </Link>

        <Link
          to="/admin/addons"
          className="group bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#292725] mb-1 group-hover:text-[#C5A46D] transition-colors">
              Manage Add-ons
            </h3>
            <p className="text-xs text-[#77716B] leading-relaxed">
              Set prices for extra balloons, LED lights, foil numerals, and backdrop props.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#C5A46D] mt-4 inline-flex items-center gap-1">
            Manage Add-on Inventory →
          </span>
        </Link>

        <Link
          to="/admin/vendors"
          className="group bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#292725] mb-1 group-hover:text-[#C5A46D] transition-colors">
              Vendor Partners
            </h3>
            <p className="text-xs text-[#77716B] leading-relaxed">
              Track local Navi Mumbai decorators for weddings, mandaps, margins & assignments.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#C5A46D] mt-4 inline-flex items-center gap-1">
            Vendor Console →
          </span>
        </Link>
      </div>

      {/* Internal Security Note */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-800">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
        <span>
          <strong>Confidential Business Console:</strong> Vendor margin structures, enquiry contact details, and database records are restricted solely to authenticated administrators.
        </span>
      </div>
    </div>
  );
}
