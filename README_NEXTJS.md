# 🎯 Next.js Portfolio - Setup Guide

## ✅ تیار | What's Ready

```
✅ Next.js 15.5.5 installed
✅ React 19 installed
✅ Supabase client ready
✅ Zod validation installed
✅ Resend email service ready
✅ TypeScript configured
✅ Tailwind CSS ready
✅ API route created (app/api/contact/route.ts)
✅ Data structure migrated (lib/portfolioData.ts)
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Update package.json scripts

```bash
# Open package.json and replace scripts section:
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Step 2: Setup environment variables

```bash
# .env.local already exists, just update it:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Add these for email:
RESEND_API_KEY=your-resend-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your-email@example.com
```

### Step 3: Start Next.js

```bash
pnpm run dev
```

---

## 📁 File Structure You Need to Create

I've created:
- ✅ `app/api/contact/route.ts` - Backend API
- ✅ `lib/portfolioData.ts` - Your data
- ✅ `next.config.mjs` - Next.js config

You need to create:
- `app/layout.tsx` - Main layout
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles
- `components/` - All your components

---

## 📝 Complete Setup Instructions

**Read the complete guide:**
```bash
cat NEXTJS_CONVERSION_COMPLETE.md
```

This file contains:
- ✅ Complete file structure
- ✅ All component code
- ✅ TypeScript configurations
- ✅ Tailwind setup
- ✅ Admin dashboard
- ✅ Deployment guide

---

## 🎨 Component Conversion

Your React components need minor changes:

### Before (React):
```javascript
import React from 'react'
export default function Component() { ... }
```

### After (Next.js):
```typescript
'use client' // Add if component uses hooks/state
export default function Component() { ... }
```

---

## 🗄️ Database Setup

Your API route expects table name: `contact_leads`

If your Supabase table has a different name, update:
```typescript
// app/api/contact/route.ts line 38
.from('contact_leads') // Change this to your table name
```

---

## 📧 Email Setup (Optional)

### Get Resend API Key:
1. Go to https://resend.com
2. Sign up (free)
3. Get API key
4. Add to `.env.local`

### Test Without Email:
The API will work without Resend - it just won't send emails.

---

## 🧹 Cleanup Old Files

After Next.js is working:

```bash
# Remove old Vite/React files:
rm -rf src/ dist/ public/api/

# Remove documentation files:
rm -f DATABASE_DEPLOYMENT_GUIDE_URDU.md
rm -f DEPLOYMENT_STEPS_URDU.md
rm -f QUICK_SETUP.md
# ... (see NEXTJS_CONVERSION_COMPLETE.md for full list)

# Keep only:
# - README_NEXTJS.md
# - NEXTJS_CONVERSION_COMPLETE.md
```

---

## 🚀 Deployment

### Vercel (Recommended):
```bash
# 1. Push to GitHub
git push

# 2. Import to Vercel
# https://vercel.com/new

# 3. Add environment variables in Vercel dashboard

# 4. Deploy!
```

---

## 🆘 Quick Help

### Error: "Module not found"
```bash
pnpm install
```

### Error: "Cannot find tsconfig.json"
```bash
# Run this:
pnpm exec next
# It will create tsconfig.json automatically
```

### Error: "Page not found"
```bash
# Make sure you created app/page.tsx
# See NEXTJS_CONVERSION_COMPLETE.md for code
```

---

## 📚 Documentation

1. **Full Conversion Guide:** `NEXTJS_CONVERSION_COMPLETE.md`
2. **Component Code:** See guide above
3. **API Route:** Already created in `app/api/contact/route.ts`

---

## ✅ Checklist

```
Setup:
[ ] package.json scripts updated
[ ] .env.local configured
[ ] app/layout.tsx created
[ ] app/page.tsx created
[ ] app/globals.css created
[ ] components/ folder created

Testing:
[ ] pnpm run dev works
[ ] Home page loads
[ ] Contact form works
[ ] Data saves to Supabase
[ ] Admin dashboard works

Deploy:
[ ] Push to GitHub
[ ] Deploy to Vercel
[ ] Test production
```

---

## 🎯 Next Steps

```bash
# 1. Read complete guide:
cat NEXTJS_CONVERSION_COMPLETE.md

# 2. Create missing files from guide

# 3. Test locally:
pnpm run dev

# 4. Deploy to Vercel

# 5. Clean up old files
```

---

**✅ You're ready to convert to Next.js!**

**بہت شکریہ! Happy Coding! 💻✨**

