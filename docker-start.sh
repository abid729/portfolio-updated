#!/bin/bash

# Docker Quick Start Script for Muhammad Abid Portfolio
# محمد عابد پورٹفولیو کے لیے Docker فوری شروعات اسکرپٹ

echo "=========================================="
echo "Muhammad Abid Portfolio - Docker Setup"
echo "محمد عابد پورٹفولیو - Docker سیٹ اپ"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker installed نہیں ہے / Docker is not installed${NC}"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose installed نہیں ہے / Docker Compose is not installed${NC}"
    echo "Trying to use 'docker compose' instead..."
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo -e "${GREEN}✓ Docker found${NC}"
echo ""

# Create logs directory
mkdir -p logs/nginx logs/supervisor logs/api

# Check if container is already running
if [ "$(docker ps -q -f name=muhammad-abid-portfolio)" ]; then
    echo -e "${YELLOW}⚠️  Container پہلے سے چل رہا ہے / Container is already running${NC}"
    read -p "دوبارہ شروع کریں؟ Restart? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Restarting container..."
        $DOCKER_COMPOSE down
    else
        echo "Exiting..."
        exit 0
    fi
fi

echo "Building and starting Docker container..."
echo "Docker container بنا رہے ہیں اور شروع کر رہے ہیں..."
echo ""

# Build and start
$DOCKER_COMPOSE up -d --build

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}=========================================="
    echo "✓ Successfully started! / کامیابی سے شروع ہو گیا!"
    echo "==========================================${NC}"
    echo ""
    echo "🌐 Access your portfolio at / اپنا portfolio یہاں دیکھیں:"
    echo "   Main Site: http://localhost:8080"
    echo "   API Test:  http://localhost:8080/api/info.php"
    echo "   Admin:     http://localhost:8080/admin/visitors.html"
    echo ""
    echo "📋 Useful commands / مفید کمانڈز:"
    echo "   View logs:     $DOCKER_COMPOSE logs -f"
    echo "   Stop:          $DOCKER_COMPOSE down"
    echo "   Restart:       $DOCKER_COMPOSE restart"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Error starting container / Container شروع کرنے میں خرابی${NC}"
    echo "Run '$DOCKER_COMPOSE logs' for details"
    exit 1
fi

