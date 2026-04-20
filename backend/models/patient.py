from sqlalchemy import Column, ForeignKey, Integer, String, Text

from database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(20), nullable=False)
    medical_history = Column(Text, nullable=True)
    diagnosis = Column(Text, nullable=True)
    prescriptions = Column(Text, nullable=True)
