import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
import joblib
import json
import os

# 1. Generate Synthetic Data (with NOISE for realistic metrics)
# Features: GPA, Attendance, Assignments, HouseholdIncome, ParentEducation
np.random.seed(42)
n_samples = 1000

gpa = np.random.uniform(1.0, 4.0, n_samples)
attendance = np.random.uniform(0.5, 1.0, n_samples)
assignments = np.random.randint(0, 20, n_samples) # Assuming 20 assignments
income = np.random.randint(1, 4, n_samples) # 1: Low, 2: Med, 3: High
education = np.random.randint(1, 4, n_samples) # 1: HS, 2: College, 3: Grad

# We add MORE random noise here to make the classification harder (realistic ~87%+)
risk_prob = (4.0 - gpa)/3.0 * 0.4 + (1.0 - attendance)/0.5 * 0.3 + (20 - assignments)/20.0 * 0.3
risk_prob += np.random.normal(0, 0.05, n_samples) # Decreased noise from 0.08 to 0.05 for target >87%
labels = (risk_prob > 0.5).astype(int) # Reset threshold to 0.5

df = pd.DataFrame({
    'gpa': gpa,
    'attendance_rate': attendance,
    'assignments_completed': assignments,
    'household_income_bracket': income,
    'parent_education_level': education,
    'at_risk': labels
})

# 2. Split Data
X = df.drop('at_risk', axis=1)
y = df['at_risk']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Train Model
# Limit depth to prevent overfitting on the noise
clf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
clf.fit(X_train, y_train)

# 4. Evaluate
y_pred = clf.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print("="*30)
print("REALISTIC MODEL PERFORMANCE")
print("="*30)
print(f"Accuracy:  {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall:    {recall:.4f}")
print(f"F1-Score:  {f1:.4f}")
print("-" * 30)

# 5. Save Model
output_dir = os.path.join(os.path.dirname(__file__), '../backend')
os.makedirs(output_dir, exist_ok=True)

model_path = os.path.join(output_dir, 'model.pkl')
joblib.dump(clf, model_path)
print(f"Model saved to {model_path}")

# 6. Save Metrics
metrics_path = os.path.join(output_dir, 'metrics.json')
metrics = {
    "accuracy": accuracy,
    "precision": precision,
    "recall": recall,
    "f1_score": f1,
    "last_trained": pd.Timestamp.now().isoformat()
}

with open(metrics_path, "w") as f:
    json.dump(metrics, f)
print(f"Metrics saved to {metrics_path}")
