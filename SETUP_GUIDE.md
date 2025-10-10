# 📘 مکمل Setup اور Deployment Guide

یہ تفصیلی guide آپ کو step by step سکھائے گی کہ کیسے اپنی portfolio website کو customize اور deploy کریں۔

## 📋 فہرست | Table of Contents

1. [تیاری | Prerequisites](#تیاری--prerequisites)
2. [ابتدائی Setup | Initial Setup](#ابتدائی-setup--initial-setup)
3. [اپنی معلومات شامل کریں | Add Your Information](#اپنی-معلومات-شامل-کریں--add-your-information)
4. [Contact Form Setup](#contact-form-setup)
5. [Local میں Test کریں | Test Locally](#local-میں-test-کریں--test-locally)
6. [GitHub Pages پر Deploy](#github-pages-پر-deploy)
7. [دوسرے Hosting Options](#دوسرے-hosting-options)

---

## تیاری | Prerequisites

### 1. Node.js اور npm Install کریں

**Windows:**
1. https://nodejs.org/ سے download کریں
2. Installer چلائیں اور install کریں
3. Terminal میں check کریں:
```bash
node --version
npm --version
```

**Linux/Mac:**
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
```

### 2. Git Install کریں

**Windows:**
- https://git-scm.com/download/win سے download کریں

**Linux:**
```bash
sudo apt-get install git
```

**Mac:**
```bash
brew install git
```

### 3. Code Editor

- VS Code (Recommended): https://code.visualstudio.com/
- یا کوئی اور editor جو آپ استعمال کرتے ہیں

---

## ابتدائی Setup | Initial Setup

### Step 1: Project Download کریں

**Option A: GitHub سے Clone کریں**
```bash
git clone https://github.com/abid729/MyPortfolioWebsite.git
cd MyPortfolioWebsite
```

**Option B: ZIP Download کریں**
1. GitHub repository سے ZIP download کریں
2. Extract کریں
3. Terminal میں folder میں جائیں

### Step 2: Dependencies Install کریں

```bash
npm install
```

یہ command تمام ضروری packages install کر دے گا۔ کچھ minutes لگ سکتے ہیں۔

### Step 3: Development Server چلائیں

```bash
npm run dev
```

Browser میں کھولیں: `http://localhost:5173`

---

## اپنی معلومات شامل کریں | Add Your Information

### 📝 Step 1: ذاتی معلومات

فائل کھولیں: `src/data/portfolioData.js`

```javascript
export const personalInfo = {
  name: "آپ کا پورا نام",
  title: "Full-Stack Developer",
  subtitle: "Sr. Laravel, PHP, React & Next.js Developer",
  location: "آپ کا شہر، ملک",
  experience: "5+ Years",
  bio: "یہاں اپنے بارے میں 2-3 جملے لکھیں...",
  email: "your.email@example.com",
  phone: "+92 300 1234567",
  resumeUrl: "/resume.pdf",
};
```

### 🔗 Step 2: Social Links

```javascript
export const socialLinks = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
  twitter: "https://twitter.com/your-handle", // Optional
  website: "https://your-website.com",        // Optional
};
```

### 💼 Step 3: Skills شامل کریں

```javascript
export const skills = [
  {
    category: "Backend Development",
    items: [
      { name: "Laravel", level: 95 },    // 0-100
      { name: "PHP", level: 95 },
      { name: "MySQL", level: 90 },
      // مزید skills...
    ]
  },
  {
    category: "Frontend Development",
    items: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 90 },
      // مزید skills...
    ]
  },
];
```

### 🚀 Step 4: Projects شامل کریں

```javascript
export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "تفصیل یہاں لکھیں...",
    technologies: ["Laravel", "React", "MySQL", "AWS"],
    image: "https://images.unsplash.com/photo-xxx", // یا local image
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    featured: true,  // Important projects کے لیے true کریں
  },
  // مزید projects...
];
```

**Images کے لیے Options:**

1. **Unsplash استعمال کریں** (Free):
   - https://unsplash.com/ پر جائیں
   - Image search کریں
   - URL copy کریں

2. **Local Images استعمال کریں:**
   - Images کو `public/images/` folder میں رکھیں
   - Path: `"/images/project1.jpg"`

### 💼 Step 5: Experience شامل کریں

```javascript
export const experiences = [
  {
    id: 1,
    position: "Senior Full-Stack Developer",
    company: "آپ کی Company کا نام",
    location: "شہر، ملک",
    period: "Jan 2022 - Present",
    description: "اپنے کام کی تفصیل...",
    achievements: [
      "Achievement 1 - مثال: Performance 60% improve کیا",
      "Achievement 2 - مثال: Team of 5 developers کو lead کیا",
      "Achievement 3",
    ]
  },
  // مزید experiences...
];
```

### 🎓 Step 6: Education اور Certifications

```javascript
export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University کا نام",
    location: "شہر، ملک",
    year: "2015 - 2019",
    grade: "CGPA: 3.7/4.0"
  }
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023"
  },
  // مزید certifications...
];
```

---

## Contact Form Setup

### PHP Backend Configuration

1. **فائل کھولیں:** `public/api/contact.php`

2. **اپنا Email تبدیل کریں:**

```php
$to = "your-actual-email@example.com"; // Line 48 پر
```

### Local Development کے لیے

**Option 1: XAMPP استعمال کریں**
1. XAMPP download کریں: https://www.apachefriends.org/
2. Install کریں
3. Apache start کریں
4. Project کو `htdocs` folder میں copy کریں

**Option 2: PHP Built-in Server**
```bash
# ایک terminal میں
cd public
php -S localhost:8000

# دوسرے terminal میں React چلائیں
npm run dev
```

### Production کے لیے

- Server پر PHP enabled ہونا ضروری ہے
- mail() function کام کرنا چاہیے
- یا PHPMailer استعمال کریں (advanced)

---

## Local میں Test کریں | Test Locally

### Development Mode

```bash
npm run dev
```

- URL: `http://localhost:5173`
- Auto-reload ہوتا رہے گا

### Production Build Test

```bash
npm run build
npm run preview
```

یہ actual production build test کرتا ہے۔

---

## GitHub Pages پر Deploy

### Step 1: GitHub Repository بنائیں

1. https://github.com پر جائیں
2. New repository بنائیں
3. نام دیں: `portfolio` یا `MyPortfolioWebsite`
4. Public رکھیں

### Step 2: Code Push کریں

```bash
# Git initialize کریں
git init

# تمام files add کریں
git add .

# Commit کریں
git commit -m "Initial portfolio commit"

# Main branch بنائیں
git branch -M main

# Remote add کریں (اپنا username ڈالیں)
git remote add origin https://github.com/your-username/portfolio.git

# Push کریں
git push -u origin main
```

### Step 3: GitHub Pages Enable کریں

**Method 1: Using gh-pages package (Recommended)**

```bash
# Deploy command چلائیں
npm run deploy
```

یہ automatically `gh-pages` branch بنا دے گا۔

**Method 2: Manual Setup**

1. GitHub repository میں جائیں
2. Settings > Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` منتخب کریں
5. Folder: `/root`
6. Save کریں

### Step 4: URL Check کریں

آپ کی website یہاں live ہو گی:
```
https://your-username.github.io/portfolio/
```

### Step 5: Base URL Update کریں (اگر ضرورت ہو)

اگر آپ کا repo نام `portfolio` نہیں ہے، تو `vite.config.js` میں تبدیل کریں:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // یہاں اپنا repo name ڈالیں
})
```

---

## دوسرے Hosting Options

### Option 1: Vercel (بہترین اور آسان)

#### Step 1: Vercel Account بنائیں
- https://vercel.com پر جائیں
- GitHub سے sign up کریں

#### Step 2: Deploy کریں
```bash
# Vercel CLI install کریں
npm i -g vercel

# Deploy کریں
vercel
```

یا:
1. Vercel dashboard میں
2. "New Project" click کریں
3. GitHub repository import کریں
4. Deploy کریں

**Free Custom Domain:**
- `your-name.vercel.app`

---

### Option 2: Netlify

#### Step 1: Account بنائیں
- https://netlify.com پر جائیں

#### Step 2: Deploy کریں

**Method A: Drag & Drop**
1. `npm run build` چلائیں
2. `dist` folder کو Netlify پر drag کریں

**Method B: Git Integration**
1. "New site from Git" click کریں
2. Repository connect کریں
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy کریں

---

### Option 3: Traditional Hosting (cPanel)

#### Step 1: Build بنائیں
```bash
npm run build
```

یہ `dist` folder بنائے گا۔

#### Step 2: Upload کریں
1. cPanel میں File Manager کھولیں
2. `public_html` میں جائیں
3. `dist` folder کی تمام files upload کریں

#### Step 3: .htaccess بنائیں

`public_html` میں `.htaccess` file بنائیں:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Step 4: PHP Setup
- `public/api/` folder upload کریں
- Email configuration check کریں

---

## 🎨 رنگ اور Theme تبدیل کریں

### Tailwind Colors

فائل: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1e40af',     // Navy Blue
      secondary: '#3b82f6',   // Blue
      accent: '#14b8a6',      // Teal
    },
  },
},
```

### مشہور Color Schemes:

**Professional Blue:**
```javascript
primary: '#1e40af'
secondary: '#3b82f6'
accent: '#14b8a6'
```

**Dark Purple:**
```javascript
primary: '#6b21a8'
secondary: '#a855f7'
accent: '#f472b6'
```

**Green Tech:**
```javascript
primary: '#047857'
secondary: '#10b981'
accent: '#34d399'
```

---

## 🐛 Common Issues اور حل

### Issue 1: npm install کام نہیں کر رہا

**حل:**
```bash
# Cache صاف کریں
npm cache clean --force

# node_modules delete کریں
rm -rf node_modules package-lock.json

# دوبارہ install کریں
npm install
```

### Issue 2: Vite serve نہیں ہو رہا

**حل:**
```bash
# Port تبدیل کریں
npm run dev -- --port 3000
```

### Issue 3: Tailwind CSS کام نہیں کر رہی

**حل:**
```bash
# Tailwind re-install کریں
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Development server restart کریں
npm run dev
```

### Issue 4: Build errors

**حل:**
```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build
```

### Issue 5: GitHub Pages پر CSS/JS load نہیں ہو رہا

**حل:**
`vite.config.js` میں base path check کریں:
```javascript
base: '/your-exact-repo-name/'
```

### Issue 6: Contact form کام نہیں کر رہا

**چیک کریں:**
1. PHP server چل رہا ہے؟
2. Email address صحیح ہے؟
3. Server پر mail() function enabled ہے؟

**Alternative:**
- EmailJS استعمال کریں (JavaScript-based)
- Formspree استعمال کریں

---

## 📊 Performance Optimization

### Images Optimize کریں
```bash
# TinyPNG استعمال کریں
# یا WebP format استعمال کریں
```

### Lazy Loading
```javascript
// Images کے لیے
<img loading="lazy" src="..." alt="..." />
```

---

## 🔄 Updates اور Maintenance

### Code Update کریں
```bash
git add .
git commit -m "Updated portfolio content"
git push origin main
npm run deploy  # GitHub Pages کے لیے
```

### Dependencies Update کریں
```bash
npm update
npm audit fix
```

---

## 📞 مدد چاہیے؟ | Need Help?

- **GitHub Issues:** Repository میں issue create کریں
- **Email:** muhammad.abid@example.com
- **Documentation:** README.md پڑھیں

---

## ✅ Checklist | Deploy سے پہلے

- [ ] تمام personal info update کی
- [ ] Social links تبدیل کیے
- [ ] Projects شامل کیں
- [ ] Skills update کیں
- [ ] Contact form email تبدیل کیا
- [ ] Local میں test کیا
- [ ] Production build test کیا
- [ ] Images optimize کیں
- [ ] README پڑھی
- [ ] Git repository بنائی
- [ ] Deploy کیا
- [ ] Live URL check کیا

---

بہت مبارک ہو! 🎉 آپ کی portfolio website اب لائیو ہے!

**اگلے Steps:**
1. اپنے CV میں website link شامل کریں
2. LinkedIn profile میں link ڈالیں
3. Job applications میں استعمال کریں

---

Made with ❤️ by Muhammad Abid

