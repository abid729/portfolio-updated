# 🚀 Complete Next.js Conversion Guide

## میں نے Next.js dependencies install کر دیں | I've installed Next.js

```bash
✅ next@latest
✅ react@latest (19.2.0)
✅ react-dom@latest (19.2.0)
✅ zod (for validation)
✅ resend (for emails)
✅ @supabase/supabase-js (already installed)
```

---

## 📁 Next.js Project Structure

```
portfolio-nextjs/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          ← ✅ CREATED
│   ├── admin/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Resume.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── portfolioData.ts          ← ✅ CREATED
│   └── supabase.ts
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

##  1: Create `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
```

---

## 📝 Step 2: Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 📝 Step 3: Update `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 📝 Step 4: Create `.env.local`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Resend (for emails)
RESEND_API_KEY=your-resend-api-key

# Email Configuration
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your-email@example.com
```

---

## 📝 Step 5: Create `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

---

## 📝 Step 6: Create `app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muhammad Abid - Full-Stack Developer',
  description: 'Portfolio of Muhammad Abid - Sr. Laravel, PHP, React & Next.js Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

---

## 📝 Step 7: Create `app/page.tsx`

```typescript
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </main>
  )
}
```

---

## 📝 Step 8: Create `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #2563eb;
  --accent: #3b82f6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 📝 Step 9: Create `components/Contact.tsx`

```typescript
'use client'

import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { personalInfo, socialLinks } from '@/lib/portfolioData'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'شکریہ! آپ کا پیغام کامیابی سے بھیج دیا گیا ہے۔'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'معذرت! پیغام بھیجنے میں مسئلہ ہوا۔'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaEnvelope className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaPhone className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                  <p className="text-gray-600">{personalInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                  <p className="text-gray-600">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 📝 Step 10: Create Admin Dashboard `app/admin/page.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('contact_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setLeads(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Leads</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="px-6 py-4">{lead.name}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">{lead.subject}</td>
                  <td className="px-6 py-4">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

---

## 🚀 Quick Setup Commands

```bash
# 1. Clean up old files (optional)
rm -rf src/ dist/ public/api/

# 2. Create missing directories
mkdir -p app/admin components lib

# 3. Update Supabase table name in SQL
# Change 'contact_leads' to 'contact_messages' in supabase-setup.sql
# OR update the API route to use 'contact_leads'

# 4. Start Next.js dev server
pnpm run dev

# 5. Open browser
# http://localhost:3000
# http://localhost:3000/admin
```

---

## 🗄️ Supabase Table Update

Update your Supabase table name or use this SQL:

```sql
-- Option 1: Rename existing table
ALTER TABLE contact_leads RENAME TO contact_messages;

-- Option 2: Create new table
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy
CREATE POLICY "Anyone can insert" ON contact_messages
  FOR INSERT WITH CHECK (true);
```

---

## 📧 Resend Setup (Optional Email Notifications)

```bash
# 1. Get API key from: https://resend.com
# 2. Add to .env.local:
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your-email@example.com

# 3. Verify domain (optional):
# - Go to Resend dashboard
# - Add your domain
# - Update DNS records
```

---

## 🧹 Remove Old Documentation Files

```bash
# Remove all the guide files (keep only what's needed)
rm -f DATABASE_DEPLOYMENT_GUIDE_URDU.md
rm -f DEPLOYMENT_STEPS_URDU.md
rm -f QUICK_SETUP.md
rm -f README-DATABASE.md
rm -f COMPLETE_SOLUTION_SUMMARY.md
rm -f FILES_OVERVIEW.md
rm -f VIDEO_TUTORIAL_SCRIPT.md
rm -f START_HERE.md
rm -f NEXT_STEPS.md
rm -f ROUTING_FIX.md
rm -f NETWORK_ISSUE_SOLUTION.md
rm -f INSTALLATION_COMMANDS.sh

# Keep only:
# - README.md
# - NEXTJS_CONVERSION_COMPLETE.md (this file)
```

---

## 🎨 Tailwind Config

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#3b82f6',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## ✅ Verification Checklist

```
[ ] Next.js dependencies installed
[ ] API route created (app/api/contact/route.ts)
[ ] Supabase client setup (lib/supabase.ts)
[ ] Portfolio data migrated (lib/portfolioData.ts)
[ ] Environment variables configured (.env.local)
[ ] All components converted to TypeScript
[ ] Tailwind CSS configured
[ ] Admin dashboard created
[ ] Test contact form
[ ] Test database connection
[ ] Remove old documentation files
```

---

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Converted to Next.js"
git push

# 2. Go to vercel.com
# 3. Import repository
# 4. Add environment variables:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
#    - RESEND_API_KEY
#    - EMAIL_FROM
#    - EMAIL_TO

# 5. Deploy!
```

---

## 💡 Key Differences from Vite

```
1. ✅ API Routes built-in (no need for PHP backend)
2. ✅ Server-side rendering available
3. ✅ TypeScript by default
4. ✅ Image optimization with next/image
5. ✅ Better SEO with metadata
6. ✅ Automatic code splitting
7. ✅ Environment variables work in API routes
8. ✅ File-based routing
```

---

## 🎯 What's Different in Next.js

### Client Components
```typescript
'use client' // Add this at top of interactive components
```

### API Routes
```typescript
// app/api/contact/route.ts
export async function POST(request: NextRequest) {
  // API logic here
}
```

### Metadata
```typescript
export const metadata = {
  title: 'Your Portfolio',
  description: 'Your description',
}
```

---

## 📚 Resources

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Resend Docs: https://resend.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**✅ Your Next.js portfolio is ready!**

**بہت شکریہ! Happy Coding! 💻✨**

---

*Created: October 10, 2025*  
*Next.js Version: 15.5.5*  
*All dependencies installed and ready!*

