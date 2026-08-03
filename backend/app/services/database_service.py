from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.complaint import Complaint


def get_all_complaints(db: Session):
    return db.query(Complaint).all()


def get_high_risk_complaints(db: Session):
    return (
        db.query(Complaint)
        .filter(Complaint.risk_level.ilike("High"))
        .all()
    )


def get_complaints_by_category(db: Session, category: str):
    return (
        db.query(Complaint)
        .filter(Complaint.category.ilike(category))
        .all()
    )


def get_total_complaints(db: Session):
    return db.query(Complaint).count()


def get_category_counts(db: Session):
    return (
        db.query(
            Complaint.category,
            func.count(Complaint.id)
        )
        .group_by(Complaint.category)
        .all()
    )
