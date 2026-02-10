import joblib
import pandas as pd
import numpy as np

MODEL_PATH = "ml/model.pkl"
# Load model globally to avoid reloading on every request in production
try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    print(f"Warning: Model not found at {MODEL_PATH}. Using mock prediction.")
    model = None

def get_prediction(gpa, attendance, assignments, income, education):
    if model is None:
        # Mock logic
        return 0.5 # Default Medium Risk
    
    # Feature order must match training data
    features = pd.DataFrame([{
        'gpa': gpa,
        'attendance_rate': attendance,
        'assignments_completed': assignments,
        'household_income_bracket': income,
        'parent_education_level': education
    }])
    
    prob = model.predict_proba(features)[0][1] # Probability of class 1 (At Risk)
    return prob

def get_explainability(features):
    # Dummy explainability for now (could use SHAP in future)
    # Using simple feature importance from random forest
    if model is None:
        return {}
    
    importances = model.feature_importances_
    names = ['GPA', 'Attendance', 'Assignments', 'Income', 'Education']
    return dict(zip(names, importances))
