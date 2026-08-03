
def detect_intent(question: str):
    question = question.lower()

    # Total complaints
    if "how many complaints" in question or "total complaints" in question:
        return {
            "intent": "TOTAL_COMPLAINTS"
        }

    # High Risk complaints
    if "high risk" in question:
        return {
            "intent": "HIGH_RISK"
        }

    # Category count
    if (
        "highest category" in question
        or "most complaints" in question
        or "highest number of complaints" in question
    ):
        return {
            "intent": "CATEGORY_COUNT"
        }

    # Category-specific complaints
    categories = [
        "billing",
        "technical",
        "account",
        "service",
        "payment",
    ]

    for category in categories:
        if category in question:
            return {
                "intent": "CATEGORY",
                "category": category.title()
            }

    # Default: AI summary/explanation
    return {
        "intent": "GENERAL"
    }
