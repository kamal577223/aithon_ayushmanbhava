from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from models.patient import Patient
from models.user import User
from routes.auth import require_roles, get_current_user

router = APIRouter(tags=["patients"])


class PatientRequest(BaseModel):
    user_id: int
    age: int
    gender: str
    medical_history: str = ""
    diagnosis: str = ""
    prescriptions: str = ""


@router.get("/patients")
def get_patients(
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Doctor", "Admin"])),
):
    return db.query(Patient).all()


@router.post("/patients")
def create_patient(
    payload: PatientRequest,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Doctor", "Admin"])),
):
    patient = Patient(**payload.model_dump())
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


@router.put("/patients/{patient_id}")
def update_patient(
    patient_id: int,
    payload: PatientRequest,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Doctor", "Admin"])),
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    for key, value in payload.model_dump().items():
        setattr(patient, key, value)
    db.commit()
    db.refresh(patient)
    return patient


@router.delete("/patients/{patient_id}")
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Admin"])),
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    db.delete(patient)
    db.commit()
    return {"message": "Patient deleted"}


@router.get("/patient/dashboard")
def patient_dashboard(
    current_user: User = Depends(require_roles(["Patient"])),
):
    """Get patient dashboard data"""
    return {
        "user_id": current_user.id,
        "name": current_user.name,
        "health_score": 82,
        "appointments": 12,
        "active_prescriptions": 3,
        "alerts": 3,
    }


@router.get("/patient/disease-prediction")
def get_disease_prediction(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["Patient"])),
):
    """Get disease prediction from previous medical records"""
    return {
        "predicted_disease": "Type 2 Diabetes",
        "risk_level": "Medium",
        "confidence": 0.72,
        "recommendations": [
            "Increase physical activity to 150 min/week",
            "Reduce sugar intake",
            "Monitor blood glucose levels regularly",
        ],
        "prediction_history": [
            {
                "date": "2024-01-15",
                "disease": "Type 2 Diabetes",
                "risk_level": "Medium",
                "confidence": 0.72,
            },
            {
                "date": "2024-01-10",
                "disease": "Hypertension",
                "risk_level": "Low",
                "confidence": 0.35,
            },
        ],
    }


@router.get("/patient/medicines")
def get_medicine_recommendations(
    current_user: User = Depends(require_roles(["Patient"])),
):
    """Get recommended medicines and dosage guidance"""
    return {
        "medicines": [
            {
                "id": 1,
                "name": "Metformin",
                "dosage": "500mg",
                "frequency": "Twice daily (Morning & Evening)",
                "duration": "Ongoing",
                "reason": "Diabetes Management",
                "side_effects": ["Mild nausea", "Digestive issues"],
                "reminders": ["08:00 AM", "08:00 PM"],
            },
            {
                "id": 2,
                "name": "Lisinopril",
                "dosage": "10mg",
                "frequency": "Once daily (Morning)",
                "duration": "Ongoing",
                "reason": "Blood Pressure Control",
                "side_effects": ["Dry cough", "Dizziness"],
                "reminders": ["09:00 AM"],
            },
        ],
        "adherence_rate": 92,
        "daily_reminders": 3,
    }


@router.get("/patient/health-recommendations")
def get_health_recommendations(
    current_user: User = Depends(require_roles(["Patient"])),
):
    """Get personalized health recommendations including lifestyle and diet"""
    return {
        "recommendations": [
            {
                "id": 1,
                "category": "Exercise",
                "title": "Morning Jog or Brisk Walk",
                "description": "Start your day with 30 minutes of moderate cardio exercise",
                "benefit": "Improves cardiovascular health and blood glucose control",
                "duration": "30 minutes daily",
            },
            {
                "id": 2,
                "category": "Diet",
                "title": "Reduce Sugar and Refined Carbs",
                "description": "Replace white bread and sugary drinks with whole grains and water",
                "benefit": "Better blood glucose management and weight control",
                "duration": "Ongoing lifestyle change",
            },
            {
                "id": 3,
                "category": "Lifestyle",
                "title": "Stress Management Through Meditation",
                "description": "Practice 10 minutes of mindfulness meditation daily",
                "benefit": "Reduces cortisol levels and improves mental health",
                "duration": "10 minutes daily",
            },
        ],
        "compliance_rate": 78,
        "health_score_gained": 12,
    }


@router.get("/patient/alerts")
def get_patient_alerts(
    current_user: User = Depends(require_roles(["Patient"])),
):
    """Get warning alerts for health conditions and medications"""
    return {
        "alerts": [
            {
                "type": "Missed Medication",
                "severity": "High",
                "message": "Missed medication: Blood pressure medication at 2 PM",
            },
            {
                "type": "Upcoming Appointment",
                "severity": "Info",
                "message": "Upcoming appointment: Dr. Smith - Jan 15, 2:00 PM",
            },
            {
                "type": "Lab Results",
                "severity": "Info",
                "message": "Lab results available: Blood work from Jan 10",
            },
        ],
        "alert_count": 3,
    }


@router.get("/patient/health-metrics")
def get_patient_health_metrics(
    current_user: User = Depends(require_roles(["Patient"])),
):
    """Get patient's health metrics"""
    return {
        "metrics": [
            {
                "label": "Blood Pressure",
                "value": "120/80 mmHg",
                "status": "normal",
            },
            {
                "label": "BMI",
                "value": "24.5",
                "status": "normal",
            },
            {
                "label": "Blood Glucose",
                "value": "115 mg/dL",
                "status": "warning",
            },
            {
                "label": "Cholesterol",
                "value": "200 mg/dL",
                "status": "normal",
            },
        ]
    }

