# SASAMAL EVENTS

> **"Making Every Celebration Special."**  
> Professional Event Decoration & Management Website initially operating in Navi Mumbai, Maharashtra, India.

---

## 1. Project Overview & Business Positioning

**Sasamal Events** is an editorial-grade, responsive website designed for an event decoration and management enterprise in Navi Mumbai. The brand operates with a dual-segment hybrid business model:

1. **Model A: Direct Decoration Services**
   - For birthdays, kids' parties, anniversaries, baby showers, and intimate home functions.
   - Fixed, transparent pricing packages starting at **₹1,500** (Basic Celebration) and **₹2,000** (Standard Celebration).
   - An interactive live calculator allowing clients to add modular extras (extra balloons, LED lights, foil numbers, props) with real-time price totals and zero hidden fees.

2. **Model B: Partner-Based Event Management**
   - For larger celebrations: engagements, ring ceremonies, wedding mandaps, reception stages, and grand family milestones.
   - Comprehensive venue styling and vendor coordination across Navi Mumbai banquet halls and lawns.
   - Customized quotation workflow with budget ranges, venue parameters, and direct WhatsApp summary dispatch.
   - **Internal Confidentiality:** Vendor management, margins, and commissions are restricted strictly to the authenticated administrative panel and never exposed to the public.

---

## 2. Technical Architecture

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Zustand (State Management), React Router v7.
- **Backend / Database:** Supabase (PostgreSQL), Supabase Auth, Row Level Security (RLS) policies.
- **Styling System:** Warm Ivory (`#FAF8F3`), Deep Charcoal (`#292725`), Champagne Gold (`#C5A46D`), Muted Terracotta (`#B77C68`), with typography pairing *Cormorant Garamond* (Headings) and *DM Sans* (Interface & Body).
- **Deployment Platform:** Vercel (SPA configuration included via `vercel.json`).

---

## 3. Project Folder Structure

```
Sasamal Event/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── booking/
│   │   │   ├── PackageBookingModal.tsx    # Fixed-pricing booking journey & WhatsApp dispatch
│   │   │   └── QuoteModal.tsx            # Custom quote modal for weddings & engagements
│   │   ├── home/
│   │   │   ├── HeroSection.tsx           # Full-width editorial hero
│   │   │   ├── ServicesSection.tsx       # 6 image-based service cards
│   │   │   ├── PackagesSection.tsx       # ₹1,500 & ₹2,000 package cards with inclusions
│   │   │   ├── CustomiseSection.tsx      # Section 4 interactive live price calculator
│   │   │   ├── PremiumSection.tsx        # High-end wedding & stage highlight
│   │   │   ├── GalleryPreview.tsx        # Filterable portfolio & lightbox preview
│   │   │   ├── WhyChooseSection.tsx      # 4 core benefits
│   │   │   ├── HowItWorksSection.tsx     # 4-step horizontal process
│   │   │   ├── TestimonialsSection.tsx   # Verified client feedback container
│   │   │   └── ContactSection.tsx        # Direct contact & WhatsApp enquiry form
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx           # Authenticated admin console layout
│   │   │   ├── Footer.tsx                # Corporate footer with policies & links
│   │   │   ├── Layout.tsx                # Public client layout
│   │   │   ├── Navbar.tsx                # Sticky responsive navbar & mobile menu
│   │   │   └── WhatsAppButton.tsx        # Floating WhatsApp instant contact button
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Container.tsx
│   │       ├── Icons.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── Select.tsx
│   │       └── Textarea.tsx
│   ├── data/
│   │   └── defaults.ts                   # Fallback data for seamless demo/offline mode
│   ├── hooks/
│   │   └── useSupabase.ts                # Real-time Supabase hooks + admin management
│   ├── lib/
│   │   └── supabase.ts                   # Supabase client initialization & health check
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminAddonsPage.tsx       # Manage modular items & unit prices
│   │   │   ├── AdminDashboardPage.tsx    # KPIs, revenue, booking statuses
│   │   │   ├── AdminEnquiriesPage.tsx    # Lead lifecycle, status updates & notes
│   │   │   ├── AdminGalleryPage.tsx      # Upload, categorize & publish photos
│   │   │   ├── AdminLoginPage.tsx        # Secure administrator login
│   │   │   ├── AdminPackagesPage.tsx     # Edit package prices & inclusions
│   │   │   ├── AdminSettingsPage.tsx     # WhatsApp number, address, company info
│   │   │   └── AdminVendorsPage.tsx      # Confidential partner network & margins
│   │   ├── AboutPage.tsx
│   │   ├── CancellationPolicyPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── PackagesPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── ServicesPage.tsx
│   │   └── TermsPage.tsx
│   ├── stores/
│   │   └── useStore.ts                   # Global client store (packages, cart, settings)
│   ├── types/
│   │   └── index.ts                      # Strict TypeScript database & UI models
│   ├── utils/
│   │   ├── format.ts                     # Currency (INR), date, phone & ref generators
│   │   └── whatsapp.ts                   # WhatsApp message formatters & click-to-chat
│   ├── App.tsx                           # Code-split router & protected route guards
│   ├── index.css                         # Tailwind CSS styling, tokens & keyframes
│   ├── main.tsx
│   └── vite-env.d.ts
├── supabase/
│   └── schema.sql                        # Complete PostgreSQL schema, RLS & seed data
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vercel.json                           # Vercel SPA redirects & security headers
└── vite.config.ts
```

---

## 4. Installation & Local Development

### Prerequisites
- Node.js (version 18 or above recommended)
- npm or yarn

### Steps

1. **Clone or Navigate to the Directory:**
   ```bash
   cd "Sasamal Event"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Provide your Supabase URL and Anon Key (or leave as demo placeholders to run in offline demo mode):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_DEFAULT_WHATSAPP=919999999999
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 5. Supabase Database Setup & Schema Execution

1. Log into your [Supabase Dashboard](https://supabase.com).
2. Create a new project named `sasamal-events` (choose region `ap-south-1` Mumbai for optimal local latency).
3. Navigate to **SQL Editor** in the left sidebar.
4. Copy the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and paste it into the SQL Editor.
5. Click **Run**.
   - This creates all 13 relational tables (`packages`, `package_inclusions`, `addons`, `services`, `enquiries`, `enquiry_addons`, `vendors`, `vendor_assignments`, `bookings`, `gallery_images`, `testimonials`, `business_settings`, `profiles`).
   - Enables Row Level Security (RLS) on all tables.
   - Configures public read/insert policies and authenticated admin policies.
   - Populates initial packages (₹1,500 Basic & ₹2,000 Standard), inclusions, add-on catalog, service categories, and Navi Mumbai business settings.

---

## 6. Admin Account Setup Guide

1. In Supabase, go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter your administrator email (e.g., `admin@sasamalevents.com`) and a secure password.
4. Go to **SQL Editor** and associate the profile:
   ```sql
   INSERT INTO profiles (id, email, full_name, role)
   VALUES (
     'YOUR-USER-UUID-FROM-AUTH-USERS-TABLE',
     'admin@sasamalevents.com',
     'Sasamal Admin',
     'super_admin'
   );
   ```
5. Navigate to `http://localhost:5173/admin/login` on the website and log in.
6. *Note for testing:* When Supabase keys are not set, you can access the admin dashboard directly in **Demo Mode** via the login interface.

---

## 7. Vercel Deployment Instructions

1. Push your project repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. Configure the environment variables in the Vercel project settings:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Public Key
   - `VITE_DEFAULT_WHATSAPP`: Your official WhatsApp business phone number
4. Deploy. The included `vercel.json` ensures all deep link routes (`/services`, `/packages`, `/gallery`, `/admin/*`) resolve to `/index.html` with fast client-side routing and security headers.

---

## 8. WhatsApp Integration Guide

All WhatsApp buttons are dynamically linked to the admin-configurable WhatsApp phone number stored in `business_settings`:
- **For Birthday Packages:** Generates a structured message containing the selected base package, itemized add-on quantities, calculated total price (INR), event date, setup time, customer name, and Navi Mumbai location.
- **For Custom Event Quotations:** Generates an itemized request summarizing event category, venue type, guest count, and approximate budget range.
- **Floating Button:** Quick chat button fixed at the bottom right of all public pages.
