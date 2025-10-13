#!/bin/bash

# Portfolio Database Setup Script
# یہ script automatic setup کرتا ہے
# This script automates the setup process

echo "🚀 Starting Portfolio Database Setup..."
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}📦 Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js from: https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check if npm is installed
echo -e "${BLUE}📦 Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm found: $(npm --version)${NC}"

# Install dependencies
echo -e "\n${BLUE}📦 Installing dependencies...${NC}"
echo "This may take a few minutes..."

npm install

# Install Supabase client
echo -e "\n${BLUE}📦 Installing Supabase client...${NC}"
npm install @supabase/supabase-js

# Install React Router
echo -e "\n${BLUE}📦 Installing React Router...${NC}"
npm install react-router-dom

# Install Vercel Analytics (optional)
echo -e "\n${BLUE}📦 Installing Vercel Analytics...${NC}"
npm install @vercel/analytics

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo -e "\n${YELLOW}📝 Creating .env.local file...${NC}"
    cp env.example .env.local
    echo -e "${GREEN}✅ .env.local created!${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANT: Edit .env.local and add your Supabase credentials!${NC}"
else
    echo -e "\n${GREEN}✅ .env.local already exists${NC}"
fi

# Create .gitignore entries for env files
if ! grep -q ".env.local" .gitignore 2>/dev/null; then
    echo -e "\n${BLUE}📝 Updating .gitignore...${NC}"
    echo "" >> .gitignore
    echo "# Environment Variables" >> .gitignore
    echo ".env.local" >> .gitignore
    echo ".env*.local" >> .gitignore
    echo "*.env" >> .gitignore
    echo -e "${GREEN}✅ .gitignore updated${NC}"
fi

# Installation complete
echo -e "\n${GREEN}========================================"
echo "✅ Installation Complete!"
echo "========================================${NC}"

# Next steps
echo -e "\n${BLUE}📋 Next Steps:${NC}"
echo ""
echo "1️⃣  Setup Supabase:"
echo "   - Go to: https://supabase.com"
echo "   - Create a new project"
echo "   - Run supabase-setup.sql in SQL Editor"
echo "   - Copy your Project URL and anon key"
echo ""
echo "2️⃣  Configure environment:"
echo "   - Edit .env.local"
echo "   - Add your Supabase URL and anon key"
echo ""
echo "3️⃣  Update App.jsx:"
echo "   - Change import from Contact to ContactWithDatabase"
echo ""
echo "4️⃣  Start development server:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "5️⃣  Test the form:"
echo "   - Open http://localhost:5173"
echo "   - Submit a test message"
echo "   - Check Supabase dashboard"
echo ""
echo "6️⃣  Deploy to Vercel:"
echo "   - Push to GitHub"
echo "   - Import to Vercel"
echo "   - Add environment variables"
echo "   - Deploy!"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "   - QUICK_SETUP.md          (Quick start)"
echo "   - DEPLOYMENT_STEPS_URDU.md (Complete guide in Urdu)"
echo "   - DATABASE_DEPLOYMENT_GUIDE_URDU.md (Detailed info)"
echo ""
echo -e "${GREEN}Happy coding! 💻✨${NC}"
echo -e "${BLUE}بہت شکریہ! (Bahut shukriya!)${NC}"

