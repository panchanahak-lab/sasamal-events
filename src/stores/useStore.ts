import { create } from 'zustand';
import type { Package, Addon, SelectedAddon, BusinessSettings } from '@/types';
import { defaultBusinessSettings, defaultPackages, defaultAddons } from '@/data/defaults';

interface AppState {
  // Business settings
  settings: BusinessSettings;
  setSettings: (settings: BusinessSettings) => void;

  // Packages
  packages: Package[];
  setPackages: (packages: Package[]) => void;
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;

  // Addons
  addons: Addon[];
  setAddons: (addons: Addon[]) => void;
  selectedAddons: SelectedAddon[];
  addAddon: (addon: Addon) => void;
  removeAddon: (addonId: string) => void;
  updateAddonQuantity: (addonId: string, quantity: number) => void;
  clearAddons: () => void;

  // Calculations
  getAddonsTotal: () => number;
  getEstimatedTotal: () => number;

  // UI state
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setQuoteModalOpen: (open: boolean) => void;
}

export const useStore = create<AppState>()((set, get) => ({
  settings: defaultBusinessSettings,
  setSettings: (settings: BusinessSettings) => set({ settings }),

  packages: defaultPackages,
  setPackages: (packages: Package[]) => set({ packages }),
  selectedPackage: null,
  setSelectedPackage: (pkg: Package | null) => set({ selectedPackage: pkg }),

  addons: defaultAddons,
  setAddons: (addons: Addon[]) => set({ addons }),
  selectedAddons: [],
  addAddon: (addon: Addon) => {
    const existing = get().selectedAddons.find((sa: SelectedAddon) => sa.addon.id === addon.id);
    if (!existing) {
      set({ selectedAddons: [...get().selectedAddons, { addon, quantity: 1 }] });
    }
  },
  removeAddon: (addonId: string) => {
    set({ selectedAddons: get().selectedAddons.filter((sa: SelectedAddon) => sa.addon.id !== addonId) });
  },
  updateAddonQuantity: (addonId: string, quantity: number) => {
    set({
      selectedAddons: get().selectedAddons.map((sa: SelectedAddon) =>
        sa.addon.id === addonId ? { ...sa, quantity: Math.max(1, Math.min(quantity, sa.addon.max_quantity)) } : sa
      ),
    });
  },
  clearAddons: () => set({ selectedAddons: [] }),

  getAddonsTotal: () => {
    return get().selectedAddons.reduce((sum: number, sa: SelectedAddon) => sum + sa.addon.price * sa.quantity, 0);
  },
  getEstimatedTotal: () => {
    const pkg = get().selectedPackage;
    const addonsTotal = get().getAddonsTotal();
    return (pkg?.price || 0) + addonsTotal;
  },

  isMobileMenuOpen: false,
  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  isQuoteModalOpen: false,
  setQuoteModalOpen: (open: boolean) => set({ isQuoteModalOpen: open }),
}));
