from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db
from models.attack_log import AttackLog
from models.patient import Patient
from models.user import User
from routes.auth import require_roles

router = APIRouter(prefix="/admin", tags=["admin"])


class RegionStats(BaseModel):
    region: str
    population: int
    patients: int
    health_score: float


@router.get("/dashboard")
def get_admin_dashboard(
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Admin"])),
):
    total_patients = db.query(func.count(Patient.id)).scalar() or 0
    total_doctors = (
        db.query(func.count(User.id)).filter(User.role == "Doctor").scalar() or 0
    )
    total_records = total_patients
    detected_attacks = db.query(func.count(AttackLog.id)).scalar() or 0
    return {
        "total_patients": total_patients,
        "total_doctors": total_doctors,
        "total_records": total_records,
        "detected_attacks": detected_attacks,
    }


@router.get("/population-health")
def get_population_health(
    _current_user: User = Depends(require_roles(["Admin"])),
):
    """Get population-level health statistics by region"""
    return {
        "regions": [
            {
                "region": "North",
                "population": 450000,
                "patients": 1250,
                "disease_cases": 342,
                "health_score": 78,
            },
            {
                "region": "South",
                "population": 380000,
                "patients": 980,
                "disease_cases": 210,
                "health_score": 82,
            },
            {
                "region": "East",
                "population": 520000,
                "patients": 1450,
                "disease_cases": 480,
                "health_score": 65,
            },
            {
                "region": "West",
                "population": 390000,
                "patients": 1020,
                "disease_cases": 198,
                "health_score": 85,
            },
        ]
    }


@router.get("/fraud-detection")
def get_fraud_alerts(
    _current_user: User = Depends(require_roles(["Admin"])),
):
    """Get fraud and duplicate claim detection alerts"""
    return {
        "alerts": [
            {
                "id": "FA001",
                "claim_id": "CLM-5482",
                "type": "Duplicate Claim",
                "severity": "High",
                "amount": 2400,
                "status": "Active",
            },
            {
                "id": "FA002",
                "claim_id": "CLM-5481",
                "type": "Suspicious Activity",
                "severity": "High",
                "amount": 8500,
                "status": "Under Review",
            },
            {
                "id": "FA003",
                "claim_id": "CLM-5480",
                "type": "Pattern Anomaly",
                "severity": "Medium",
                "amount": 15000,
                "status": "Active",
            },
        ],
        "total_fraud_value": 25900,
        "detection_rate": 0.942,
    }


@router.get("/disease-hotspots")
def get_disease_hotspots(
    _current_user: User = Depends(require_roles(["Admin"])),
):
    """Get disease hotspot predictions and high-risk geographical areas"""
    return {
        "hotspots": [
            {
                "id": "HS001",
                "location": "District North - Urban Area",
                "disease": "COVID-19",
                "risk_level": "Critical",
                "predicted_cases": 450,
                "trend": "Increasing",
                "affected_population": 125000,
            },
            {
                "id": "HS002",
                "location": "Region East - Rural Area",
                "disease": "Dengue Fever",
                "risk_level": "High",
                "predicted_cases": 320,
                "trend": "Increasing",
                "affected_population": 95000,
            },
            {
                "id": "HS003",
                "location": "District South - Suburban",
                "disease": "Influenza",
                "risk_level": "Moderate",
                "predicted_cases": 180,
                "trend": "Stable",
                "affected_population": 78000,
            },
            {
                "id": "HS004",
                "location": "Region West - Mixed Urban-Rural",
                "disease": "Tuberculosis",
                "risk_level": "High",
                "predicted_cases": 220,
                "trend": "Decreasing",
                "affected_population": 112000,
            },
        ]
    }


@router.get("/system-monitoring")
def get_system_monitoring(
    _current_user: User = Depends(require_roles(["Admin"])),
):
    """Get system health and monitoring metrics"""
    return {
        "metrics": {
            "api_response_time": 45,
            "database_load": 65,
            "storage_usage": 78,
            "uptime_percent": 99.8,
        },
        "alerts": 5,
        "security_events": 12,
    }


@router.post("/fraud-detection/block")
def block_fraudulent_claim(
    claim_id: str,
    _current_user: User = Depends(require_roles(["Admin"])),
):
    """Block a fraudulent claim"""
    return {"claim_id": claim_id, "status": "Blocked", "action": "Claim blocked successfully"}


@router.get("/reports/population")
def generate_population_report(
    _current_user: User = Depends(require_roles(["Admin"])),
):
    """Generate population health report"""
    return {"report_id": "REP001", "type": "Population Health", "status": "Generated"}


@router.get("/reports/fraud")
def generate_fraud_report(
    _current_user: User = Depends(require_roles(["Admin"])),
):
    """Generate fraud detection report"""
    return {"report_id": "REP002", "type": "Fraud Detection", "status": "Generated"}

