import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# 1. Generate Synthetic Data
# Features: GPA, Attendance, Assignments, HouseholdIncome, ParentEducation
np.random.seed(42)
n_samples = 1000

gpa = np.random.uniform(1.0, 4.0, n_samples)
attendance = np.random.uniform(0.5, 1.0, n_samples)
assignments = np.random.randint(0, 20, n_samples) # Assuming 20 assignments
income = np.random.randint(1, 4, n_samples) # 1: Low, 2: Med, 3: High
education = np.random.randint(1, 4, n_samples) # 1: HS, 2: College, 3: Grad

# Outcome: At Risk (1 for Yes, 0 for No)
# Logic: Lower GPA, Attendance, Assignments -> Higher Risk
risk_prob = (4.0 - gpa)/3.0 * 0.4 + (1.0 - attendance)/0.5 * 0.3 + (20 - assignments)/20.0 * 0.3
risk_prob += np.random.normal(0, 0.1, n_samples)
labels = (risk_prob > 0.5).astype(int)

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
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# 4. Evaluate
y_pred = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# 5. Save Model
import os

# Ensure output directory exists if running from elsewhere, or use relative path
output_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
joblib.dump(clf, output_path)
print(f"Model saved to {output_path}")
