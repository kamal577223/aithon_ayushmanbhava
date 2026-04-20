import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

from database import Base, engine
from routes.admin import router as admin_router
from routes.auth import router as auth_router
from routes.doctor import router as doctor_router
from routes.ghostnet import router as ghostnet_router
from routes.patient import router as patient_router
from services.bootstrap_service import seed_default_users
from database import SessionLocal

from models import attack_log, patient, user  # noqa: F401

app = FastAPI(title="Ayushman Bhava API")

allowed_origins = os.getenv(
    "FRONTEND_ORIGINS", "http://localhost:3000,http://localhost:3001"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            seed_default_users(db)
        finally:
            db.close()
    except SQLAlchemyError:
        # Keep API process up; database connectivity can be fixed via DATABASE_URL.
        pass

app.include_router(auth_router)
app.include_router(patient_router)
app.include_router(doctor_router)
app.include_router(admin_router)
app.include_router(ghostnet_router)


@app.get("/")
def healthcheck():
    return {"status": "ok", "service": "Ayushman Bhava"}
