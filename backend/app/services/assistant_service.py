from langchain_groq import ChatGroq
from app.config import settings

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    api_key=settings.GROQ_API_KEY,
    temperature=0.3
)


def ask_assistant(question: str, complaints_context: str):
    prompt = f"""
You are an AI Complaint Assistant for a Customer Complaint Management System.

You are given complaint records from the company's database.

Answer ONLY using the provided complaint data.

If the answer cannot be determined from the complaint data,
say:

"I couldn't find that information in the complaint database."

Keep answers concise and professional.

Complaint Database:

{complaints_context}

-----------------------------------

User Question:

{question}
"""

    response = llm.invoke(prompt)

    return response.content
