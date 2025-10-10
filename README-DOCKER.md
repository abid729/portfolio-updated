# 🐳 Docker Deployment Guide
# 🐳 Docker ڈیپلائمنٹ گائیڈ

## 🚀 Quick Start / فوری شروعات

### آسان ترین طریقہ / Easiest Way:

```bash
./docker-start.sh
```

### یا Docker Compose استعمال کریں / Or use Docker Compose:

```bash
# Build اور start کریں / Build and start
docker-compose up -d --build

# Logs دیکھیں / View logs
docker-compose logs -f

# بند کریں / Stop
docker-compose down
```

### یا Docker براہ راست / Or Docker directly:

```bash
# Build
docker build -t muhammad-abid-portfolio .

# Run
docker run -d -p 8080:80 --name portfolio muhammad-abid-portfolio

# Logs
docker logs -f portfolio

# Stop
docker stop portfolio
docker rm portfolio
```

## 🌐 Access / رسائی

بنانے کے بعد یہاں جائیں / After building, visit:

- **Main Website**: http://localhost:8080
- **API Test**: http://localhost:8080/api/info.php
- **Admin Panel**: http://localhost:8080/admin/visitors.html

## 📁 Project Structure / پروجیکٹ کی ساخت

```
.
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore          # Files to exclude from Docker
├── docker-start.sh        # Quick start script
├── DOCKER_GUIDE.md        # Detailed Docker guide
└── vite.config.docker.js  # Vite config for Docker
```

## 🛠️ Docker Architecture / معماریات

```
┌──────────────────────────────┐
│    Docker Container          │
│  ┌────────────────────────┐  │
│  │    Supervisor          │  │
│  │  ┌──────┐  ┌────────┐ │  │
│  │  │Nginx │──│PHP-FPM │ │  │
│  │  │:80   │  │:9000   │ │  │
│  │  └───┬──┘  └───┬────┘ │  │
│  └──────┼─────────┼──────┘  │
│         │         │          │
│    ┌────▼─────────▼────┐    │
│    │  Static Files +   │    │
│    │  PHP APIs         │    │
│    │  /var/www/html    │    │
│    └───────────────────┘    │
└──────────────────────────────┘
```

## 🔧 Customization / تخصیص

### Port تبدیل کریں / Change Port

`docker-compose.yml` میں edit کریں:
```yaml
ports:
  - "3000:80"  # localhost:3000 استعمال کریں
```

### Email Configuration

`public/api/contact.php` میں اپنا email ڈالیں:
```php
$to = "your-email@example.com";
```

## 🐛 Troubleshooting / مسائل حل کریں

### Container شروع نہیں ہو رہا / Container not starting:

```bash
# Logs check کریں / Check logs
docker-compose logs

# یا / or
docker logs portfolio
```

### Port پہلے سے استعمال میں ہے / Port already in use:

```bash
# Port تبدیل کریں docker-compose.yml میں
# یا پرانا container بند کریں / Or stop old container
docker stop $(docker ps -q --filter ancestor=muhammad-abid-portfolio)
```

### Permission issues:

```bash
# Container میں جائیں / Enter container
docker exec -it portfolio sh

# Permissions check کریں
ls -la /var/www/html
```

### دوبارہ شروع سے بنائیں / Rebuild from scratch:

```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## 📊 Resource Usage / وسائل کا استعمال

یہ container تقریباً استعمال کرتا ہے / This container uses approximately:
- **RAM**: 100-150 MB
- **Disk**: 200-300 MB
- **CPU**: Minimal (0.5-1%)

## 🔐 Security / سیکیورٹی

Production میں یہ changes ضرور کریں / For production, make these changes:

1. **SSL/TLS شامل کریں / Add SSL/TLS**
```bash
# Nginx reverse proxy استعمال کریں Let's Encrypt کے ساتھ
# Use Nginx reverse proxy with Let's Encrypt
```

2. **CORS restrict کریں / Restrict CORS**
```php
// contact.php میں
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

3. **API rate limiting شامل کریں**

## 🚀 Production Deployment

### AWS/DigitalOcean/Linode پر:

```bash
# Server پر login کریں / Login to server
ssh user@your-server-ip

# Repository clone کریں / Clone repository
git clone <your-repo-url>
cd MyPortfolioWebsite

# Build اور run کریں / Build and run
docker-compose up -d --build

# HTTPS کے لیے Nginx reverse proxy setup کریں
# Setup Nginx reverse proxy for HTTPS
```

### Docker Hub پر push کریں:

```bash
# Tag کریں / Tag
docker tag muhammad-abid-portfolio yourusername/portfolio:latest

# Push کریں
docker push yourusername/portfolio:latest

# Server پر pull کریں / Pull on server
docker pull yourusername/portfolio:latest
docker run -d -p 80:80 yourusername/portfolio:latest
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PHP-FPM Documentation](https://www.php.net/manual/en/install.fpm.php)

## 💡 Tips

1. **Development میں**: Docker کی بجائے `npm run dev` استعمال کریں (faster)
2. **Testing کے لیے**: `docker-compose up` without `-d` flag (logs directly visible)
3. **Production میں**: Resource limits ضرور set کریں
4. **Monitoring**: Health checks enable کریں

## 🤝 Support

مسائل یا سوالات کے لیے GitHub issues استعمال کریں۔
For issues or questions, use GitHub issues.

---

Made with ❤️ by Muhammad Abid

