from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.services.assistant_service import ask_assistant
from app.services.intent_service import detect_intent

from app.services.database_service import (
    get_all_complaints,
    get_total_complaints,
    get_high_risk_complaints,
    get_complaints_by_category,
    get_category_counts,
)

router = APIRouter(
    prefix="/assistant",
    tags=["AI Assistant"]
)


class AssistantRequest(BaseModel):
    question: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def build_context(complaints):
    context = ""

    for complaint in complaints:
        context += f"""
Customer Name: {complaint.customer_name}
Category: {complaint.category}
Priority: {complaint.priority}
Risk Level: {complaint.risk_level}
Complaint: {complaint.complaint}
Summary: {complaint.ai_summary}

---
"""

    return context


@router.post("/")
def assistant(request: AssistantRequest, db: Session = Depends(get_db)):

    question = request.question.strip()
    lower_question = question.lower()

    # ==========================
    # Greeting Support
    # ==========================
    greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
    ]

    if lower_question in greetings:
        return {
            "answer": """👋 Hello! I'm IssueAI.

I'm your AI-powered Complaint Management Assistant.

I can help you with:

• Complaint analysis
• Complaint statistics
• High-risk complaints
• Billing complaints
• Technical complaints
• Complaint summaries

You can also ask me general AI questions.

How can I help you today?"""
        }

    intent = detect_intent(question)

    # ==========================
    # Total Complaint Count
    # ==========================
    if intent["intent"] == "TOTAL_COMPLAINTS":

        total = get_total_complaints(db)

        return {
            "answer": f"There are {total} complaints in the database."
        }

    # ==========================
    # High Risk Complaints
    # ==========================
    elif intent["intent"] == "HIGH_RISK":

        complaints = get_high_risk_complaints(db)

        if not complaints:
            return {
                "answer": "No High Risk complaints found."
            }

        context = build_context(complaints)

        answer = ask_assistant(question, context)

        return {
            "answer": answer
        }

    # ==========================
    # Category Complaints
    # ==========================
    elif intent["intent"] == "CATEGORY":

        category = intent["category"]

        complaints = get_complaints_by_category(db, category)

        if not complaints:
            return {
                "answer": f"No {category} complaints found."
            }

        context = build_context(complaints)

        answer = ask_assistant(question, context)

        return {
            "answer": answer
        }

    # ==========================
    # Category Statistics
    # ==========================
    elif intent["intent"] == "CATEGORY_COUNT":

        category_counts = get_category_counts(db)

        if not category_counts:
            return {
                "answer": "No complaints found."
            }

        text = ""

        for category, count in category_counts:
            text += f"{category}: {count} complaints\n"

        answer = ask_assistant(question, text)

        return {
            "answer": answer
        }

    # ==========================
    # General Complaint Questions
    # ==========================
    else:

        complaints = get_all_complaints(db)

        if not complaints:
            return {
                "answer": "No complaints are available in the database."
            }

        context = build_context(complaints)

        answer = ask_assistant(question, context)

        return {
            "answer": answer
        }
