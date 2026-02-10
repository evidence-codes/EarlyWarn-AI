# EarlyWarn AI - Technical Overview

## 1. System Architecture

The application follows a **Decoupled Client-Server Architecture**, separating the user interface from the logic and inference engine. This ensures scalability and allows the ML model to be updated without breaking the frontend.

### **Frontend (Client-Side)**

- **Framework**: **Next.js 14** (React) utilizing Server Side Rendering (SSR) for performance and SEO.
- **Styling**: **Tailwind CSS** for a responsive, utility-first design system.
- **State Management**: React Hooks (`useState`, `useEffect`) for managing data flow and user interactions (e.g., Simulation Panel).
- **Visualization**: **Recharts** for rendering dynamic performance charts.
- **Communication**: **Axios** for making asynchronous HTTP requests to the backend API.

### **Backend (Server-Side)**

- **Framework**: **FastAPI** (Python). Chosen for its high performance (Asynchronous) and automatic validation.
- **API Design**: RESTful endpoints (e.g., `/students`, `/predict`).
- **Validation**: **Pydantic** models ensure that data (both input and output) adheres to strict schemas, preventing runtime errors.
- **Database**: **SQLite** (via **SQLAlchemy** ORM) for storing student records and prediction history. SQLite is used for the MVP but can be easily swapped for PostgreSQL in production.
- **Authentication**: **JWT (JSON Web Tokens)** for secure, stateless access control. (Currently set to _Demo Mode_ to allow easy access).

---

## 2. Machine Learning Pipeline (The Core)

The heart of EarlyWarn AI is the predictive engine. Here is how it works technically:

### **A. Data Preprocessing**

Before feeding data into the model, we perform several transformations:

1.  **Feature Selection**: We identified 5 key features that correlate with dropout risk:
    - `GPA` (Float: 0.0 - 4.0)
    - `Attendance Rate` (Float: 0.0 - 1.0)
    - `Assignments Completed` (Integer)
    - `Household Income` (Categorical: 1-4)
    - `Parent Education` (Categorical: 1-4)
2.  **Normalization**: Numerical values (like Assignments) and Ratios (Attendance) are scaled to ensure the model treats them equally.

### **B. The Algorithm**

We utilize a **Supervised Classification Model**, specifically a **Random Forest Classifier** (via `scikit-learn`).

- **Why Random Forest?**
  - **Non-Linearity**: Student performance isn't linear. A student with high GPA but zero attendance might still fail. Random Forest captures these complex relationships better than simple regression.
  - **Robustness**: It aggregates multiple Decision Trees to reduce overfitting (the risk of memorizing the data instead of learning patterns).
  - **Explainability**: It provides `feature_importance_`, allowing us to tell _why_ a student is at risk (e.g., "Attendance contributed 40% to this risk score").

### **C. Inference Flow**

When a request hits `/predict/simulate`:

1.  **Input**: The backend receives raw JSON data (e.g., `{ "gpa": 2.1, "attendance": 0.5 ... }`).
2.  **Vectorization**: The data is converted into a Pandas DataFrame / NumPy array.
3.  **Prediction**: The pre-trained `model.pkl` is loaded via `joblib`.
    - The model calculates a probability score (0.0 to 1.0) using `.predict_proba()`.
4.  **Thresholding**:
    - **> 0.7**: High Risk
    - **> 0.4**: Medium Risk
    - **< 0.4**: Low Risk
5.  **Output**: The API returns the Risk Level, Probability, and Feature Contributions.

---

## 3. Technology Stack Summary

| Component      | Technology                        | Role                           |
| :------------- | :-------------------------------- | :----------------------------- |
| **Frontend**   | Next.js, Tailwind, TypeScript     | User Interface & Interaction   |
| **Backend**    | Python, FastAPI                   | API Logic & Data Orchestration |
| **ML Engine**  | Scikit-Learn, Pandas, NumPy       | Predictive Modeling            |
| **Database**   | SQLite, SQLAlchemy                | Data Persistence               |
| **Deployment** | Docker (Ready), Vercel (Frontend) | Hosting & Containerization     |
