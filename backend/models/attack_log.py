from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String

from database import Base


class AttackLog(Base):
    __tablename__ = "attack_logs"

    id = Column(Integer, primary_key=True, index=True)
    ip_address = Column(String(100), nullable=False)
    attack_type = Column(String(100), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), nullable=False, default="detected")
