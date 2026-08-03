from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String(100), nullable=False)

    complaint = Column(Text, nullable=False)

    category = Column(String(50), nullable=True)

    priority = Column(String(20), nullable=True)

    risk_level = Column(String(20), nullable=True)

    status = Column(String(20), default="Pending")

    ai_summary = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
