# Multi-stage build for Muhammad Abid Portfolio Website
# Stage 1: Build React Application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Use Docker-specific vite config if available, otherwise use default
RUN if [ -f vite.config.docker.js ]; then \
        cp vite.config.docker.js vite.config.js; \
    fi

# Build the application
RUN npm run build

# Stage 2: Production Environment with Nginx and PHP
FROM php:8.2-fpm-alpine

# Install system dependencies and Nginx
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    && rm -rf /var/cache/apk/*

# Create necessary directories
RUN mkdir -p /var/www/html \
    /var/log/nginx \
    /var/log/supervisor \
    /run/nginx

# Copy built React app from builder stage
COPY --from=builder /app/dist /var/www/html

# Copy PHP API files
COPY public/api /var/www/html/api
COPY public/admin /var/www/html/admin

# Copy public files
COPY public/robots.txt /var/www/html/
COPY public/sitemap.xml /var/www/html/

# Remove .htaccess (Apache file, not needed for Nginx)
RUN rm -f /var/www/html/.htaccess

# Nginx configuration
COPY <<EOF /etc/nginx/nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                    '\$status \$body_bytes_sent "\$http_referer" '
                    '"\$http_user_agent" "\$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    server {
        listen 80;
        server_name _;
        
        root /var/www/html;
        index index.html;

        # Enable directory listing for debugging (remove in production)
        # autoindex on;

        # PHP API endpoints
        location ~ ^/api/.*\.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME /var/www/html\$fastcgi_script_name;
            fastcgi_param PATH_INFO \$fastcgi_path_info;
        }

        # Serve static files (React SPA + Admin HTML)
        location / {
            try_files \$uri \$uri/ /index.html =404;
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        # Assets caching
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Deny access to hidden files
        location ~ /\\. {
            deny all;
        }
    }
}
EOF

# PHP-FPM configuration
RUN echo "<?php phpinfo(); ?>" > /var/www/html/api/info.php

# Supervisor configuration for running both Nginx and PHP-FPM
COPY <<EOF /etc/supervisord.conf
[supervisord]
nodaemon=true
user=root
logfile=/var/log/supervisor/supervisord.log
pidfile=/var/run/supervisord.pid

[program:php-fpm]
command=/usr/local/sbin/php-fpm -F
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/php-fpm.log
stderr_logfile=/var/log/supervisor/php-fpm-error.log

[program:nginx]
command=nginx -g 'daemon off;'
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/nginx.log
stderr_logfile=/var/log/supervisor/nginx-error.log
EOF

# Set proper permissions
RUN chown -R nginx:nginx /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 777 /var/www/html/api

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

