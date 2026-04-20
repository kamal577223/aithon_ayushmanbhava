import os

from passlib.context import CryptContext
from sqlalchemy.orm import Session

from models.user import User

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def seed_default_users(db: Session):
    seed_enabled = os.getenv("SEED_DEFAULT_USERS", "true").lower() == "true"
    if not seed_enabled:
        return

    default_password = os.getenv("DEFAULT_USER_PASSWORD", "Admin@123")
    users = [
        ("System Admin", "admin@ayushman.local", "Admin"),
        ("Dr. Dayanand", "doctor@ayushman.local", "Doctor"),
        ("Patient One", "patient@ayushman.local", "Patient"),
    ]

    for name, email, role in users:
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            continue
        db.add(
            User(
                name=name,
                email=email,
                password=pwd_context.hash(default_password),
                role=role,
            )
        )
    db.commit()
