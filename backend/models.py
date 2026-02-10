from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True, index=True) # Anonymized ID
    name = Column(String) # For now we keep this, but user requested ethics. Maybe obfuscated in display.
    # Academic Data
    gpa = Column(Float)
    attendance_rate = Column(Float)
    assignments_completed = Column(Integer)
    # Socio-economic Data (Use broad categories)
    household_income_bracket = Column(Integer) # 1: Low, 2: Med, 3: High
    parent_education_level = Column(Integer) # 1: HS, 2: College, 3: Post-grad
    
    predictions = relationship("Prediction", back_populates="student")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    risk_level = Column(String) # 'Low', 'Medium', 'High'
    probability = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Feature Importance (JSON stored as text for simplicity related to DB portability)
    feature_contributions = Column(String) 

    student = relationship("Student", back_populates="predictions")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
