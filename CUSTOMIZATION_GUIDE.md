# 🎨 آسان Customization Guide

یہ guide بالکل beginners کے لیے ہے۔ صرف copy-paste کریں!

## 🚀 5 منٹ میں شروع کریں

### Step 1: اپنا نام اور تفصیل تبدیل کریں

فائل: `src/data/portfolioData.js` (Line 8-18)

```javascript
export const personalInfo = {
  name: "اپنا نام لکھیں",                    // مثال: Ahmed Ali
  title: "Full-Stack Developer",               // اپنی title
  subtitle: "Sr. Laravel, PHP, React Developer", // اپنی skills
  location: "اپنا شہر، ملک",                   // مثال: Karachi, Pakistan
  experience: "5+ Years",                       // اپنا تجربہ
  bio: "اپنے بارے میں 2-3 جملے...",           // اپنی bio
  email: "youremail@gmail.com",                 // اپنا email
  phone: "+92 300 1234567",                     // اپنا phone
  resumeUrl: "/resume.pdf",
};
```

### Step 2: اپنے Social Media Links ڈالیں

فائل: `src/data/portfolioData.js` (Line 20-25)

```javascript
export const socialLinks = {
  github: "https://github.com/اپنا-username",
  linkedin: "https://www.linkedin.com/in/اپنا-profile",
  twitter: "",  // چاہیں تو ڈالیں
  website: "",  // چاہیں تو ڈالیں
};
```

## 💼 اپنی Skills شامل کریں (Copy-Paste Ready)

فائل: `src/data/portfolioData.js` (Line 27 سے)

### Backend Developer کے لیے:

```javascript
export const skills = [
  {
    category: "Backend Development",
    items: [
      { name: "PHP", level: 95 },
      { name: "Laravel", level: 95 },
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 95 },
    ]
  },
  {
    category: "Frontend Development",
    items: [
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 80 },
      { name: "HTML/CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
    ]
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 80 },
      { name: "Linux", level: 85 },
    ]
  },
];
```

### Full-Stack Developer کے لیے:

```javascript
export const skills = [
  {
    category: "Backend Development",
    items: [
      { name: "Laravel", level: 95 },
      { name: "PHP", level: 95 },
      { name: "Node.js", level: 85 },
      { name: "MySQL", level: 90 },
      { name: "RESTful APIs", level: 95 },
    ]
  },
  {
    category: "Frontend Development",
    items: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 80 },
    ]
  },
];
```

### Frontend Developer کے لیے:

```javascript
export const skills = [
  {
    category: "Frontend Development",
    items: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
    ]
  },
  {
    category: "UI/UX Design",
    items: [
      { name: "Figma", level: 85 },
      { name: "Adobe XD", level: 80 },
      { name: "Responsive Design", level: 95 },
    ]
  },
  {
    category: "Tools & Libraries",
    items: [
      { name: "Redux", level: 85 },
      { name: "Material-UI", level: 90 },
      { name: "Git", level: 90 },
    ]
  },
];
```

## 🚀 اپنے Projects شامل کریں

فائل: `src/data/portfolioData.js`

### Template (Copy کریں اور تبدیل کریں):

```javascript
export const projects = [
  {
    id: 1,
    title: "اپنے Project کا نام",
    description: "اپنے project کی تفصیل یہاں لکھیں۔ مثال: یہ ایک e-commerce website ہے جس میں payment integration اور admin panel ہے۔",
    technologies: ["Laravel", "React", "MySQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
    githubUrl: "https://github.com/username/project-name",
    liveUrl: "https://project-demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "دوسرا Project",
    description: "تفصیل یہاں...",
    technologies: ["Next.js", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800",
    githubUrl: "https://github.com/username/project-name",
    liveUrl: "",
    featured: false,
  },
];
```

### Free Images کہاں سے لیں:

1. **Unsplash** (سب سے بہترین):
   - https://unsplash.com
   - "ecommerce" یا "dashboard" search کریں
   - Image پر right-click > "Copy Image Address"
   
2. **Pexels**:
   - https://pexels.com
   
3. **Pixabay**:
   - https://pixabay.com

### مشہور Categories کی Images:

```javascript
// E-Commerce
image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800"

// Chat App
image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800"

// Dashboard
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"

// Mobile App
image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800"

// Website
image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800"
```

## 💼 اپنا Experience شامل کریں

```javascript
export const experiences = [
  {
    id: 1,
    position: "Senior Full-Stack Developer",
    company: "اپنی Company کا نام",
    location: "Lahore, Pakistan",
    period: "Jan 2022 - Present",
    description: "اپنے کام کی تفصیل یہاں لکھیں",
    achievements: [
      "Application performance 60% improve کیا",
      "Team of 5 developers lead کیا",
      "Microservices architecture implement کیا",
    ]
  },
  {
    id: 2,
    position: "Full-Stack Developer",
    company: "پچھلی Company",
    location: "Karachi, Pakistan",
    period: "Jun 2020 - Dec 2021",
    description: "کام کی تفصیل...",
    achievements: [
      "20+ projects deliver کیں",
      "CI/CD pipeline setup کیا",
    ]
  },
];
```

## 🎓 Education شامل کریں

```javascript
export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "اپنی University کا نام",
    location: "شہر، ملک",
    year: "2015 - 2019",
    grade: "CGPA: 3.7/4.0"  // یا "First Division"
  }
];
```

## 🏆 Certifications شامل کریں

```javascript
export const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023"
  },
  {
    name: "Laravel Certified Developer",
    issuer: "Laravel",
    year: "2022"
  },
  {
    name: "React Professional Certification",
    issuer: "Meta",
    year: "2022"
  },
];
```

## 📧 Contact Form Email Setup

فائل: `public/api/contact.php` (Line 48)

```php
$to = "اپنا-actual-email@gmail.com"; // یہاں اپنا email ڈالیں
```

## 🎨 رنگ تبدیل کریں

فائل: `tailwind.config.js`

### Blue Theme (Default):
```javascript
colors: {
  primary: '#1e40af',
  secondary: '#3b82f6',
  accent: '#14b8a6',
}
```

### Purple Theme:
```javascript
colors: {
  primary: '#7c3aed',
  secondary: '#a78bfa',
  accent: '#ec4899',
}
```

### Green Theme:
```javascript
colors: {
  primary: '#059669',
  secondary: '#10b981',
  accent: '#34d399',
}
```

### Red Theme:
```javascript
colors: {
  primary: '#dc2626',
  secondary: '#ef4444',
  accent: '#f87171',
}
```

### Orange Theme:
```javascript
colors: {
  primary: '#ea580c',
  secondary: '#f97316',
  accent: '#fb923c',
}
```

## 🖼️ اپنی Photo شامل کریں (Optional)

1. اپنی professional photo کو `public/images/` folder میں save کریں
2. نام: `profile.jpg`

فائل: `src/components/Hero.jsx` میں image tag شامل کریں:

```javascript
<img 
  src="/images/profile.jpg" 
  alt={personalInfo.name}
  className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-primary shadow-xl"
/>
```

## 📱 Favicon تبدیل کریں

1. اپنا favicon بنائیں: https://favicon.io/
2. `public/` folder میں save کریں
3. فائل: `index.html` میں update کریں:

```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

## ✅ Quick Checklist

Copy-paste سے پہلے check کریں:

### ضروری تبدیلیاں:
- [ ] `personalInfo.name` - اپنا نام
- [ ] `personalInfo.email` - اپنا email
- [ ] `personalInfo.phone` - اپنا phone
- [ ] `personalInfo.bio` - اپنی bio
- [ ] `socialLinks.github` - اپنا GitHub
- [ ] `socialLinks.linkedin` - اپنا LinkedIn
- [ ] `skills` - اپنی skills
- [ ] `projects` - اپنے projects
- [ ] `experiences` - اپنا experience
- [ ] `education` - اپنی education
- [ ] `contact.php` email address

### Optional تبدیلیاں:
- [ ] Theme colors
- [ ] Profile photo
- [ ] Favicon
- [ ] Certifications

## 🆘 مسائل اور حل

### "Module not found" error
```bash
npm install
```

### Website نہیں چل رہی
```bash
npm run dev
```

### Colors نظر نہیں آ رہے
```bash
# Server restart کریں
Ctrl + C
npm run dev
```

### Changes نظر نہیں آ رہیں
- Browser refresh کریں (Ctrl + F5)
- Cache clear کریں

## 💡 Pro Tips

1. **Realistic Data ڈالیں:** 
   - Fake data نہ ڈالیں
   - Real projects showcase کریں

2. **Professional Tone:**
   - Grammar check کریں
   - Clear اور concise لکھیں

3. **Regular Updates:**
   - نئے projects شامل کرتے رہیں
   - Skills update کرتے رہیں

4. **Testing:**
   - Mobile پر test کریں
   - تمام links check کریں
   - Contact form test کریں

## 📚 اگلے Steps

1. ✅ Data customize کریں
2. ✅ Local میں test کریں
3. ✅ Deploy کریں
4. ✅ Share کریں!

---

**یاد رہے:** کوئی بھی change کرنے کے بعد browser refresh کریں!

مبارک ہو! اب آپ کی portfolio تیار ہے! 🎉

---

Need Help? README.md اور SETUP_GUIDE.md پڑھیں!

