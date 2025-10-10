# 🧪 Visitor Tracking - Test Guide

## کیسے Test کریں؟

### Step 1: Development Server چلائیں

```bash
cd /var/www/html/practice/MyPortfolioWebsite
npm run dev
```

### Step 2: Website کھولیں

Browser میں:
```
http://localhost:5173
```

### Step 3: Console Check کریں

Browser Developer Tools کھولیں (F12) اور Console tab دیکھیں:

**Success:**
```
✅ Visitor tracked successfully
```

**Already Tracked:**
```
ℹ️ Visitor already tracked recently
```

**Error:**
```
❌ Error tracking visitor: [error details]
```

### Step 4: Database Check کریں

```bash
# Database file exist کرتی ہے؟
ls -lah public/api/visitors.db

# Database میں entries دیکھیں (SQLite required)
sqlite3 public/api/visitors.db "SELECT * FROM visitors ORDER BY visit_time DESC LIMIT 5;"
```

### Step 5: Analytics Dashboard دیکھیں

Browser میں:
```
http://localhost:5173/admin/visitors.html
```

**Expected Results:**
- Stats cards with numbers
- Device types chart
- Countries/cities table
- Recent visitors table

---

## 🧪 Manual API Testing

### Test 1: Track Visit Endpoint

```bash
curl -X POST http://localhost:5173/api/track-visit.php \
  -H "Content-Type: application/json" \
  -d '{
    "pageUrl": "http://localhost:5173/",
    "referrer": "Direct",
    "screenResolution": "1920x1080",
    "language": "en-US",
    "timezone": "Asia/Karachi",
    "sessionId": "test_session_123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Visit tracked successfully",
  "duplicate": false,
  "data": {
    "ip": "127.0.0.1",
    "location": "Localhost, Localhost",
    "device": "Desktop"
  }
}
```

### Test 2: Get Statistics Endpoint

```bash
curl http://localhost:5173/api/get-visitor-stats.php
```

**Expected Response:**
```json
{
  "success": true,
  "stats": {
    "total": 1,
    "today": 1,
    "week": 1,
    "month": 1
  },
  "topCountries": [...],
  "deviceTypes": [...],
  ...
}
```

---

## 🔍 Debugging

### Check 1: PHP Working?

```bash
php -v
```

Should show PHP version 7.4+

### Check 2: SQLite Extension?

```bash
php -m | grep sqlite
```

Should show: `pdo_sqlite` and `sqlite3`

### Check 3: File Permissions?

```bash
# Directory writable?
ls -ld public/api/
# Should show: drwxr-xr-x or drwxrwxr-x

# After database created:
ls -lah public/api/visitors.db
# Should show: -rw-rw-rw- or similar
```

### Check 4: CORS Issues?

Browser Console میں CORS errors check کریں:
```
Access-Control-Allow-Origin error
```

**Fix:** `track-visit.php` میں header check کریں (Line 9):
```php
header('Access-Control-Allow-Origin: *');
```

### Check 5: Network Tab

Browser DevTools > Network tab:
- `track-visit.php` call کو دیکھیں
- Status: 200 OK ہونا چاہیے
- Response دیکھیں

---

## 🧪 Different Scenarios Test کریں

### Test 1: Multiple Browsers

1. Chrome میں کھولیں → Track ہونا چاہیے
2. Firefox میں کھولیں → نیا entry
3. Safari میں کھولیں → نیا entry

**Result:** Dashboard میں 3 different browsers دکھنے چاہییں

### Test 2: Mobile Simulation

1. Browser DevTools > Device Toolbar (Ctrl+Shift+M)
2. Mobile device select کریں (iPhone, Samsung)
3. Page refresh کریں
4. Dashboard میں "Mobile" device دکھنا چاہیے

### Test 3: Duplicate Prevention

1. Website کھولیں → Track ہو گا
2. فوراً refresh کریں → "Already tracked" message
3. 2 hours بعد → نیا track ہو گا

**Quick Test (bypass 2 hours):**
localStorage clear کریں:
```javascript
// Browser Console میں
localStorage.removeItem('last_visit_tracked');
localStorage.removeItem('visitor_session_id');
location.reload();
```

### Test 4: Different Pages

1. Home page visit کریں
2. About section scroll کریں
3. Contact form دیکھیں

**Note:** Currently, same page load ہی track ہوتا ہے (SPA)

---

## 📊 Expected Database Structure

```sql
-- Check table structure
sqlite3 public/api/visitors.db ".schema visitors"
```

**Expected:**
```sql
CREATE TABLE visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address VARCHAR(45) NOT NULL,
    device_type VARCHAR(20),
    browser_name VARCHAR(50),
    ...
);
```

---

## ✅ Test Checklist

### Backend:
- [ ] PHP version 7.4+
- [ ] SQLite extension enabled
- [ ] `track-visit.php` accessible
- [ ] `get-visitor-stats.php` accessible
- [ ] Database auto-created
- [ ] File permissions correct

### Frontend:
- [ ] `useVisitorTracking` hook imported
- [ ] Hook called in App.jsx
- [ ] No console errors
- [ ] Network request successful
- [ ] LocalStorage data saved

### Functionality:
- [ ] First visit tracked
- [ ] Duplicate prevented (2 hours)
- [ ] Device type detected correctly
- [ ] Browser detected correctly
- [ ] Location detected (if not localhost)
- [ ] Dashboard loads
- [ ] Stats display correctly

### Dashboard:
- [ ] Stats cards show numbers
- [ ] Charts display
- [ ] Tables populated
- [ ] Recent visitors show
- [ ] Refresh button works

---

## 🐛 Common Issues & Solutions

### Issue 1: "Database error"

**Solution:**
```bash
cd public/api
chmod 755 .
touch visitors.db
chmod 666 visitors.db
```

### Issue 2: "Failed to track visit"

**Check:**
1. PHP running?
2. CORS enabled?
3. JSON data valid?

**Debug:**
```javascript
// Browser Console
fetch('/api/track-visit.php', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    pageUrl: window.location.href,
    referrer: document.referrer,
    screenResolution: `${screen.width}x${screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    sessionId: 'test_123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### Issue 3: Geolocation Not Working

**Expected for localhost:**
```json
{
  "country": "Localhost",
  "city": "Localhost"
}
```

**For real IP:** Check internet connection

### Issue 4: Dashboard Blank

**Check:**
```javascript
// Browser Console
fetch('/api/get-visitor-stats.php')
  .then(r => r.json())
  .then(console.log);
```

---

## 🎯 Production Testing

Deploy کرنے کے بعد:

### 1. Different Locations Test

- VPN استعمال کر کے different countries test کریں
- Friends کو different cities سے visit کرنے کو کہیں

### 2. Real Device Test

- اپنے mobile سے
- Tablet سے
- Different laptops سے

### 3. Analytics Verify

Dashboard میں verify کریں:
- Correct locations show ہو رہے ہیں
- Device types accurate ہیں
- Browser versions صحیح ہیں

---

## 📈 Performance Testing

### Check Database Size

```bash
ls -lh public/api/visitors.db
```

**Guidelines:**
- < 1 MB: Excellent
- 1-10 MB: Good
- > 10 MB: Consider cleanup

### Check Response Time

```bash
time curl -X POST http://localhost:5173/api/track-visit.php \
  -H "Content-Type: application/json" \
  -d '{"pageUrl":"test","referrer":"","screenResolution":"1920x1080"}'
```

**Expected:** < 500ms

---

## 🎉 Success Criteria

✅ All tests pass  
✅ No console errors  
✅ Database populating  
✅ Dashboard displaying data  
✅ Duplicate prevention working  
✅ Geolocation working (non-localhost)  
✅ Analytics accurate  

---

## 📞 Still Having Issues?

1. **Check logs:**
```bash
tail -f public/api/visit_log.txt
```

2. **PHP errors:**
```bash
php -l public/api/track-visit.php
```

3. **Browser console:** Check for JavaScript errors

4. **Network tab:** Check API responses

---

**مبارک ہو!** Tracking system successfully test ہو گیا! 🎉

اب production میں deploy کریں اور real visitors track کریں!

