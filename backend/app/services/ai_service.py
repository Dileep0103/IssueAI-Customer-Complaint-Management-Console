import json
from langchain_groq import ChatGroq
from app.config import settings

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    api_key=settings.GROQ_API_KEY,
    temperature=0
)


def analyze_complaint(complaint: str):
    prompt = f"""
You are an AI Customer Complaint Analysis Assistant.

Analyze the customer complaint and return ONLY valid JSON.

Classification Rules:

Category (Choose only one):
- Billing
- Technical
- Account
- Service
- Delivery
- Other

Priority Rules:
- High:
  - Customer cannot use the service
  - Repeated complaints
  - Financial loss
  - Fraud-related issues
  - Urgent action required

- Medium:
  - Service delays
  - Billing issues
  - Customer support delays
  - Moderate inconvenience

- Low:
  - General inquiries
  - Suggestions
  - Feedback

Risk Level Rules:
- High:
  - Double charging
  - Unauthorized transactions
  - Fraud
  - Identity theft
  - Data breach
  - Legal complaint
  - Major financial loss
  - Security issues

- Medium:
  - Billing mistakes
  - Delayed customer support
  - Service interruption
  - Refund requests
  - Account issues

- Low:
  - General questions
  - Suggestions
  - Feedback

Instructions:
1. Choose exactly one category.
2. Choose exactly one priority.
3. Choose exactly one risk level.
4. Write a concise summary (maximum 30 words).
5. Return ONLY valid JSON.
6. Do NOT include markdown, explanations, or extra text.

Complaint:
{complaint}

Return exactly in this format:

{{
    "category": "Billing",
    "priority": "High",
    "risk_level": "High",
    "summary": "Customer was double charged for the internet bill and support has not responded for five days."
}}
"""

    response = llm.invoke(prompt)

    try:
        return json.loads(response.content)
    except json.JSONDecodeError:
        return {
            "error": "AI returned an invalid JSON response.",
            "raw_response": response.content
        }
