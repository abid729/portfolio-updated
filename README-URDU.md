# 🚀 Muhammad Abid - Portfolio Website (اردو)

<div align="center">

![Portfolio](https://img.shields.io/badge/Portfolio-React-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

**ایک Modern، Professional اور Complete Portfolio Website**

[English README](README.md) | [Quick Start](QUICK_START.md) | [Live Demo](#)

</div>

---

## 📝 تعارف

یہ ایک **مکمل portfolio website** ہے جو React.js اور Tailwind CSS استعمال کرتے ہوئے بنائی گئی ہے۔ یہ website:

- ✅ مکمل **responsive** ہے
- ✅ **Modern** اور **professional** design
- ✅ **Smooth animations** کے ساتھ
- ✅ **Working contact form** (PHP backend)
- ✅ **Downloadable resume** section
- ✅ Deploy کرنے کے لیے **تیار**

---

## ✨ خصوصیات

### 🎨 Design & UI
- صاف اور professional interface
- تمام devices پر perfect display
- Smooth scrolling اور animations
- Modern gradient effects
- Hover effects اور transitions

### 📱 Sections
- **Hero:** Introduction اور call-to-action
- **About:** آپ کے بارے میں، experience، education
- **Skills:** Animated progress bars کے ساتھ
- **Projects:** Filterable project showcase
- **Resume:** Google Dev style resume (downloadable)
- **Contact:** Working form with PHP backend
- **Footer:** Links اور information

### 🛠️ Technical
- React 18 اور Vite 5
- Tailwind CSS 3
- Responsive design
- SEO optimized
- Fast performance

---

## 🚀 شروع کریں - 3 آسان Steps

### Step 1: Download اور Install

```bash
# Project download کریں (یا ZIP download کر کے extract کریں)
git clone https://github.com/abid729/MyPortfolioWebsite.git
cd MyPortfolioWebsite

# Dependencies install کریں
npm install
```

### Step 2: اپنی معلومات ڈالیں

فائل کھولیں: **`src/data/portfolioData.js`**

اپنا نام، email، skills، projects وغیرہ تبدیل کریں۔

```javascript
export const personalInfo = {
  name: "اپنا نام",
  email: "اپنا email",
  // ... باقی معلومات
};
```

### Step 3: چلائیں اور دیکھیں

```bash
npm run dev
```

Browser میں کھولیں: **http://localhost:5173**

---

## 📁 Project کی ساخت

```
MyPortfolioWebsite/
│
├── src/
│   ├── components/          # تمام UI components
│   ├── data/
│   │   └── portfolioData.js # ⭐ یہاں اپنی معلومات ڈالیں
│   ├── App.jsx
│   └── main.jsx
│
├── public/
│   └── api/
│       └── contact.php      # ⭐ یہاں email address تبدیل کریں
│
├── Documentation/           # تمام guides
│   ├── README.md           # English
│   ├── README-URDU.md      # اردو
│   ├── QUICK_START.md      # 10 منٹ میں شروع کریں
│   ├── SETUP_GUIDE.md      # تفصیلی guide
│   └── ...
│
└── Configuration files...
```

---

## ⚙️ کیسے Customize کریں

### 1. ذاتی معلومات تبدیل کریں

**فائل:** `src/data/portfolioData.js`

```javascript
export const personalInfo = {
  name: "Muhammad Abid",
  title: "Full-Stack Developer",
  email: "your-email@gmail.com",
  phone: "+92 300 1234567",
  location: "Lahore, Pakistan",
  bio: "اپنے بارے میں لکھیں...",
};
```

### 2. Social Links

```javascript
export const socialLinks = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
};
```

### 3. Skills شامل کریں

```javascript
export const skills = [
  {
    category: "Backend Development",
    items: [
      { name: "Laravel", level: 95 },
      { name: "PHP", level: 95 },
      // مزید skills...
    ]
  },
];
```

### 4. Projects شامل کریں

```javascript
export const projects = [
  {
    id: 1,
    title: "Project کا نام",
    description: "تفصیل...",
    technologies: ["Laravel", "React"],
    image: "image-url",
    githubUrl: "github-link",
    liveUrl: "demo-link",
    featured: true,
  },
];
```

### 5. Contact Form Email

**فائل:** `public/api/contact.php` (Line 48)

```php
$to = "your-email@gmail.com"; // یہاں اپنا email
```

---

## 🎨 رنگ تبدیل کریں

**فائل:** `tailwind.config.js`

```javascript
colors: {
  primary: '#1e40af',     // مرکزی رنگ
  secondary: '#3b82f6',   // ثانوی رنگ
  accent: '#14b8a6',      // Accent رنگ
}
```

**مشہور Color Schemes:**

```javascript
// Professional Blue (Default)
primary: '#1e40af', secondary: '#3b82f6', accent: '#14b8a6'

// Purple Theme
primary: '#7c3aed', secondary: '#a78bfa', accent: '#ec4899'

// Green Theme
primary: '#059669', secondary: '#10b981', accent: '#34d399'
```

---

## 🚀 Deploy کریں

### Option 1: GitHub Pages (مفت - Recommended)

```bash
# GitHub پر repository بنائیں اور پھر:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main

# Deploy کریں
npm run deploy
```

**2-5 منٹ بعد آپ کی website live ہو گی:**
`https://YOUR-USERNAME.github.io/portfolio/`

### Option 2: Vercel (سب سے آسان)

```bash
# Vercel CLI install کریں
npm i -g vercel

# Deploy کریں
vercel
```

یا Vercel website پر جا کر repository import کریں۔

### Option 3: Netlify

1. https://netlify.com پر جائیں
2. "New site from Git" click کریں
3. Repository connect کریں
4. Deploy!

### Option 4: Traditional Hosting (cPanel)

```bash
# Build بنائیں
npm run build

# dist folder کی files اپنے server پر upload کریں
```

تفصیلی guide: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📚 تمام Guides

| Guide | مقصد |
|-------|------|
| **QUICK_START.md** | 10 منٹ میں شروع کریں |
| **SETUP_GUIDE.md** | مکمل installation guide |
| **CUSTOMIZATION_GUIDE.md** | آسان customization |
| **DEPLOYMENT.md** | Deploy کرنے کی guide |
| **PROJECT_SUMMARY.md** | مکمل overview |

---

## 🐛 Common Issues

### Issue: Website نہیں چل رہی

```bash
npm install
npm run dev
```

### Issue: Changes نظر نہیں آ رہیں

- Browser refresh کریں (Ctrl + F5)
- Server restart کریں

### Issue: "Module not found" error

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build errors

```bash
npm run build
# Errors دیکھیں اور fix کریں
```

---

## 💡 Pro Tips

### 1. Real Data استعمال کریں
- Fake projects نہ ڈالیں
- Real work showcase کریں
- Honest information دیں

### 2. Regular Updates
- نئے projects شامل کرتے رہیں
- Skills update کرتے رہیں
- Resume تازہ رکھیں

### 3. Professional Photos
- اچھی quality کی images استعمال کریں
- Unsplash سے free images لیں

### 4. Test کریں
- Mobile پر test کریں
- تمام links check کریں
- Contact form test کریں

### 5. SEO Optimize
- Meta descriptions لکھیں
- Alt tags شامل کریں
- Sitemap update کریں

---

## ✅ Pre-Deployment Checklist

کیا تیار ہے؟

- [ ] Personal info update کی
- [ ] Email address صحیح ہے
- [ ] Social links تبدیل کیے
- [ ] Projects شامل کیں
- [ ] Skills update کیں
- [ ] Resume updated ہے
- [ ] Local میں test کیا
- [ ] Production build بنایا
- [ ] تمام links کام کر رہے ہیں
- [ ] Mobile responsive ہے

---

## 📊 Technologies

### Frontend
- React 18
- Vite 5
- Tailwind CSS 3
- React Icons
- React Scroll

### Backend
- PHP 7.4+
- OOP approach

### Deployment
- GitHub Pages
- Vercel
- Netlify
- cPanel support

---

## 🤝 Contributing

Contributions خوش آمدید ہیں!

1. Repository fork کریں
2. Feature branch بنائیں
3. Changes commit کریں
4. Pull request بنائیں

تفصیل: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

MIT License - آزادی سے استعمال کریں!

تفصیل: [LICENSE](LICENSE)

---

## 👨‍💻 Developer

**Muhammad Abid**  
Full-Stack Developer

- 🌐 GitHub: [@abid729](https://github.com/abid729)
- 💼 LinkedIn: [abid729](https://linkedin.com/in/abid729)
- 📧 Email: muhammad.abid@example.com
- 📍 Location: Lahore, Pakistan

---

## 🙏 شکریہ

اس project کو استعمال کرنے کا شکریہ!

**اگر پسند آئے تو:**
- ⭐ GitHub پر Star دیں
- 🔄 Share کریں
- 💬 Feedback دیں
- 🤝 Contribute کریں

---

## 🆘 مدد چاہیے؟

### Resources:
- **QUICK_START.md** - جلدی شروع کریں
- **SETUP_GUIDE.md** - تفصیلی guide
- **CUSTOMIZATION_GUIDE.md** - customization examples
- **DEPLOYMENT.md** - deployment guide

### Support:
- GitHub Issues میں سوال پوچھیں
- Email کریں: muhammad.abid@example.com
- Documentation پڑھیں

---

## 🎯 اگلے Steps

1. ✅ **ابھی:** Dependencies install کریں
2. ✏️ **پھر:** اپنی معلومات ڈالیں
3. 👀 **چیک:** Local preview دیکھیں
4. 🚀 **آخر میں:** Deploy کریں!

---

<div align="center">

**Made with ❤️ by Muhammad Abid**

بہت مبارک ہو! اب آپ کی professional portfolio تیار ہے! 🎉

اب `npm run dev` چلائیں اور customize کرنا شروع کریں!

---

[⬆ اوپر جائیں](#-muhammad-abid---portfolio-website-اردو)

</div>

