from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from models.patient import Patient
from routes.auth import require_roles

router = APIRouter(prefix="/doctor", tags=["doctor"])


class DiagnosisRequest(BaseModel):
    patient_id: int
    symptoms: list[str]


class TreatmentPlanRequest(BaseModel):
    patient_id: int
    medications: list[dict]
    lifestyle_modifications: list[str]


@router.get("/dashboard")
def doctor_dashboard(_current_user: User = Depends(require_roles(["Doctor"]))):
    return {
        "appointments_today": 14,
        "critical_cases": 3,
        "diagnostics_pending": 7,
        "consultation_status": "Active",
    }


@router.get("/patients/{patient_id}/diagnosis")
def get_patient_diagnosis(
    patient_id: int,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Doctor"])),
):
    """Get patient information and medical history for diagnosis"""
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        return {"error": "Patient not found"}
    
    return {
        "patient_id": patient.id,
        "patient_name": "Sample Patient",
        "age": patient.age,
        "gender": patient.gender,
        "medical_history": patient.medical_history,
        "diagnosis": patient.diagnosis,
        "prescriptions": patient.prescriptions,
    }


@router.post("/diagnosis/suggest")
def suggest_diagnosis(
    request: DiagnosisRequest,
    _current_user: User = Depends(require_roles(["Doctor"])),
):
    """AI-powered diagnosis suggestion"""
    return {
        "suggested_diagnoses": [
            {"condition": "Type 2 Diabetes", "confidence": 0.85},
            {"condition": "Hypertension", "confidence": 0.62},
            {"condition": "Metabolic Syndrome", "confidence": 0.54},
        ],
        "recommendations": [
            "Order HbA1c test",
            "Blood glucose 2x daily",
            "Medication adjustment",
        ],
    }


@router.post("/treatment-plan")
def create_treatment_plan(
    request: TreatmentPlanRequest,
    _current_user: User = Depends(require_roles(["Doctor"])),
):
    """Create treatment plan for a patient"""
    return {
        "treatment_id": "TP001",
        "patient_id": request.patient_id,
        "medications": request.medications,
        "lifestyle_modifications": request.lifestyle_modifications,
        "follow_up_date": "4 weeks",
    }


@router.get("/risk-scores")
def get_patient_risk_scores(
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Doctor"])),
):
    """Get risk scores for all patients"""
    patients = db.query(Patient).all()
    risk_scores = []
    for patient in patients:
        risk_scores.append({
            "patient_id": patient.id,
            "overall_risk": 65,
            "risk_level": "Medium",
            "factors": {
                "blood_glucose": 85,
                "blood_pressure": 68,
                "bmi": 72,
            },
        })
    return {"risk_scores": risk_scores}


@router.get("/clinical-support")
def get_clinical_decision_support(
    symptoms: str = "",
    _current_user: User = Depends(require_roles(["Doctor"])),
):
    """Clinical Decision Support System recommendations"""
    return {
        "recommendations": [
            {
                "title": "Diabetes Screening",
                "confidence": 0.89,
                "actions": ["Order HbA1c", "Glucose test"],
            },
            {
                "title": "Cardiovascular Assessment",
                "confidence": 0.76,
                "actions": ["ECG", "Lipid panel"],
            },
        ],
        "guidelines": ["ADA Guidelines", "ACC/AHA Guidelines"],
    }

