from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, models, database, ml_service
from routers.auth import get_current_user
import json
import random

router = APIRouter(
    prefix="/predict",
    tags=["predict"],
    dependencies=[Depends(get_current_user)]
)

@router.post("/", response_model=schemas.Prediction)
def predict_risk(student_id: int, db: Session = Depends(database.get_db)):
    # 1. Fetch student data
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # 2. Get Prediction from Service
    risk_level, probability, contributions = ml_service.predict_risk(
        student.gpa, 
        student.attendance_rate, 
        student.assignments_completed,
        student.household_income_bracket,
        student.parent_education_level
    )
    
    # 3. Store Prediction
    db_prediction = models.Prediction(
        student_id=student.id,
        risk_level=risk_level,
        probability=probability,
        feature_contributions=json.dumps(contributions)
    )
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    
    return db_prediction

@router.post("/simulate", response_model=schemas.SimulationResponse)
def simulate_risk(request: schemas.SimulationRequest, db: Session = Depends(database.get_db)):
    risk_level, probability, contributions = ml_service.predict_risk(
        request.gpa,
        request.attendance_rate,
        request.assignments_completed,
        request.household_income_bracket,
        request.parent_education_level
    )
    
    return schemas.SimulationResponse(
        risk_level=risk_level,
        probability=probability,
        feature_contributions=contributions
    )
