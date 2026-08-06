from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from pydantic import BaseModel

from app.database.database import Base, engine
from app.models.complaint import Complaint
from app.models.admin import Admin

from app.langgraph.complaint_graph import graph

from app.routers.upload import router as upload_router
from app.routers.complaints import router as complaints_router
from app.routers.assistant import router as assistant_router
from app.routers.auth import router as auth_router


app = FastAPI(
    title="AIVOA Customer Complaint Management System"
)

# -------------------------------
# CORS Configuration
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://issueai-customer-complaint-management-si8l.onrender.com",
        "https://issueai-customer-complaint-management-console.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Register Routers
# -------------------------------
app.include_router(upload_router)
app.include_router(complaints_router)
app.include_router(assistant_router)
app.include_router(auth_router)
# -------------------------------
# Create Database Tables
# -------------------------------
Base.metadata.create_all(bind=engine)


class ComplaintRequest(BaseModel):
    complaint: str


# -------------------------------
# Home Route
# -------------------------------
@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully 🚀"
    }


# -------------------------------
# Database Connection Test
# -------------------------------
@app.get("/db-test")
def test_database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "success",
            "message": "Connected to PostgreSQL successfully!"
        }

    except Exception as e:
        return {
            "status": "failed",
            "error": str(e)
        }


# -------------------------------
# Analyze Complaint
# -------------------------------
@app.post("/analyze")
def analyze(request: ComplaintRequest):

    result = graph.invoke(
        {
            "complaint": request.complaint,
            "analysis": {}
        }
    )

    return result
