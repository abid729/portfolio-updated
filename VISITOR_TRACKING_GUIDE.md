# 📊 Visitor Tracking System - مکمل گائیڈ

## 📝 تعارف | Introduction

آپ کی portfolio website میں اب ایک **automatic visitor tracking system** شامل ہے جو ہر visitor کی تفصیلات capture اور save کرتا ہے۔

### ✅ کیا Track ہوتا ہے:

- ✅ **IP Address** - Visitor کا IP
- ✅ **Device Type** - Mobile, Tablet, یا Desktop
- ✅ **Browser** - Name اور Version (Chrome, Firefox, etc.)
- ✅ **Operating System** - Windows, Mac, Linux, Android, iOS
- ✅ **Location** - Country, City, Region (IP سے)
- ✅ **Page URL** - کون سا page visit کیا
- ✅ **Referrer** - کہاں سے آیا (Google, Direct, etc.)
- ✅ **Visit Time** - Date اور time
- ✅ **Screen Resolution**
- ✅ **Language** - Browser language
- ✅ **Timezone**

### 🔒 Privacy Features:

- ⏱️ **Duplicate Prevention** - Same visitor کی 2 hours میں repeat entry نہیں
- 🔐 **Session-based** - Unique session ID سے track کرتا ہے
- 🗄️ **Local Database** - SQLite (secure, file-based)

---

## 📁 Files Structure

```
MyPortfolioWebsite/
├── public/
│   ├── api/
│   │   ├── track-visit.php          # ⭐ Main tracking endpoint
│   │   ├── get-visitor-stats.php    # Statistics API
│   │   └── visitors.db              # SQLite database (auto-created)
│   └── admin/
│       └── visitors.html            # 📊 Analytics Dashboard
│
└── src/
    ├── hooks/
    │   └── useVisitorTracking.js    # React hook
    └── utils/
        └── visitorTracker.js        # Tracking utility
```

---

## 🚀 کیسے کام کرتا ہے؟

### Step 1: Automatic Tracking

جب کوئی visitor website پر آتا ہے:

1. React app load ہوتی ہے
2. `useVisitorTracking` hook automatically چلتا ہے
3. Visitor کی معلومات collect ہوتی ہیں
4. Backend API (`/api/track-visit.php`) کو بھیجی جاتی ہیں
5. Database میں save ہو جاتی ہیں

### Step 2: Duplicate Prevention

- Visitor کی **session ID** localStorage میں save ہوتی ہے
- اگر same visitor 2 hours کے اندر دوبارہ آتا ہے، تو نیا entry نہیں بنتی
- یہ duplicate data سے بچاتا ہے

### Step 3: Geolocation

- IP address سے **country** اور **city** detect ہوتی ہے
- Free API استعمال ہوتی ہے: **ip-api.com**
- Real-time location tracking

---

## 📊 Analytics Dashboard

### Access کریں:

Browser میں کھولیں:
```
http://your-website.com/admin/visitors.html
```

یا Local development میں:
```
http://localhost:5173/admin/visitors.html
```

### کیا دیکھ سکتے ہیں:

#### 📈 Stats Cards:
- Total Visitors
- Today's Visitors
- This Week
- This Month

#### 📊 Charts & Tables:
- **Device Types** - Mobile vs Desktop vs Tablet
- **Top Countries** - کس ملک سے زیادہ visitors
- **Top Cities** - کن شہروں سے
- **Top Browsers** - Chrome, Firefox, Safari, etc.
- **Top Operating Systems** - Windows, Mac, Linux, etc.
- **Recent Visitors** - آخری 50 visitors کی تفصیل

---

## 🔧 Configuration

### 1. Duplicate Prevention Time تبدیل کریں

فائل: `public/api/track-visit.php` (Line 59)

```php
// 2 hours کو change کر سکتے ہیں
AND visit_time > datetime('now', '-2 hours')

// مثال: 1 hour کے لیے
AND visit_time > datetime('now', '-1 hours')

// مثال: 30 minutes کے لیے
AND visit_time > datetime('now', '-30 minutes')
```

### 2. Frontend Duplicate Time تبدیل کریں

فائل: `src/utils/visitorTracker.js` (Line 42)

```javascript
// 2 hours کو change کریں
return diffInHours < 2;

// مثال: 1 hour کے لیے
return diffInHours < 1;
```

### 3. Geolocation API تبدیل کریں

فائل: `public/api/track-visit.php` (Line 273)

**Default:** ip-api.com (Free, no API key)

**Alternative APIs:**

```php
// Option 1: ipapi.co (Free tier available)
$url = "https://ipapi.co/{$ip}/json/";

// Option 2: ipinfo.io (Needs API key)
$url = "https://ipinfo.io/{$ip}?token=YOUR_API_KEY";

// Option 3: ipgeolocation.io
$url = "https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_KEY&ip={$ip}";
```

---

## 🗄️ Database

### SQLite Database

Database automatically create ہوتا ہے:
```
public/api/visitors.db
```

### Table Schema:

```sql
CREATE TABLE visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address VARCHAR(45) NOT NULL,
    device_type VARCHAR(20),
    browser_name VARCHAR(50),
    browser_version VARCHAR(20),
    operating_system VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    region VARCHAR(100),
    page_url TEXT,
    referrer TEXT,
    visit_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    screen_resolution VARCHAR(20),
    language VARCHAR(10),
    timezone VARCHAR(50),
    session_id VARCHAR(100)
);
```

### MySQL استعمال کرنا چاہیں؟

فائل: `public/api/track-visit.php` (Line 25-30)

```php
// SQLite کو comment out کریں اور MySQL استعمال کریں:

$host = 'localhost';
$dbname = 'portfolio_db';
$username = 'your_username';
$password = 'your_password';

$db = new PDO(
    "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
    $username,
    $password
);

// اور table create query میں INTEGER کو INT میں تبدیل کریں
```

---

## 📱 Manual Tracking (Optional)

اگر کسی specific event پر track کرنا ہو:

```javascript
import { trackVisitor, trackPageView } from './utils/visitorTracker';

// Manual tracking
trackVisitor();

// Track specific page
trackPageView('/specific-page');
```

---

## 🔐 Security & Privacy

### 1. Dashboard کو Password Protect کریں

فائل: `public/admin/visitors.html`

**.htaccess** استعمال کریں:

```apache
# public/admin/.htaccess
AuthType Basic
AuthName "Restricted Access"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

یا PHP authentication:

فائل: `public/api/get-visitor-stats.php` (Lines 18-23)

```php
// Authentication enable کریں
$authKey = $_GET['key'] ?? '';
$expectedKey = 'your_secret_key_here'; // Strong key بنائیں

if ($authKey !== $expectedKey) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}
```

پھر URL میں:
```
/admin/visitors.html?key=your_secret_key_here
```

### 2. IP Anonymization (GDPR Compliance)

اگر IP addresses partially hide کرنا چاہیں:

فائل: `public/api/track-visit.php`

```php
// getVisitorIP() function میں IP کو anonymize کریں:
function anonymizeIP($ip) {
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
        // IPv4: آخری octet ہٹا دیں
        return preg_replace('/\.\d+$/', '.0', $ip);
    } else {
        // IPv6: آخری 80 bits ہٹا دیں
        return preg_replace('/:[^:]+:[^:]+:[^:]+:[^:]+$/', '::', $ip);
    }
}

// استعمال:
$ipAddress = anonymizeIP(getVisitorIP());
```

### 3. Data Retention Policy

پرانا data automatically delete کریں:

```php
// visitors.db میں 90 دن سے پرانا data delete کریں
$db->exec("
    DELETE FROM visitors 
    WHERE visit_time < datetime('now', '-90 days')
");
```

---

## 📈 API Endpoints

### 1. Track Visit

**Endpoint:** `POST /api/track-visit.php`

**Request Body:**
```json
{
  "pageUrl": "https://example.com/",
  "referrer": "https://google.com",
  "screenResolution": "1920x1080",
  "language": "en-US",
  "timezone": "Asia/Karachi",
  "sessionId": "sess_123456789"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Visit tracked successfully",
  "duplicate": false,
  "data": {
    "ip": "123.45.67.89",
    "location": "Lahore, Pakistan",
    "device": "Desktop"
  }
}
```

### 2. Get Statistics

**Endpoint:** `GET /api/get-visitor-stats.php`

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 1250,
    "today": 45,
    "week": 320,
    "month": 890
  },
  "topCountries": [...],
  "deviceTypes": [...],
  "recentVisitors": [...]
}
```

---

## 🐛 Troubleshooting

### Issue 1: Database Not Created

**Check:**
```bash
# Check if directory is writable
chmod 755 public/api/
```

**Manual creation:**
```bash
cd public/api/
touch visitors.db
chmod 666 visitors.db
```

### Issue 2: Geolocation Not Working

**Solutions:**
1. Check internet connection
2. IP-API limit: 45 requests/minute (free tier)
3. Use alternative API (see Configuration section)

### Issue 3: Dashboard Not Loading

**Check:**
1. Is PHP running?
2. Database file exists?
3. Check browser console for errors

**Debug:**
```javascript
// Browser console
fetch('/api/get-visitor-stats.php')
  .then(r => r.json())
  .then(console.log);
```

### Issue 4: Tracking Not Working in Production

**Solutions:**
1. Update API URLs in `src/utils/visitorTracker.js`:
```javascript
const response = await fetch('https://your-domain.com/api/track-visit.php', {
  // ...
});
```

2. Check CORS settings in PHP files
3. Ensure PHP is enabled on hosting

---

## 📊 Export Data

### Export to CSV

```php
<?php
// public/api/export-csv.php
$db = new PDO('sqlite:visitors.db');
$visitors = $db->query("SELECT * FROM visitors ORDER BY visit_time DESC")->fetchAll();

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="visitors_' . date('Y-m-d') . '.csv"');

$output = fopen('php://output', 'w');
fputcsv($output, array_keys($visitors[0]));

foreach ($visitors as $visitor) {
    fputcsv($output, $visitor);
}
?>
```

### Export to JSON

```php
<?php
// public/api/export-json.php
$db = new PDO('sqlite:visitors.db');
$visitors = $db->query("SELECT * FROM visitors ORDER BY visit_time DESC")->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
header('Content-Disposition: attachment; filename="visitors_' . date('Y-m-d') . '.json"');

echo json_encode($visitors, JSON_PRETTY_PRINT);
?>
```

---

## 🎯 Best Practices

### 1. Regular Backups

```bash
# Backup database
cp public/api/visitors.db public/api/visitors_backup_$(date +%Y%m%d).db
```

### 2. Monitor Database Size

```php
$size = filesize('visitors.db');
echo "Database size: " . round($size / 1024 / 1024, 2) . " MB";
```

### 3. Optimize Database

```php
$db->exec("VACUUM");
$db->exec("ANALYZE");
```

---

## 📚 Additional Features (Optional)

### 1. Email Alerts for New Visitors

```php
// track-visit.php میں add کریں
if ($todayVisitors > 100) {
    mail(
        'your@email.com',
        'Website Traffic Alert',
        "Your website received $todayVisitors visitors today!"
    );
}
```

### 2. Slack Notifications

```php
function sendSlackNotification($visitor) {
    $webhook = 'YOUR_SLACK_WEBHOOK_URL';
    $message = "New visitor from {$visitor['city']}, {$visitor['country']}";
    
    $data = ['text' => $message];
    
    $ch = curl_init($webhook);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_exec($ch);
}
```

---

## ✅ Checklist

Setup complete ہونے کے لیے:

- [ ] `track-visit.php` کام کر رہا ہے
- [ ] Database create ہو گیا
- [ ] Dashboard access ہو رہا ہے
- [ ] Tracking frontend سے کام کر رہی ہے
- [ ] Geolocation data آ رہا ہے
- [ ] Duplicate prevention کام کر رہا ہے
- [ ] Stats API کام کر رہا ہے

---

## 🆘 Support

**مدد چاہیے؟**

1. Database file check کریں: `public/api/visitors.db`
2. PHP errors check کریں: `php error_log`
3. Browser console دیکھیں
4. Network tab میں API calls دیکھیں

---

## 🎉 مبارک ہو!

آپ کی website میں اب **complete visitor tracking system** ہے!

**Analytics دیکھنے کے لیے:**
```
http://localhost:5173/admin/visitors.html
```

یا production میں:
```
https://your-domain.com/admin/visitors.html
```

---

Made with ❤️ by Muhammad Abid

