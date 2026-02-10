import joblib
import pandas as pd
import numpy as np
import os
import random

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../ml/model.pkl")

# Global variables for model
_model = None
_feature_names = ['gpa', 'attendance_rate', 'assignments_completed', 'household_income_bracket', 'parent_education_level']

def load_model():
    global _model
    if os.path.exists(MODEL_PATH):
        try:
            _model = joblib.load(MODEL_PATH)
            print(f"Model loaded from {MODEL_PATH}")
        except Exception as e:
            print(f"Error loading model: {e}")
            _model = None
    else:
        print(f"Model file not found at {MODEL_PATH}. Using mock logic.")
        _model = None

def predict_risk(gpa, attendance, assignments, income, education):
    if _model is None:
        # Fallback Mock Logic
        risk_score = 0
        if gpa < 2.0: risk_score += 0.4
        if attendance < 0.8: risk_score += 0.3
        if assignments < 5: risk_score += 0.2
        
        prob = min(risk_score + random.uniform(0, 0.1), 1.0)
        risk = "High" if prob > 0.7 else ("Medium" if prob > 0.4 else "Low")
        return risk, prob, {"Mock": 1.0}

    # Prepare input
    data = pd.DataFrame([[gpa, attendance, assignments, income, education]], columns=_feature_names)
    
    # Predict
    prob = _model.predict_proba(data)[0][1] # Probability of Class 1 (Risk)
    risk = "High" if prob > 0.7 else ("Medium" if prob > 0.4 else "Low")
    
    # Explainability (simple feature importance lookup for now)
    importances = _model.feature_importances_
    contributions = {name: float(imp) for name, imp in zip(_feature_names, importances)}
    
    return risk, prob, contributions

# Initialize
load_model()
