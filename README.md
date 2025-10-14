# Portfolio Website - Muhammad Abid

A modern, full-stack portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- ⚡ Built with Next.js 15 and React 19
- 📝 Contact form with database integration (Supabase)
- 📧 Email notifications (Resend)
- 📊 Admin dashboard for managing leads
- 👁️ Visitor tracking and analytics
- 📈 Real-time statistics (visits, devices, locations)
- 🎯 TypeScript for type safety
- 💅 Styled with Tailwind CSS
- 🚀 Optimized for performance and SEO

## Tech Stack

- **Framework:** Next.js 15.5.5
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend
- **Validation:** Zod
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-new
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email (optional)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your_email@example.com
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio-new/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── contact/         # Contact form API
│   │   ├── track-visit/     # Visitor tracking API
│   │   └── visitor-stats/   # Analytics API
│   ├── admin/               # Admin dashboard
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Resume.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/                   # Custom React hooks
│   └── useVisitorTracking.ts  # Auto track visitors
├── lib/                     # Utilities and data
│   ├── portfolioData.ts    # Portfolio content
│   └── supabase.ts         # Supabase client
├── public/                  # Static assets
├── database-setup.sql      # Database schema (run once)
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Customization

### Update Your Information

Edit `lib/portfolioData.ts` to customize:
- Personal information
- Skills
- Projects
- Experience
- Education
- Certifications

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component-level styles: Tailwind utility classes

## Database Setup

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** in your Supabase dashboard
4. Click **"New Query"**
5. Copy all content from `database-setup.sql` file in this project
6. Paste in SQL Editor and click **"Run"**
7. Wait for success message
8. Copy your Supabase URL and anon key to `.env.local`

This will create:
- **contact_leads** table for form submissions
- **visitor_logs** table for tracking analytics
- Indexes for performance
- Row Level Security policies

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View and manage contact form submissions
- Track visitor analytics
- See real-time statistics (visits, unique visitors, devices)
- Export data to CSV
- View visitor demographics (location, browser, OS)

**Local:** http://localhost:3000/admin  
**Production:** https://your-domain.vercel.app/admin

## Visitor Tracking

The website automatically tracks visitor analytics including:
- 📊 Page visits and unique visitors
- 🌍 Geographic location (country, city) - detected from IP using ipapi.co
- 📱 Device type (mobile, desktop, tablet)
- 🌐 Browser and operating system
- 🔗 Referrer sources
- ⏰ Visit timestamps
- 📐 Screen resolution
- 🗣️ Language and timezone

### How It Works
1. Visitor opens website
2. Client-side hook collects device/browser info
3. Sends to `/api/track-visit` endpoint
4. Server checks if session already logged today (prevents duplicates)
5. If new visit, detects location from IP using 3 free services (with automatic fallback):
   - ip-api.com (primary - 45 req/min)
   - ipapi.co (backup - 1000 req/day)
   - ipwhois.app (fallback - unlimited)
6. Saves to `visitor_logs` table (one entry per session per day)
7. Admin can view in dashboard with full location data

### Privacy & Data Management
- No personal data is collected
- Only anonymous analytics
- Session-based tracking (not user-based)
- **One entry per session per day** (prevents duplicates)
- IP-based geolocation (city-level accuracy)
- Compliant with privacy best practices
- Uses free IP geolocation services (no API key needed)
- Multiple fallback services for reliability

### Duplicate Prevention
The system prevents duplicate entries in two ways:
1. **Application-level:** Checks if session already logged today before inserting
2. **Database-level:** Unique constraint on `(session_id, date)` prevents duplicates at DB level

### Disable Tracking
To disable visitor tracking, remove or comment out this line in `app/page.tsx`:
```typescript
useVisitorTracking()
```

## API Routes

- **POST** `/api/contact` - Submit contact form
- **POST** `/api/track-visit` - Track visitor (automatic)
- **GET** `/api/visitor-stats` - Get analytics statistics

## License

MIT License - feel free to use this template for your own portfolio!

## Author

**Muhammad Abid**
- Email: abidali31570@gmail.com
- GitHub: [@abid729](https://github.com/abid729)
- LinkedIn: [abid729](https://linkedin.com/in/abid729)

---

Built with ❤️ using Next.js
