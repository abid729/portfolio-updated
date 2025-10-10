# Docker Setup Guide - Muhammad Abid Portfolio
# Docker سیٹ اپ گائیڈ - محمد عابد پورٹفولیو

## English

### Quick Start

1. **Build the Docker image:**
```bash
docker build -t muhammad-abid-portfolio .
```

2. **Run with Docker Compose (Recommended):**
```bash
docker-compose up -d
```

3. **Or run directly:**
```bash
docker run -d -p 8080:80 --name portfolio muhammad-abid-portfolio
```

4. **Access your portfolio:**
- Main Site: http://localhost:8080
- API Test: http://localhost:8080/api/info.php
- Admin Panel: http://localhost:8080/admin/visitors.html

### Management Commands

**View logs:**
```bash
# All logs
docker-compose logs -f

# Nginx logs only
docker exec portfolio tail -f /var/log/nginx/access.log

# PHP-FPM logs
docker exec portfolio tail -f /var/log/supervisor/php-fpm.log
```

**Stop the container:**
```bash
docker-compose down
```

**Restart the container:**
```bash
docker-compose restart
```

**Rebuild after changes:**
```bash
docker-compose up -d --build
```

**Remove everything:**
```bash
docker-compose down -v
docker rmi muhammad-abid-portfolio
```

### Production Deployment

For production, consider:

1. **Use environment variables:**
```bash
docker run -d \
  -p 80:80 \
  -e NODE_ENV=production \
  --name portfolio \
  muhammad-abid-portfolio
```

2. **Add SSL/TLS:**
   - Use a reverse proxy (Nginx/Traefik) with Let's Encrypt
   - Or mount SSL certificates into the container

3. **Resource limits:**
```yaml
services:
  portfolio:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

### Customization

**Change port:** Edit `docker-compose.yml` ports section
```yaml
ports:
  - "3000:80"  # Access on port 3000
```

**Enable debug mode:** Add to docker-compose.yml
```yaml
environment:
  - DEBUG=true
```

### Troubleshooting

**Container won't start:**
```bash
docker logs portfolio
```

**Permission issues:**
```bash
docker exec -it portfolio sh
ls -la /var/www/html
```

**Rebuild from scratch:**
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

---

## اردو

### فوری شروعات

1. **Docker image بنائیں:**
```bash
docker build -t muhammad-abid-portfolio .
```

2. **Docker Compose کے ساتھ چلائیں (تجویز کردہ):**
```bash
docker-compose up -d
```

3. **یا براہ راست چلائیں:**
```bash
docker run -d -p 8080:80 --name portfolio muhammad-abid-portfolio
```

4. **اپنا portfolio دیکھیں:**
- مین سائٹ: http://localhost:8080
- API ٹیسٹ: http://localhost:8080/api/info.php
- ایڈمن پینل: http://localhost:8080/admin/visitors.html

### مینجمنٹ کمانڈز

**لاگز دیکھیں:**
```bash
# تمام logs
docker-compose logs -f

# صرف Nginx logs
docker exec portfolio tail -f /var/log/nginx/access.log

# PHP-FPM logs
docker exec portfolio tail -f /var/log/supervisor/php-fpm.log
```

**Container بند کریں:**
```bash
docker-compose down
```

**Container دوبارہ شروع کریں:**
```bash
docker-compose restart
```

**تبدیلیوں کے بعد دوبارہ بنائیں:**
```bash
docker-compose up -d --build
```

**سب کچھ ہٹائیں:**
```bash
docker-compose down -v
docker rmi muhammad-abid-portfolio
```

### پروڈکشن ڈیپلائمنٹ

Production کے لیے:

1. **Environment variables استعمال کریں:**
```bash
docker run -d \
  -p 80:80 \
  -e NODE_ENV=production \
  --name portfolio \
  muhammad-abid-portfolio
```

2. **SSL/TLS شامل کریں:**
   - Reverse proxy (Nginx/Traefik) استعمال کریں Let's Encrypt کے ساتھ
   - یا SSL certificates container میں mount کریں

3. **Resource limits:**
```yaml
services:
  portfolio:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

### کسٹمائزیشن

**Port تبدیل کریں:** `docker-compose.yml` میں ports section edit کریں
```yaml
ports:
  - "3000:80"  # Port 3000 پر access کریں
```

### مسائل حل کریں

**Container شروع نہیں ہو رہا:**
```bash
docker logs portfolio
```

**Permission کے مسائل:**
```bash
docker exec -it portfolio sh
ls -la /var/www/html
```

**شروع سے دوبارہ بنائیں:**
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## Architecture / معماریات

```
┌─────────────────────────────────────────┐
│         Docker Container                 │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │         Supervisor                  │ │
│  │                                     │ │
│  │  ┌──────────┐    ┌──────────────┐ │ │
│  │  │  Nginx   │───▶│  PHP-FPM     │ │ │
│  │  │  (Port   │    │  (Port 9000) │ │ │
│  │  │   80)    │    │              │ │ │
│  │  └────┬─────┘    └──────┬───────┘ │ │
│  │       │                 │         │ │
│  │       └────────┬────────┘         │ │
│  │                │                  │ │
│  │       ┌────────▼─────────┐       │ │
│  │       │  /var/www/html   │       │ │
│  │       │  - React Build   │       │ │
│  │       │  - PHP APIs      │       │ │
│  │       └──────────────────┘       │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Support

Issues کے لیے GitHub repository دیکھیں۔
For issues, check the GitHub repository.

