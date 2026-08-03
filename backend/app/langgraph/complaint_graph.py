from typing import TypedDict
from langgraph.graph import StateGraph, END

from app.services.ai_service import analyze_complaint


class ComplaintState(TypedDict):
    complaint: str
    analysis: dict


def analyze_node(state: ComplaintState):
    result = analyze_complaint(state["complaint"])

    return {
        "analysis": result
    }


builder = StateGraph(ComplaintState)

builder.add_node("analyze", analyze_node)

builder.set_entry_point("analyze")

builder.add_edge("analyze", END)

graph = builder.compile()
