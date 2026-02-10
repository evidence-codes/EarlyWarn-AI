import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# 1. Load Dataset
# Try to load from the public folder where we generated it
csv_path = "../frontend/public/training_dataset.csv"
if not os.path.exists(csv_path):
    print(f"Error: Dataset not found at {csv_path}")
    exit(1)

print(f"Loading dataset from {csv_path}...")
df = pd.read_csv(csv_path)

# 2. Preprocessing
# Drop ID and Name as they are not features
X = df.drop(['student_id', 'name', 'risk_level'], axis=1)
y = df['risk_level']

# Encode features if necessary (though our generator made numericals mostly)
# 'risk_level' is categorical (Low, Medium, High), we need to encode it for some metrics
le = LabelEncoder()
y_encoded = le.fit_transform(y)
# Note classes: 0=High, 1=Low, 2=Medium (alphabetical usually, check mapping)
print(f"Classes mapping: {dict(zip(le.classes_, le.transform(le.classes_)))}")

# 3. Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# 4. Train Model
print("Training Random Forest Classifier...")
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# 5. Evaluate
y_pred = clf.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print("\n" + "="*30)
print("MODEL PERFORMANCE METRICS")
print("="*30)
print(f"Accuracy:  {accuracy:.4f} ({accuracy*100:.2f}%)")
print(f"Precision: {precision:.4f}")
print(f"Recall:    {recall:.4f}")
print(f"F1-Score:  {f1:.4f}")
print("-" * 30)
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))

# 6. Save Model
model_path = "model.pkl"
joblib.dump(clf, model_path)
print(f"\nModel saved to {model_path}")

# 7. Save Metrics
metrics = {
    "accuracy": accuracy,
    "precision": precision,
    "recall": recall,
    "f1_score": f1,
    "last_trained": pd.Timestamp.now().isoformat()
}
import json
with open("metrics.json", "w") as f:
    json.dump(metrics, f)
print("Metrics saved to metrics.json")
