# ⚡ Quick Start - 10 منٹ میں شروع کریں

## 🚀 Step 1: Install کریں (2 منٹ)

```bash
# Dependencies install کریں
npm install
```

## ✏️ Step 2: اپنی معلومات ڈالیں (5 منٹ)

فائل کھولیں: **`src/data/portfolioData.js`**

### تبدیل کریں:

```javascript
// Line 8: اپنا نام
name: "Muhammad Abid",  // ← یہاں اپنا نام

// Line 11: اپنا email
email: "muhammad.abid@example.com",  // ← یہاں اپنا email

// Line 20: GitHub link
github: "https://github.com/abid729",  // ← اپنا GitHub username

// Line 21: LinkedIn link
linkedin: "https://www.linkedin.com/in/abid729",  // ← اپنا LinkedIn
```

### Contact Form Email (Line 48 in `public/api/contact.php`):

```php
$to = "اپنا-email@gmail.com";  // ← یہاں اپنا email
```

## 👀 Step 3: Preview کریں (1 منٹ)

```bash
npm run dev
```

Browser میں کھولیں: http://localhost:5173

## 🎨 Step 4: Customize کریں (Optional)

### Projects شامل کریں:
`src/data/portfolioData.js` میں `projects` array دیکھیں

### Skills update کریں:
`src/data/portfolioData.js` میں `skills` array دیکھیں

### Colors تبدیل کریں:
`tailwind.config.js` میں `colors` دیکھیں

## 🚀 Step 5: Deploy کریں (2 منٹ)

### GitHub Pages پر:

```bash
# GitHub repository بنائیں اور پھر:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main

# Deploy کریں
npm run deploy
```

### یا Vercel پر (سب سے آسان):

```bash
npm i -g vercel
vercel
```

---

## 📚 تفصیلی Guides

- **مکمل Setup:** `SETUP_GUIDE.md` پڑھیں
- **Customization:** `CUSTOMIZATION_GUIDE.md` پڑھیں  
- **Deployment:** `DEPLOYMENT.md` پڑھیں
- **General Info:** `README.md` پڑھیں

---

## 🆘 مدد چاہیے؟

### Website نہیں چل رہی؟
```bash
npm install
npm run dev
```

### Changes نظر نہیں آ رہیں؟
- Browser refresh کریں (Ctrl + F5)

### Errors آ رہی ہیں؟
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## ✅ Complete Checklist

- [ ] npm install چلایا
- [ ] `portfolioData.js` میں name update کیا
- [ ] Email address تبدیل کیا
- [ ] GitHub/LinkedIn links update کیے
- [ ] Local preview دیکھا (`npm run dev`)
- [ ] Projects شامل کیں
- [ ] Deploy کیا

---

**مبارک ہو! 🎉 آپ کی portfolio تیار ہے!**

اگلا: Social media پر share کریں اور job applications میں استعمال کریں!

---

Made with ❤️ by Muhammad Abid

