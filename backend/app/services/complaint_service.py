from app.models.complaint import Complaint


def save_complaint(db, complaint_data):
    complaint = Complaint(
        customer_name=complaint_data["customer_name"],
        complaint=complaint_data["complaint"],
        category=complaint_data["category"],
        priority=complaint_data["priority"],
        risk_level=complaint_data["risk_level"],
        ai_summary=complaint_data["summary"],
    )

    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return complaint
