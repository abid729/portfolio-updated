# 🚀 Muhammad Abid - Personal Portfolio Website

![Portfolio](https://img.shields.io/badge/Portfolio-React-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## 📝 تعارف | Introduction

یہ ایک modern، responsive، اور professional portfolio website ہے جو React.js اور Tailwind CSS استعمال کرتے ہوئے بنائی گئی ہے۔

A modern, responsive, and professional portfolio website built with React.js and Tailwind CSS featuring smooth animations, dark mode support, and a contact form with PHP backend.

## ✨ خصوصیات | Features

- 🎨 **Modern Design**: Clean and professional UI/UX
- 📱 **Fully Responsive**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized with Vite
- 🎯 **Smooth Scrolling**: Seamless navigation between sections
- 💼 **Project Showcase**: Beautiful project cards with filtering
- 📄 **Downloadable Resume**: Professional resume with Google Dev style
- 📧 **Contact Form**: Working contact form with PHP backend
- 📊 **Visitor Tracking**: Automatic visitor analytics with dashboard ⭐ NEW
- 🚀 **Easy Deployment**: Ready to deploy on GitHub Pages
- 🎨 **Tailwind CSS**: Modern utility-first CSS framework
- 📊 **Skills Visualization**: Animated skill bars

## 📁 پروجیکٹ کی ساخت | Project Structure

```
MyPortfolioWebsite/
├── public/
│   ├── api/
│   │   ├── contact.php          # Contact form backend
│   │   ├── track-visit.php      # ⭐ Visitor tracking API
│   │   └── get-visitor-stats.php # Analytics API
│   ├── admin/
│   │   └── visitors.html        # 📊 Analytics Dashboard
│   └── vite.svg                  # Favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Hero.jsx              # Hero/Landing section
│   │   ├── About.jsx             # About section
│   │   ├── Skills.jsx            # Skills section
│   │   ├── Projects.jsx          # Projects showcase
│   │   ├── Resume.jsx            # Resume section
│   │   ├── Contact.jsx           # Contact form
│   │   └── Footer.jsx            # Footer
│   ├── data/
│   │   └── portfolioData.js      # ⭐ اپنی معلومات یہاں تبدیل کریں
│   ├── hooks/
│   │   └── useVisitorTracking.js # Visitor tracking hook
│   ├── utils/
│   │   └── visitorTracker.js     # Tracking utility
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ انسٹالیشن | Installation

### Prerequisites

- Node.js (v16 یا زیادہ / v16 or higher)
- npm یا yarn
- Git

### Steps

1. **Repository کلون کریں:**
```bash
git clone https://github.com/abid729/MyPortfolioWebsite.git
cd MyPortfolioWebsite
```

2. **Dependencies انسٹال کریں:**
```bash
npm install
```

3. **Development server چلائیں:**
```bash
npm run dev
```

4. **Browser میں کھولیں:**
```
http://localhost:5173
```

## ⚙️ اپنی معلومات تبدیل کریں | Customize Your Information

### مرحلہ 1: اپنی ذاتی معلومات تبدیل کریں

فائل کھولیں: `src/data/portfolioData.js`

```javascript
export const personalInfo = {
  name: "آپ کا نام",                    // Your Name
  title: "آپ کا Title",                // Your Title
  subtitle: "آپ کی Profession",        // Your Profession
  location: "آپ کا شہر، ملک",          // Your Location
  experience: "5+ Years",              // Your Experience
  bio: "اپنے بارے میں لکھیں...",       // Your Bio
  email: "your.email@example.com",     // Your Email
  phone: "+92 300 1234567",            // Your Phone
  resumeUrl: "/resume.pdf",            // Resume URL
};
```

### مرحلہ 2: Social Links تبدیل کریں

```javascript
export const socialLinks = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
  twitter: "",    // Optional
  website: "",    // Optional
};
```

### مرحلہ 3: Skills شامل کریں

```javascript
export const skills = [
  {
    category: "Backend Development",
    items: [
      { name: "Laravel", level: 95 },
      { name: "PHP", level: 95 },
      // مزید skills شامل کریں
    ]
  },
  // مزید categories شامل کریں
];
```

### مرحلہ 4: Projects شامل کریں

```javascript
export const projects = [
  {
    id: 1,
    title: "Project کا نام",
    description: "Project کی تفصیل",
    technologies: ["Laravel", "React", "MySQL"],
    image: "https://your-image-url.com/image.jpg",
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    featured: true,  // Featured projects کے لیے
  },
  // مزید projects شامل کریں
];
```

### مرحلہ 5: Experience اپ ڈیٹ کریں

```javascript
export const experiences = [
  {
    id: 1,
    position: "آپ کی Position",
    company: "Company کا نام",
    location: "شہر، ملک",
    period: "Jan 2022 - Present",
    description: "اپنے کام کی تفصیل",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ]
  },
];
```

## 📧 Contact Form Setup

### PHP Backend Configuration

1. **Email تبدیل کریں** فائل میں: `public/api/contact.php`

```php
$to = "your-email@example.com"; // اپنا email یہاں ڈالیں
```

2. **Local Development کے لیے:**
   - XAMPP یا WAMP استعمال کریں
   - یا `php -S localhost:8000` چلائیں

3. **Production میں:**
   - Server پر PHP enabled ہونا ضروری ہے
   - Email functionality کام کر رہی ہو

## 🐳 Docker Deployment (نیا!)

### فوری شروعات | Quick Start

Docker استعمال کرنے کے لیے:

```bash
# آسان ترین طریقہ / Easiest way
./docker-start.sh

# یا Docker Compose / Or Docker Compose
docker-compose up -d --build
```

**Access:** http://localhost:8080

### Docker Benefits | فوائد

- ✅ یکدم setup (no dependencies)
- ✅ PHP + Nginx included
- ✅ Production-ready
- ✅ کسی بھی platform پر چلتا ہے
- ✅ Isolated environment

**تفصیلی guide:** [README-DOCKER.md](README-DOCKER.md) یا [DOCKER_GUIDE.md](DOCKER_GUIDE.md)

## 🚀 Build اور Deploy کریں

### Build for Production

```bash
npm run build
```

یہ command `dist` folder بنائے گا۔

### GitHub Pages پر Deploy کریں

1. **Repository بنائیں:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/portfolio.git
git push -u origin main
```

2. **Deploy کریں:**
```bash
npm run deploy
```

3. **GitHub Repository Settings میں:**
   - Settings > Pages پر جائیں
   - Source: `gh-pages` branch منتخب کریں
   - Save کریں

4. **آپ کی website لائیو ہو گی:**
```
https://your-username.github.io/MyPortfolioWebsite/
```

### دوسرے Deployment Options

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
1. Netlify پر اکاؤنٹ بنائیں
2. Repository کو connect کریں
3. Build command: `npm run build`
4. Publish directory: `dist`

#### Traditional Hosting (cPanel)
1. `npm run build` چلائیں
2. `dist` folder کی files upload کریں
3. Domain setup کریں

## 🎨 رنگ تبدیل کریں | Customize Colors

فائل: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1e40af',    // اپنا primary رنگ
      secondary: '#3b82f6',  // اپنا secondary رنگ
      accent: '#14b8a6',     // اپنا accent رنگ
    },
  },
},
```

## 📱 Responsive Design

یہ website تمام screen sizes پر کام کرتی ہے:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 📊 Visitor Tracking & Analytics ⭐ NEW

### خصوصیات | Features

یہ portfolio automatically تمام visitors کی معلومات track کرتی ہے:

✅ **Tracked Data:**
- IP Address
- Device Type (Mobile/Tablet/Desktop)
- Browser Name & Version
- Operating System
- Country & City (from IP)
- Page URL & Referrer
- Visit Date & Time
- Screen Resolution, Language, Timezone

✅ **Features:**
- Automatic tracking (no manual work)
- Duplicate prevention (2 hours)
- SQLite database (no MySQL needed)
- Beautiful analytics dashboard
- Real-time statistics
- Export to CSV/JSON

### Analytics Dashboard

**Access:** `/admin/visitors.html`

**Local:** `http://localhost:5173/admin/visitors.html`

**Production:** `https://your-domain.com/admin/visitors.html`

**View:**
- Total visitors, today, week, month stats
- Top countries and cities
- Device types breakdown
- Browser and OS statistics
- Recent visitors (last 50)
- Hourly and daily trends

### Configuration

تفصیلی guide: **[VISITOR_TRACKING_GUIDE.md](VISITOR_TRACKING_GUIDE.md)**

**Quick Settings:**

1. **Duplicate Prevention Time** (`public/api/track-visit.php`):
```php
// Change from 2 hours to 1 hour
AND visit_time > datetime('now', '-1 hours')
```

2. **Dashboard Password Protection** (`.htaccess`):
```apache
AuthType Basic
AuthName "Restricted"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

### Privacy & Security

- Session-based tracking
- Duplicate prevention
- IP anonymization support (GDPR)
- Password-protected dashboard
- Local database (secure)

### How It Works

1. Visitor opens website
2. React hook automatically runs
3. Collects device/browser info
4. Sends to PHP backend
5. Saves in SQLite database
6. View in dashboard

**Note:** Database file automatically creates at `public/api/visitors.db`

## 🔧 Troubleshooting

### Issue 1: Dependencies Install نہیں ہو رہیں

**حل:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Tailwind CSS کام نہیں کر رہی

**حل:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Issue 3: Contact Form کام نہیں کر رہا

**حل:**
- یقینی بنائیں کہ PHP server چل رہا ہے
- `public/api/contact.php` میں email تبدیل کریں
- Server پر mail() function enabled ہو

## 📚 استعمال شدہ Technologies

- **Frontend:**
  - React.js 18
  - Vite
  - Tailwind CSS
  - React Icons
  - React Scroll

- **Backend:**
  - PHP (Contact Form)

- **Deployment:**
  - GitHub Pages
  - Vercel / Netlify

## 🤝 Contributing

اگر آپ اس project میں contribute کرنا چاہتے ہیں:

1. Repository کو Fork کریں
2. نئی branch بنائیں (`git checkout -b feature/AmazingFeature`)
3. اپنی changes commit کریں (`git commit -m 'Add some AmazingFeature'`)
4. Branch کو Push کریں (`git push origin feature/AmazingFeature`)
5. Pull Request بنائیں

## 📄 License

MIT License - تفصیلات کے لیے [LICENSE](LICENSE) فائل دیکھیں۔

## 👨‍💻 Developer

**Muhammad Abid**
- GitHub: [@abid729](https://github.com/abid729)
- LinkedIn: [abid729](https://linkedin.com/in/abid729)
- Email: muhammad.abid@example.com

## 🙏 شکریہ | Acknowledgments

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Unsplash](https://unsplash.com/) - Project images

---

⭐ اگر یہ project مددگار ہو تو Star دینا نہ بھولیں!

Made with ❤️ by Muhammad Abid

