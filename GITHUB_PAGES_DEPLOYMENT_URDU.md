# GitHub Pages پر Deployment کی مکمل گائیڈ

## ⚠️ اہم چیک لسٹ

### 1. Repository Name چیک کریں

آپ کی **GitHub repository کا نام** اور **vite.config.js میں base path** کو match کرنا ضروری ہے۔

مثال کے طور پر:
- اگر آپ کی repository کا نام `MyPortfolioWebsite` ہے
- تو vite.config.js میں: `base: '/MyPortfolioWebsite/'`

### 2. Vite Config میں Base Path کی تصدیق

`vite.config.js` فائل کھولیں اور چیک کریں:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',  // ← یہاں اپنی repository کا نام لکھیں
  build: {
    outDir: 'dist',
  }
})
```

**نوٹ:** Repository name کیس سینسٹیو ہوتا ہے!

---

## 🚀 GitHub Pages Setup کے طریقے

### طریقہ 1: GitHub Actions (خودکار - تجویز کردہ)

#### Step 1: Repository Settings
1. اپنی GitHub repository میں جائیں
2. **Settings** → **Pages** پر کلک کریں
3. **Source** کو **"GitHub Actions"** پر سیٹ کریں

#### Step 2: Code Push کریں
```bash
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

#### Step 3: انتظار کریں
- GitHub Actions خودکار طریقے سے build اور deploy کرے گا
- **Actions** ٹیب میں progress دیکھ سکتے ہیں
- 2-5 منٹ میں آپ کی site live ہو جائے گی

#### Step 4: اپنی Site دیکھیں
آپ کی site یہاں دستیاب ہو گی:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

### طریقہ 2: Manual Deployment (gh-pages سے)

#### Step 1: Dependencies انسٹال کریں
```bash
npm install
```

#### Step 2: Deploy کریں
```bash
npm run deploy
```

#### Step 3: Repository Settings
1. **Settings** → **Pages** پر جائیں
2. **Source** کو **"Deploy from a branch"** پر سیٹ کریں
3. **Branch** کو **"gh-pages"** اور folder کو **"/ (root)"** پر سیٹ کریں
4. **Save** کریں

---

## 🔧 عام مسائل اور حل

### مسئلہ 1: سفید صفحہ (Blank Page) نظر آ رہا ہے

**حل:**
- Browser console کھولیں (F12)
- اگر 404 errors نظر آئیں تو `vite.config.js` میں base path چیک کریں
- Base path repository name سے match ہونا چاہیے

### مسئلہ 2: CSS/JS فائلیں load نہیں ہو رہیں

**حل:**
```javascript
// vite.config.js
base: '/YOUR-EXACT-REPO-NAME/',  // Slash سے شروع اور ختم ہونا ضروری ہے
```

### مسئلہ 3: Build fail ہو رہا ہے

**حل:**
```bash
# Local پر test کریں
npm run build

# اگر errors آئیں تو انہیں پہلے ٹھیک کریں
```

### مسئلہ 4: 404 Page Not Found

**حل:**
1. Repository Settings → Pages میں جائیں
2. Source صحیح ہے چیک کریں:
   - **GitHub Actions** کے لیے: "GitHub Actions" select کریں
   - **gh-pages** کے لیے: "gh-pages" branch select کریں

### مسئلہ 5: Images/Assets load نہیں ہو رہے

**حل:**
- Images کو `/public` فولڈر میں رکھیں
- Code میں استعمال کرتے وقت: `<img src="/image.png" />` (base path خودکار لگ جائے گا)

---

## 📝 Deployment Checklist

- [ ] vite.config.js میں صحیح base path
- [ ] Repository name اور base path match کر رہے ہیں
- [ ] GitHub Settings → Pages میں صحیح source selected ہے
- [ ] Code build ہو رہا ہے (npm run build کام کر رہا ہے)
- [ ] .github/workflows/deploy.yml فائل موجود ہے
- [ ] Changes GitHub پر push کر دی گئی ہیں
- [ ] Actions ٹیب میں workflow successfully چل رہا ہے

---

## 🎯 فوری حل (Quick Fix)

اگر کچھ کام نہیں کر رہا، یہ کمانڈز چلائیں:

```bash
# 1. Repository name یاد کریں اور vite.config.js update کریں
# مثال: اگر repo name "MyPortfolioWebsite" ہے:

# 2. سب کچھ push کریں
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main

# 3. GitHub Settings میں:
#    - Settings → Pages → Source → "GitHub Actions" select کریں

# 4. Actions ٹیب میں دیکھیں - 2-5 منٹ میں deploy ہو جائے گا
```

---

## 🌐 آپ کی Site کا URL

Deploy ہونے کے بعد، آپ کی site یہاں ہو گی:

```
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/
```

مثال:
```
https://muhammadabid.github.io/MyPortfolioWebsite/
```

---

## 💡 مزید مدد

اگر پھر بھی کوئی مسئلہ ہو:

1. **Actions Tab**: GitHub repository میں Actions ٹیب دیکھیں - error logs وہاں ہوں گے
2. **Browser Console**: F12 دبا کر console errors دیکھیں
3. **Build Test**: `npm run build` locally چلا کر دیکھیں

---

**خوش قسمتی!** 🎉 

