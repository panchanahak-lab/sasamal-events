import React, { useState } from 'react';
import {
  MessageSquare, Phone, Calendar, Clock, MapPin, Eye,
  CheckCircle2, XCircle, Search, Filter, MessageCircle, X
} from 'lucide-react';
import { useAdminEnquiries, useAdminVendors } from '@/hooks/useSupabase';
import { formatCurrency, formatDate, getStatusInfo } from '@/utils/format';
import { openWhatsApp } from '@/utils/whatsapp';
import type { Enquiry, EnquiryStatus } from '@/types';

const allStatuses: { value: EnquiryStatus; label: string }[] = [
  { value: 'new', label: 'New Enquiry' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quotation_sent', label: 'Quotation Sent' },
  { value: 'awaiting_confirmation', label: 'Awaiting Confirmation' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export function AdminEnquiriesPage() {
  const { enquiries, updateStatus, loading } = useAdminEnquiries();
  const { vendors } = useAdminVendors();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [editingStatus, setEditingStatus] = useState<EnquiryStatus>('new');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      (e.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.reference_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.phone || '').includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenDetail = (e: Enquiry) => {
    setSelectedEnquiry(e);
    setInternalNotes(e.internal_notes || '');
    setEditingStatus(e.status);
  };

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    await updateStatus(selectedEnquiry.id, editingStatus, internalNotes);
    setSelectedEnquiry({
      ...selectedEnquiry,
      status: editingStatus,
      internal_notes: internalNotes,
    });
  };

  const handleDirectWhatsApp = (enquiry: Enquiry) => {
    const msg = `Hello ${enquiry.customer_name},\nThis is Sasamal Events concerning your decoration enquiry (${enquiry.reference_number}) for ${enquiry.event_category} on ${formatDate(enquiry.event_date)}.`;
    openWhatsApp(enquiry.phone, msg);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block mb-1">
          Lead & Booking Operations
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
          Enquiry Management
        </h1>
        <p className="text-xs sm:text-sm text-[#77716B]">
          Track incoming package requests, custom wedding leads, update booking lifecycles, and coordinate responses.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone or SE-ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#C5A46D]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#C5A46D] bg-white w-full sm:w-auto"
          >
            <option value="all">All Booking Statuses</option>
            {allStatuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-gray-200 text-[#77716B] uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-4 px-6">Reference & Date</th>
                <th className="py-4 px-6">Customer Details</th>
                <th className="py-4 px-6">Event Type & Date</th>
                <th className="py-4 px-6">Estimated Value</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enq) => {
                  const statusInfo = getStatusInfo(enq.status);
                  return (
                    <tr key={enq.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-[#292725] block">
                          {enq.reference_number || 'SE-DEMO'}
                        </span>
                        <span className="text-[11px] text-[#77716B]">
                          Enquired: {formatDate(enq.created_at || new Date().toISOString())}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-semibold text-[#292725] block">
                          {enq.customer_name}
                        </span>
                        <span className="text-xs text-[#77716B] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#C5A46D]" />
                          +91 {enq.phone}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-medium text-[#292725] block">
                          {enq.event_category}
                        </span>
                        <span className="text-xs text-[#77716B] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#C5A46D]" />
                          {formatDate(enq.event_date)}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-bold text-[#292725] font-heading text-base">
                        {enq.estimated_total ? (
                          formatCurrency(enq.estimated_total)
                        ) : enq.budget_range ? (
                          <span className="text-xs font-normal text-[#77716B] block">
                            Budget: {enq.budget_range}
                          </span>
                        ) : (
                          'Quot. Pending'
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDirectWhatsApp(enq)}
                            className="p-1.5 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDetail(enq)}
                            className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
                            title="View Full Details & Lifecycle"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-[#77716B]">
                    No enquiries match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-start pb-4 mb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D] block">
                  Enquiry Reference
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#292725]">
                  {selectedEnquiry.reference_number}
                </h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer info */}
              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-gray-200 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#77716B] block">Client Name</span>
                  <span className="font-bold text-sm text-[#292725]">{selectedEnquiry.customer_name}</span>
                </div>
                <div>
                  <span className="text-[#77716B] block">Contact</span>
                  <span className="font-bold text-sm text-[#292725]">+91 {selectedEnquiry.phone}</span>
                </div>
                <div>
                  <span className="text-[#77716B] block">Event Date</span>
                  <span className="font-bold text-[#292725]">{formatDate(selectedEnquiry.event_date)}</span>
                </div>
                <div>
                  <span className="text-[#77716B] block">Location / Venue</span>
                  <span className="font-bold text-[#292725]">{selectedEnquiry.event_location || selectedEnquiry.venue_name || 'Navi Mumbai'}</span>
                </div>
              </div>

              {/* Package or Custom specs */}
              {selectedEnquiry.package_name && (
                <div className="p-4 rounded-2xl border border-gray-200 text-xs">
                  <span className="text-[#77716B] font-semibold uppercase block mb-1">Selected Package</span>
                  <div className="flex justify-between items-center text-sm font-bold text-[#292725]">
                    <span>{selectedEnquiry.package_name}</span>
                    <span>{formatCurrency(selectedEnquiry.package_price || 0)}</span>
                  </div>

                  {selectedEnquiry.enquiry_addons && selectedEnquiry.enquiry_addons.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                      <span className="text-[#77716B] block font-medium">Included Add-ons:</span>
                      {selectedEnquiry.enquiry_addons.map((a, i) => (
                        <div key={i} className="flex justify-between text-[#77716B]">
                          <span>• {a.addon_name} (x{a.quantity})</span>
                          <span>{formatCurrency(a.total_price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-[#292725]">
                    <span>Total Order Estimate:</span>
                    <span className="text-[#C5A46D]">{formatCurrency(selectedEnquiry.estimated_total || 0)}</span>
                  </div>
                </div>
              )}

              {/* Requirements text */}
              {(selectedEnquiry.decoration_requirements || selectedEnquiry.additional_notes) && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                    Client Requirements / Notes
                  </span>
                  <p className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#292725] leading-relaxed">
                    {selectedEnquiry.decoration_requirements || selectedEnquiry.additional_notes}
                  </p>
                </div>
              )}

              {/* Status Update Form */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#292725] block">
                  Update Booking Lifecycle & Internal Notes
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#77716B] mb-1">
                      Change Status
                    </label>
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value as EnquiryStatus)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold outline-none focus:border-[#C5A46D] bg-white"
                    >
                      {allStatuses.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77716B] mb-1">
                    Internal Staff Notes (Not Visible to Client)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Quoted ₹35,000 via WhatsApp. Client confirmed flower color is blush pink..."
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-[#C5A46D]"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleDirectWhatsApp(selectedEnquiry)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BD5A]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open Client WhatsApp</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="px-5 py-2 rounded-xl bg-[#292725] text-white text-xs font-semibold hover:bg-black"
                  >
                    Save Status & Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
