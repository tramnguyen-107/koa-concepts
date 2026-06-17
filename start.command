#!/bin/bash
cd "$(dirname "$0")"
echo "📦 Installing packages..."
npm install
echo ""
echo "🚀 Starting Koa Concepts dev server..."
echo "👉 Open: http://localhost:3000"
echo ""
npm run dev
