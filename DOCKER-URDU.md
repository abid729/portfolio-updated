# 🐳 Docker گائیڈ - محمد عابد پورٹفولیو

## 🚀 فوری شروعات

### مرحلہ 1: Docker Install کریں

اگر Docker installed نہیں ہے تو:

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Windows/Mac:**
- https://www.docker.com/products/docker-desktop سے ڈاؤن لوڈ کریں

### مرحلہ 2: Portfolio چلائیں

**سب سے آسان طریقہ:**
```bash
chmod +x docker-start.sh
./docker-start.sh
```

**یا Docker Compose سے:**
```bash
docker-compose up -d --build
```

**یا Makefile سے:**
```bash
make start
```

### مرحلہ 3: اپنا Portfolio دیکھیں

Browser میں کھولیں:
- **Main Website**: http://localhost:8080
- **API Test**: http://localhost:8080/api/info.php
- **Admin Dashboard**: http://localhost:8080/admin/visitors.html

## 📋 اہم Commands

### شروع کرنے کے لیے

```bash
# Container شروع کریں
docker-compose up -d

# یا
make up
```

### بند کرنے کے لیے

```bash
# Container بند کریں
docker-compose down

# یا
make down
```

### Logs دیکھنے کے لیے

```bash
# تمام logs
docker-compose logs -f

# یا
make logs

# صرف Nginx logs
docker exec muhammad-abid-portfolio tail -f /var/log/nginx/access.log

# صرف PHP logs
docker exec muhammad-abid-portfolio tail -f /var/log/supervisor/php-fpm.log
```

### دوبارہ شروع کرنے کے لیے

```bash
# Container restart کریں
docker-compose restart

# یا
make restart
```

### سب کچھ صاف کرنے کے لیے

```bash
# Container، images، volumes سب ہٹا دیں
make clean

# یا manually
docker-compose down -v
docker rmi muhammad-abid-portfolio
```

## 🔧 تخصیص

### Port تبدیل کرنا

`docker-compose.yml` فائل کھولیں اور یہ لائن تبدیل کریں:

```yaml
ports:
  - "8080:80"  # یہاں 8080 کی جگہ اپنی پسند کا port لکھیں
```

مثال کے طور پر port 3000 استعمال کرنے کے لیے:
```yaml
ports:
  - "3000:80"
```

اب آپ کا portfolio `http://localhost:3000` پر ہوگا۔

### Email تبدیل کرنا

Contact form کے لیے اپنا email ڈالنے کے لیے:

1. `public/api/contact.php` فائل کھولیں
2. لائن 54 پر اپنا email ڈالیں:
```php
$to = "your-email@example.com"; // اپنا email یہاں لکھیں
```

### Memory Limit بڑھانا

اگر آپ کو زیادہ resources چاہیں:

`docker-compose.yml` میں یہ شامل کریں:

```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'
      memory: 1G
```

## 🐛 مسائل اور حل

### مسئلہ 1: "Port already in use"

**حل:**
```bash
# پرانا container بند کریں
docker stop muhammad-abid-portfolio

# یا port تبدیل کریں docker-compose.yml میں
```

### مسئلہ 2: Container شروع نہیں ہو رہا

**حل:**
```bash
# Logs چیک کریں
docker-compose logs

# دوبارہ build کریں
docker-compose down
docker-compose up -d --build
```

### مسئلہ 3: Website نہیں کھل رہی

**حل:**
```bash
# Container running ہے یا نہیں چیک کریں
docker ps | grep muhammad-abid-portfolio

# اگر نہیں چل رہا تو شروع کریں
docker-compose up -d

# اگر چل رہا ہے تو logs دیکھیں
docker-compose logs -f
```

### مسئلہ 4: PHP APIs کام نہیں کر رہیں

**حل:**
```bash
# PHP-FPM logs چیک کریں
docker exec muhammad-abid-portfolio tail -f /var/log/supervisor/php-fpm.log

# PHP-FPM restart کریں
docker-compose restart
```

### مسئلہ 5: Permission Errors

**حل:**
```bash
# Container میں جائیں
docker exec -it muhammad-abid-portfolio sh

# Permissions چیک کریں
ls -la /var/www/html

# اگر ضرورت ہو تو fix کریں
chown -R nginx:nginx /var/www/html
```

## 🌐 Production میں Deploy کرنا

### AWS/DigitalOcean/VPS پر

1. **Server پر SSH کریں:**
```bash
ssh user@your-server-ip
```

2. **Docker Install کریں:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

3. **Repository Clone کریں:**
```bash
git clone https://github.com/your-username/MyPortfolioWebsite.git
cd MyPortfolioWebsite
```

4. **Port 80 استعمال کرنے کے لیے:**

`docker-compose.yml` میں تبدیل کریں:
```yaml
ports:
  - "80:80"
```

5. **Start کریں:**
```bash
docker-compose up -d --build
```

6. **اپنا Domain point کریں:**
- Domain registrar میں جائیں
- A Record add کریں
- Point کریں server IP کی طرف

### SSL Certificate (HTTPS) شامل کرنا

**Nginx Reverse Proxy استعمال کریں:**

1. **Server پر Nginx install کریں:**
```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

2. **Nginx config بنائیں:**
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

یہ شامل کریں:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. **Enable کریں:**
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **SSL Certificate حاصل کریں:**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

5. **Auto-renewal enable کریں:**
```bash
sudo certbot renew --dry-run
```

## 📊 Container Information

### Resource Usage دیکھنا

```bash
# Real-time stats
docker stats muhammad-abid-portfolio

# یا
docker ps -a
```

### Container میں جانا

```bash
# Shell access
docker exec -it muhammad-abid-portfolio sh

# Files دیکھنا
ls -la /var/www/html

# Logs دیکھنا
tail -f /var/log/nginx/access.log
```

### Container Update کرنا

```bash
# Latest code pull کریں
git pull

# Rebuild کریں
docker-compose down
docker-compose up -d --build
```

## 💡 Tips اور Tricks

### Tip 1: Development Mode
Development میں Docker استعمال نہ کریں۔ یہ تیز ہے:
```bash
npm run dev
```

### Tip 2: Testing
Testing کے لیے `-d` flag استعمال نہ کریں:
```bash
docker-compose up
```
یہ logs directly show کرتا ہے۔

### Tip 3: Multiple Instances
Multiple portfolios چلانے کے لیے:
```bash
# پہلی portfolio
docker run -d -p 8080:80 muhammad-abid-portfolio

# دوسری portfolio
docker run -d -p 8081:80 muhammad-abid-portfolio
```

### Tip 4: Automatic Updates
Watchtower استعمال کریں automatic updates کے لیے:
```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower
```

## 🆘 مدد کی ضرورت؟

### Logs دیکھنا بہت ضروری ہے!

```bash
# تمام logs
docker-compose logs -f

# آخری 100 lines
docker-compose logs --tail=100

# صرف errors
docker-compose logs -f | grep error
```

### Common Commands Reference

| کام | Command |
|-----|---------|
| شروع کریں | `make up` یا `docker-compose up -d` |
| بند کریں | `make down` یا `docker-compose down` |
| Restart | `make restart` یا `docker-compose restart` |
| Logs | `make logs` یا `docker-compose logs -f` |
| Shell | `make shell` یا `docker exec -it muhammad-abid-portfolio sh` |
| Clean | `make clean` |
| Test | `make test` |
| Rebuild | `make rebuild` |

## 📱 Mobile Access

اگر آپ mobile سے local portfolio دیکھنا چاہیں:

1. **اپنی machine کا IP پتا کریں:**
```bash
# Linux/Mac
hostname -I | awk '{print $1}'

# یا
ifconfig | grep "inet "
```

2. **Mobile browser میں کھولیں:**
```
http://YOUR_IP:8080
```

مثال: `http://192.168.1.10:8080`

**Note:** Mobile اور computer ایک ہی WiFi پر ہونے چاہیں۔

## 🎯 Checklist - Deployment سے پہلے

- [ ] Email address تبدیل کی (`public/api/contact.php`)
- [ ] Personal info update کی (`src/data/portfolioData.js`)
- [ ] Projects add کیں
- [ ] Resume PDF add کیا
- [ ] Local test کیا (`make test`)
- [ ] Logs چیک کیے
- [ ] SSL certificate لیا (production کے لیے)
- [ ] Domain point کیا
- [ ] Backup لیا

## 🚀 تیار ہیں؟

اب آپ کا portfolio Docker سے چلانے کے لیے تیار ہے!

### Quick Start:
```bash
./docker-start.sh
```

### Open:
http://localhost:8080

### مزہ لیں! 🎉

---

**بنایا ❤️ سے - محمد عابد**

کسی مدد کے لیے: GitHub Issues

**تفصیلی guides:**
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - English + اردو
- [DOCKER_SUMMARY.md](DOCKER_SUMMARY.md) - Technical details
- [README-DOCKER.md](README-DOCKER.md) - Quick reference

