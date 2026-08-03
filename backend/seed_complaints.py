from app.database.database import SessionLocal
from app.models.complaint import Complaint

db = SessionLocal()

complaints = [
    {
        "customer_name": "Rahul Sharma",
        "complaint": "Payment was deducted twice.",
        "category": "Billing",
        "priority": "High",
        "risk_level": "High",
        "ai_summary": "Duplicate payment issue."
    },
    {
        "customer_name": "Priya Reddy",
        "complaint": "Unable to login after password reset.",
        "category": "Technical",
        "priority": "Medium",
        "risk_level": "Medium",
        "ai_summary": "Login issue after password reset."
    },
    {
        "customer_name": "Arjun Kumar",
        "complaint": "Order has not been delivered.",
        "category": "Delivery",
        "priority": "High",
        "risk_level": "High",
        "ai_summary": "Delayed delivery complaint."
    },
    {
        "customer_name": "Sneha Patel",
        "complaint": "Refund is taking too long.",
        "category": "Billing",
        "priority": "Medium",
        "risk_level": "Medium",
        "ai_summary": "Refund delay."
    },
    {
        "customer_name": "Vikram Singh",
        "complaint": "Mobile app crashes while opening.",
        "category": "Technical",
        "priority": "High",
        "risk_level": "High",
        "ai_summary": "App crash issue."
    },
    {
        "customer_name": "Ananya Rao",
        "complaint": "Need invoice for my purchase.",
        "category": "Billing",
        "priority": "Low",
        "risk_level": "Low",
        "ai_summary": "Invoice request."
    },
    {
        "customer_name": "Kiran Das",
        "complaint": "Product arrived damaged.",
        "category": "Delivery",
        "priority": "High",
        "risk_level": "High",
        "ai_summary": "Damaged product."
    },
    {
        "customer_name": "Meera Joshi",
        "complaint": "Cannot update profile information.",
        "category": "Account",
        "priority": "Low",
        "risk_level": "Low",
        "ai_summary": "Profile update issue."
    },
    {
        "customer_name": "Suresh Kumar",
        "complaint": "OTP is not being received.",
        "category": "Technical",
        "priority": "Medium",
        "risk_level": "Medium",
        "ai_summary": "OTP delivery issue."
    },
    {
        "customer_name": "Divya Nair",
        "complaint": "Need dark mode feature.",
        "category": "Feature Request",
        "priority": "Low",
        "risk_level": "Low",
        "ai_summary": "Feature suggestion."
    },
]
for item in complaints:
    db.add(Complaint(**item))

db.commit()
db.close()

print(f"Inserted {len(complaints)} complaints successfully!")
