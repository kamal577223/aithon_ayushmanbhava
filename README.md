# Ayushman Bhava — Unified Healthcare Platform with GhostNet AI Security

## Project Overview

**Ayushman Bhava** is an AI-enabled unified healthcare platform designed to integrate patient data from multiple healthcare sources into a single digital health profile. The system improves healthcare decision-making while ensuring strong cybersecurity protection using **GhostNet AI**, a deception-based security mechanism.

The platform supports multiple stakeholders including patients, doctors, and administrators, and provides real-time dashboards, secure data management, and cyber threat detection.

In simple terms, this project:

* Integrates healthcare data into one system
* Provides dashboards for healthcare management
* Protects sensitive health data from cyber attacks
* Uses decoy systems to trap attackers safely

---

## Core Objectives

* Build a centralized healthcare data platform
* Provide secure role-based access for users
* Detect and prevent cyber threats using GhostNet AI
* Enable real-time monitoring and reporting
* Ensure privacy and data protection

---

## Key Features

### Healthcare Platform Features

* Unified patient health records
* Role-based dashboards (Patient, Doctor, Admin)
* Patient data management
* Real-time health information access
* System monitoring and reporting

### Security Features — GhostNet AI

GhostNet AI performs the following:

* Monitors login and system activity
* Detects suspicious behavior
* Deploys decoy (fake) environments
* Logs attacker actions
* Generates security alerts
* Helps prevent future cyber threats

---

## System Architecture (High-Level)

Data Sources
→ Backend API
→ Database
→ Frontend Dashboard
→ GhostNet AI Security Layer

---

## Technology Stack

### Frontend

* Next.js 14
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Python
* FastAPI
* REST API

### Database

* PostgreSQL

### Security

* JWT Authentication
* Role-Based Access Control
* Password Hashing
* GhostNet AI Decoy System

### Tools

* Git
* Node.js
* Python
* npm
* PostgreSQL

---

## Project Folder Structure

```
ayushman-bhava/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── middleware.ts
│   └── package.json
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

## Prerequisites

Make sure the following software is installed on your system.

### Required Software

* Python 3.9 or higher
* Node.js 18 or higher
* npm
* PostgreSQL
* Git

### Check Installation

```
python --version
node --version
npm --version
psql --version
```

---

## Installation Guide

Follow these steps to install the project on your system.

---

## Step 1 — Clone the Repository

```
git clone https://github.com/your-username/ayushman-bhava.git

cd ayushman-bhava
```

---

## Step 2 — Backend Setup

Navigate to the backend folder.

```
cd backend
```

Create virtual environment.

```
python -m venv venv
```

Activate environment.

### Windows

```
venv\Scripts\activate
```

### Linux / Mac

```
source venv/bin/activate
```

Install dependencies.

```
pip install -r requirements.txt
```

---

## Step 3 — Database Setup

Open PostgreSQL.

Create database.

```
CREATE DATABASE ayushman_db;
```

Run schema file.

```
psql -U postgres -d ayushman_db -f database/schema.sql
```

---

## Step 4 — Configure Environment Variables

Create file:

```
.env
```

Add:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/ayushman_db

SECRET_KEY=your_secret_key

JWT_ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Step 5 — Run Backend Server

```
uvicorn main:app --reload
```

Backend will start at:

```
http://localhost:8000
```

---

## Step 6 — Frontend Setup

Open new terminal.

Navigate to frontend folder.

```
cd frontend
```

Install dependencies.

```
npm install
```

---

## Step 7 — Run Frontend

```
npm run dev
```

Frontend will start at:

```
http://localhost:3000
```

---

## Default User Roles

The system supports three user roles.

### Patient

* View health records
* Access personal information

### Doctor

* View patient data
* Manage medical records

### Admin

* Monitor system activity
* View dashboards
* Review attack logs

---

## API Endpoints

### Authentication

```
POST /register
POST /login
GET /profile
```

### Patient Management

```
GET /patients
POST /patients
PUT /patients/{id}
DELETE /patients/{id}
```

### Admin Dashboard

```
GET /admin/dashboard
```

### GhostNet AI Security

```
POST /ghostnet/detect
GET /ghostnet/logs
```

---

## GhostNet AI Workflow

1. User attempts login
2. System monitors activity
3. Suspicious behavior detected
4. Decoy system deployed
5. Attack logged
6. Alert generated

---

## Example Security Logic

```
if failed_login_attempts > 5:
    deploy_decoy_environment()
    log_attack()
    send_alert()
```

---

## Testing the System

Run backend tests.

```
pytest
```

Manual testing steps:

1. Start backend server
2. Start frontend server
3. Login using test user
4. Create patient record
5. Trigger multiple failed logins
6. Check attack logs

---

## Troubleshooting

### Backend Not Starting

Check:

```
pip install -r requirements.txt
```

### Database Connection Error

Check:

* PostgreSQL running
* Correct database credentials

### Frontend Not Loading

Check:

```
npm install
```

---

## Deployment Guide

### Backend Deployment

Use:

```
uvicorn
gunicorn
nginx
```

### Frontend Deployment

Use:

```
Vercel
Netlify
Docker
```

---

## Future Enhancements

* Mobile application
* AI-based health prediction
* Real-time alerts
* Advanced fraud detection
* Cloud deployment
* Multi-hospital integration

---

## Security Considerations

The system implements:

* JWT authentication
* Password hashing
* Role-based access control
* Secure API communication
* GhostNet AI decoy system
* Attack logging and monitoring

---

## Project Status

Development Stage:

Prototype / Ideathon / Academic Project

---

## Author Information

Name: Kamal Nath Mallick
Branch: CSE & IoT

Project:

Ayushman Bhava — Unified Healthcare Platform with GhostNet AI Security

---

## License

This project is developed for academic and educational purposes.
