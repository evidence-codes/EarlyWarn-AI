#!/bin/bash

# Early-Warn AI Setup Script

echo "Setting up Early-Warn AI..."

# Backend Setup
echo "Installing Backend Dependencies..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Frontend Setup
echo "Installing Frontend Dependencies..."
cd frontend
npm install
cd ..

echo "Setup Complete!"
echo "To run the project:"
echo "1. Backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "2. Frontend: cd frontend && npm run dev"
