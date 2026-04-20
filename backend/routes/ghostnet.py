from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from routes.auth import require_roles
from services.ghostnet_service import ghostnet_service

router = APIRouter(prefix="/ghostnet", tags=["ghostnet"])


class GhostNetDetectRequest(BaseModel):
    identifier: str
    suspicious: bool = False


@router.post("/detect")
def detect_attack(
    payload: GhostNetDetectRequest,
    request: Request,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(["Admin", "Doctor"])),
):
    result = ghostnet_service.monitor_api_activity(payload.identifier, payload.suspicious)
    if result.get("suspicious"):
        ip = request.client.host if request.client else "unknown"
        ghostnet_service.log_attack(db, ip_address=ip, attack_type=result["attack_type"])
    return result
