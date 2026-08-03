import os
import shutil

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.utils.pdf_reader import extract_text_from_pdf
from app.langgraph.complaint_graph import graph
from app.services.complaint_service import save_complaint

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save uploaded PDF
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(file_path)

    # Analyze complaint using LangGraph
    result = graph.invoke(
        {
            "complaint": extracted_text,
            "analysis": {}
        }
    )

    analysis = result["analysis"]

    # Save complaint to PostgreSQL
    save_complaint(
        db,
        {
            "customer_name": "Unknown",
            "complaint": extracted_text,
            "category": analysis["category"],
            "priority": analysis["priority"],
            "risk_level": analysis["risk_level"],
            "summary": analysis["summary"],
        }
    )

    return {
        "message": "Complaint uploaded and saved successfully.",
        "filename": file.filename,
        "analysis": analysis
    }
