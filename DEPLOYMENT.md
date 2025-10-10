# 🚀 Deployment Guide - تفصیلی گائیڈ

## 📋 فہرست

1. [GitHub Pages (مفت - Recommended)](#github-pages)
2. [Vercel (سب سے آسان)](#vercel)
3. [Netlify (مفت)](#netlify)
4. [Traditional Hosting (cPanel)](#traditional-hosting)
5. [AWS S3 (Advanced)](#aws-s3)

---

## GitHub Pages

### ✅ فوائد:
- مکمل مفت
- GitHub سے integrate
- Custom domain support
- HTTPS automatic

### 📝 Steps:

#### 1. GitHub Repository بنائیں

```bash
# پہلے GitHub پر repository بنائیں (github.com)
# پھر terminal میں:

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
``

#### 2. gh-pages Package استعمال کریں

```bash
# Install (already in package.json)
npm install gh-pages --save-dev

# Deploy کریں
npm run deploy
```

#### 3. GitHub Settings Configure کریں

1. Repository میں جائیں
2. **Settings** > **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** منتخب کریں
5. Folder: **/ (root)**
6. **Save** کریں

#### 4. Wait & Check

- 2-5 منٹ انتظار کریں
- URL: `https://YOUR-USERNAME.github.io/portfolio/`

### 🔧 Custom Domain Setup (Optional)

1. Domain provider میں:
   ```
   Type: CNAME
   Name: www
   Value: YOUR-USERNAME.github.io
   ```

2. GitHub repository میں:
   - Settings > Pages
   - Custom domain: `www.yourdomain.com`
   - Save

3. `public` folder میں `CNAME` file بنائیں:
   ```
   www.yourdomain.com
   ```

### ⚡ Updates Deploy کرنا

```bash
# Changes کریں
git add .
git commit -m "Updated content"
git push origin main

# Deploy کریں
npm run deploy
```

---

## Vercel

### ✅ فوائد:
- بہت تیز
- Automatic deployments
- مفت SSL
- بہترین performance

### 📝 Method 1: CLI سے

```bash
# Vercel CLI install کریں
npm i -g vercel

# Login کریں
vercel login

# Deploy کریں
vercel

# Production میں deploy کریں
vercel --prod
```

### 📝 Method 2: Dashboard سے (آسان)

1. https://vercel.com پر جائیں
2. GitHub سے Sign up کریں
3. **New Project** click کریں
4. Repository import کریں
5. Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Deploy** click کریں

### 🔧 Custom Domain

1. Vercel dashboard میں
2. Project > Settings > Domains
3. اپنا domain add کریں
4. DNS records update کریں

### ⚡ Automatic Updates

- GitHub پر push کریں
- Vercel automatically deploy کر دے گا
- Live URL: `your-project.vercel.app`

---

## Netlify

### ✅ فوائد:
- Drag & drop deployment
- مفت tier generous ہے
- Form handling built-in
- Split testing

### 📝 Method 1: Drag & Drop

```bash
# Build بنائیں
npm run build

# dist folder کو کھولیں
```

1. https://app.netlify.com پر جائیں
2. **Sites** > Drag & Drop area
3. `dist` folder کو drag کریں
4. Done!

### 📝 Method 2: Git Integration

1. https://app.netlify.com
2. **New site from Git**
3. GitHub connect کریں
4. Repository منتخب کریں
5. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
6. **Deploy site**

### 🔧 Contact Form (Netlify Forms)

فائل: `src/components/Contact.jsx` میں:

```html
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <!-- باقی fields -->
</form>
```

### ⚡ Environment Variables

1. Site settings > Build & deploy > Environment
2. Add variables:
   ```
   CONTACT_EMAIL=your@email.com
   ```

---

## Traditional Hosting (cPanel)

### ✅ کب استعمال کریں:
- پہلے سے hosting ہے
- PHP backend چاہیے
- Full control چاہیے

### 📝 Steps:

#### 1. Build بنائیں

```bash
npm run build
```

یہ `dist` folder بنائے گا۔

#### 2. Files Upload کریں

**Option A: File Manager**
1. cPanel login کریں
2. File Manager کھولیں
3. `public_html` میں جائیں
4. `dist` folder کی files upload کریں

**Option B: FTP**
```bash
# FileZilla یا کوئی FTP client استعمال کریں
Host: ftp.yourdomain.com
Username: your-username
Password: your-password

# dist folder کی files ko public_html میں upload کریں
```

#### 3. .htaccess Configure کریں

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

#### 4. PHP Backend Setup

```bash
# public_html میں api folder بنائیں
mkdir api

# contact.php upload کریں
# public/api/contact.php سے

# Email configuration check کریں
```

#### 5. File Permissions

```bash
# api folder ko executable بنائیں
chmod 755 api
chmod 644 api/contact.php
```

### 🔧 SSL Certificate

1. cPanel > SSL/TLS
2. Let's Encrypt سے free SSL install کریں
3. Force HTTPS enable کریں

---

## AWS S3 + CloudFront

### ✅ کب استعمال کریں:
- Enterprise level
- Global CDN چاہیے
- AWS ecosystem استعمال کرتے ہیں

### 📝 Steps:

#### 1. S3 Bucket بنائیں

```bash
aws s3 mb s3://your-portfolio-bucket
```

#### 2. Build Upload کریں

```bash
npm run build
aws s3 sync dist/ s3://your-portfolio-bucket
```

#### 3. Static Website Enable کریں

```bash
aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document index.html
```

#### 4. Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-bucket/*"
    }
  ]
}
```

#### 5. CloudFront Distribution (Optional)

- CloudFront console میں
- New distribution بنائیں
- Origin: S3 bucket
- SSL certificate setup کریں

---

## 🔍 Deployment Comparison

| Platform | Cost | Ease | Performance | SSL | Custom Domain |
|----------|------|------|-------------|-----|---------------|
| **GitHub Pages** | Free | ⭐⭐⭐⭐ | Good | ✅ | ✅ |
| **Vercel** | Free | ⭐⭐⭐⭐⭐ | Excellent | ✅ | ✅ |
| **Netlify** | Free | ⭐⭐⭐⭐⭐ | Excellent | ✅ | ✅ |
| **cPanel** | Paid | ⭐⭐⭐ | Good | ✅ | ✅ |
| **AWS S3** | Low cost | ⭐⭐ | Excellent | ✅ | ✅ |

---

## 🐛 Common Deployment Issues

### Issue 1: Blank Page / 404 Errors

**GitHub Pages:**
```javascript
// vite.config.js
base: '/repository-name/'
```

**Other Platforms:**
```javascript
// vite.config.js
base: '/'
```

### Issue 2: Routes Not Working

**.htaccess** (cPanel):
```apache
RewriteRule . /index.html [L]
```

**vercel.json**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**netlify.toml**:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue 3: Environment Variables

**Build time:**
```javascript
// vite.config.js
define: {
  'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
}
```

**Runtime:**
- Vercel: Environment Variables section
- Netlify: Build & deploy > Environment
- GitHub Pages: GitHub Secrets

### Issue 4: Contact Form Not Working

**Solutions:**
1. PHP backend: Use cPanel hosting
2. Serverless: Use Vercel Functions
3. Third-party: Use FormSpree or EmailJS
4. Netlify Forms: Built-in support

---

## ✅ Pre-Deployment Checklist

### Code:
- [ ] `npm run build` کامیابی سے چلتا ہے
- [ ] `npm run preview` test کیا
- [ ] تمام links کام کر رہے ہیں
- [ ] Images load ہو رہے ہیں
- [ ] Contact form test کیا

### Content:
- [ ] Personal info update کی
- [ ] Projects شامل کیں
- [ ] Skills update کیں
- [ ] Resume updated ہے
- [ ] Email address صحیح ہے

### Configuration:
- [ ] `vite.config.js` base URL صحیح ہے
- [ ] Environment variables set ہیں
- [ ] `.gitignore` صحیح ہے
- [ ] SEO meta tags add کیے

### Testing:
- [ ] Desktop پر test کیا
- [ ] Mobile پر test کیا
- [ ] تمام sections کام کر رہے ہیں
- [ ] Performance check کیا

---

## 📊 Post-Deployment

### 1. Google Analytics Setup (Optional)

```html
<!-- index.html میں -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Search Console

1. https://search.google.com/search-console
2. Add property
3. Verify ownership
4. Submit sitemap

### 3. Monitor Performance

- https://pagespeed.web.dev
- Lighthouse scores check کریں

---

## 🎉 مبارک ہو!

آپ کی portfolio website اب live ہے!

**اگلے Steps:**
1. Social media پر share کریں
2. LinkedIn profile میں add کریں
3. Resume میں link ڈالیں
4. Job applications میں استعمال کریں

---

**مدد چاہیے؟**
- README.md دیکھیں
- SETUP_GUIDE.md پڑھیں
- GitHub Issues میں پوچھیں

Made with ❤️ by Muhammad Abid

