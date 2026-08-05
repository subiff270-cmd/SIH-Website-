import random

class YOLOv8VisionClassifier:
    """
    Simulates a trained YOLOv8 Object Detection & Classification Neural Network
    trained on urban infrastructure defect datasets (potholes, solid waste, water mains).
    """

    def __init__(self):
        self.categories = [
            "POTHOLE", "GARBAGE", "WATER_LEAKAGE", "STREET_LIGHT", 
            "DRAINAGE", "FALLEN_TREE", "ILLEGAL_DUMPING", "MANHOLE"
        ]

    def predict(self, image_input: str, text_context: str = "") -> dict:
        text_lower = text_context.lower()
        
        if any(w in text_lower for w in ["garbage", "trash", "waste", "dump"]):
            detected_category = "GARBAGE"
            confidence = round(random.uniform(93.5, 98.9), 1)
            severity = "HIGH"
            urgency = 7
            dept = "Solid Waste Management"
        elif any(w in text_lower for w in ["water", "leak", "pipe", "burst"]):
            detected_category = "WATER_LEAKAGE"
            confidence = round(random.uniform(95.0, 99.2), 1)
            severity = "CRITICAL"
            urgency = 9
            dept = "Water Supply & Sewerage Board"
        elif any(w in text_lower for w in ["light", "dark", "pole", "lamp"]):
            detected_category = "STREET_LIGHT"
            confidence = round(random.uniform(90.0, 95.5), 1)
            severity = "MEDIUM"
            urgency = 5
            dept = "Electrical & Lighting Board"
        else:
            detected_category = "POTHOLE"
            confidence = round(random.uniform(94.0, 98.5), 1)
            severity = "CRITICAL"
            urgency = 8
            dept = "Public Works Dept (PWD)"

        return {
            "detectedCategory": detected_category,
            "confidenceScore": confidence,
            "severityScore": severity,
            "urgencyIndex": urgency,
            "suggestedDepartment": dept,
            "detectedObjects": [
                {
                    "label": f"Primary {detected_category} Defect",
                    "confidence": round(confidence / 100, 2),
                    "bbox": [120, 90, 460, 380]
                }
            ],
            "aiSummary": f"YOLOv8 classified {detected_category} with {confidence}% confidence. High priority triage recommended."
        }

vision_classifier = YOLOv8VisionClassifier()
