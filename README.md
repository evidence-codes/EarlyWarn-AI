# Early-Warn AI: Student Performance Prediction System

## Overview

Early-Warn AI is a full-stack, AI-driven analytical tool designed to identify "at-risk" students using historical academic and socio-economic data. The system aims for a minimum accuracy of 85% and provides actionable insights for educators.

## Technical Stack

- **Frontend**: Next.js (React) with Tailwind CSS
- **Backend**: FastAPI (Python)
- **AI/ML**: Scikit-Learn (Random Forest / XGBoost)
- **Database**: PostgreSQL with SQLAlchemy ORM

## Features

- **Risk Dashboard**: Identify at-risk students with visual indicators.
- **Analytics**: Performance trends and historical comparisons.
- **Inference Engine**: Real-time prediction with explainability.
- **Simulation**: "What-if" analysis tool.
- **Automated Alerts**: Early warning notifications.

## Getting Started

### Backend

1. Navigate to `/backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `uvicorn main:app --reload`

### Frontend

1. Navigate to `/frontend`
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
