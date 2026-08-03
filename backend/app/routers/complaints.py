from app.schemes.complaint import ComplaintUpdate
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.complaint import Complaint

router = APIRouter(prefix="/complaints", tags=["Complaints"])


# Get all complaints
@router.get("/")
def get_all_complaints(db: Session = Depends(get_db)):
    return db.query(Complaint).all()


# Filter complaints
# IMPORTANT: This must come BEFORE "/{complaint_id}"
@router.get("/filter")
def filter_complaints(
    category: str | None = Query(default=None),
    priority: str | None = Query(default=None),
    risk_level: str | None = Query(default=None),
    status: str | None = Query(default=None),
    db: Session = Depends(get_db),

):
    query = db.query(Complaint)

    if category:
        query = query.filter(Complaint.category == category)

    if priority:
        query = query.filter(Complaint.priority == priority)

    if risk_level:
        query = query.filter(Complaint.risk_level == risk_level)

    if status:
        query = query.filter(Complaint.status == status)

    return query.all()


# Get complaint by ID
@router.get("/{complaint_id}")
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return complaint


# Delete complaint
@router.delete("/{complaint_id}")
def delete_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    db.delete(complaint)
    db.commit()

    return {
        "message": "Complaint deleted successfully."
    }


@router.put("/{complaint_id}/status")
def update_complaint_status(
    complaint_id: int,
    complaint_data: ComplaintUpdate,
    db: Session = Depends(get_db),
):
    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    complaint.status = complaint_data.status

    db.commit()
    db.refresh(complaint)

    return complaint
