from pydantic import BaseModel
from datetime import datetime


class ComplaintCreate(BaseModel):
    customer_name: str = "Unknown"
    complaint: str
    category: str
    priority: str
    risk_level: str
    status: str = "Pending"
    ai_summary: str


class ComplaintUpdate(BaseModel):
    customer_name: str | None = None
    complaint: str | None = None
    category: str | None = None
    priority: str | None = None
    risk_level: str | None = None
    status: str | None = None
    ai_summary: str | None = None


class ComplaintResponse(BaseModel):
    id: int
    customer_name: str
    complaint: str
    category: str
    priority: str
    risk_level: str
    status: str
    ai_summary: str
    created_at: datetime

    class Config:
        from_attributes = True
