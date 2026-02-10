from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Student Schemas
class StudentBase(BaseModel):
    student_id: str
    name: str # Might want to be optional or hashed
    gpa: float
    attendance_rate: float
    assignments_completed: int
    household_income_bracket: int
    parent_education_level: int

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: int
    class Config:
        orm_mode = True

# Prediction Schemas
class PredictionBase(BaseModel):
    risk_level: str
    probability: float
    feature_contributions: str

class PredictionCreate(PredictionBase):
    student_id: int

class Prediction(PredictionBase):
    id: int
    timestamp: datetime
    class Config:
        orm_mode = True

# User / Auth Schemas
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class SimulationRequest(BaseModel):
    gpa: float
    attendance_rate: float
    assignments_completed: int
    household_income_bracket: Optional[int] = 2
    parent_education_level: Optional[int] = 2

class SimulationResponse(BaseModel):
    risk_level: str
    probability: float
    feature_contributions: dict

class MetricsResponse(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    last_trained: str
