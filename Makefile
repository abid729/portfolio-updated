.PHONY: help build up down restart logs clean dev test shell

# Colors for output
BLUE=\033[0;34m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

help: ## تمام available commands دکھائیں / Show all available commands
	@echo "$(BLUE)Muhammad Abid Portfolio - Docker Commands$(NC)"
	@echo "$(BLUE)محمد عابد پورٹفولیو - Docker کمانڈز$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

build: ## Docker image بنائیں / Build Docker image
	@echo "$(YELLOW)Building Docker image...$(NC)"
	docker-compose build

up: ## Container شروع کریں / Start container
	@echo "$(YELLOW)Starting container...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Container started!$(NC)"
	@echo "$(GREEN)Access at: http://localhost:8080$(NC)"

down: ## Container بند کریں / Stop container
	@echo "$(YELLOW)Stopping container...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Container stopped!$(NC)"

restart: ## Container دوبارہ شروع کریں / Restart container
	@echo "$(YELLOW)Restarting container...$(NC)"
	docker-compose restart
	@echo "$(GREEN)✓ Container restarted!$(NC)"

logs: ## Logs دیکھیں / View logs
	docker-compose logs -f

clean: ## سب کچھ صاف کریں / Clean everything
	@echo "$(YELLOW)Cleaning up...$(NC)"
	docker-compose down -v
	docker rmi muhammad-abid-portfolio 2>/dev/null || true
	rm -rf logs/
	@echo "$(GREEN)✓ Cleaned!$(NC)"

dev: ## Development mode میں چلائیں / Run in development mode
	@echo "$(YELLOW)Starting development server...$(NC)"
	npm run dev

rebuild: ## دوبارہ build اور start / Rebuild and start
	@echo "$(YELLOW)Rebuilding...$(NC)"
	docker-compose down
	docker-compose up -d --build
	@echo "$(GREEN)✓ Rebuilt and started!$(NC)"
	@echo "$(GREEN)Access at: http://localhost:8080$(NC)"

shell: ## Container میں shell open کریں / Open shell in container
	docker exec -it muhammad-abid-portfolio sh

status: ## Container کی status چیک کریں / Check container status
	@echo "$(BLUE)Container Status:$(NC)"
	@docker ps -a | grep muhammad-abid-portfolio || echo "$(YELLOW)Container not found$(NC)"

test: ## Container test کریں / Test container
	@echo "$(YELLOW)Testing container...$(NC)"
	@curl -s http://localhost:8080 > /dev/null && echo "$(GREEN)✓ Main site working!$(NC)" || echo "$(RED)✗ Main site failed!$(NC)"
	@curl -s http://localhost:8080/api/info.php > /dev/null && echo "$(GREEN)✓ PHP API working!$(NC)" || echo "$(RED)✗ PHP API failed!$(NC)"

install: ## Node dependencies install کریں / Install Node dependencies
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed!$(NC)"

start: build up ## Build اور start ایک ساتھ / Build and start together
	@echo "$(GREEN)✓ All done!$(NC)"

# Default command
.DEFAULT_GOAL := help

