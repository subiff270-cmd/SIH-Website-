import math

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance in meters between two points 
    on the earth (specified in decimal degrees)
    """
    R = 6371000  # Radius of Earth in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2.0)**2 + \
        math.cos(phi1) * math.cos(phi2) * \
        math.sin(delta_lambda / 2.0)**2

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def check_duplicate_complaint(new_lat: float, new_lng: float, category: str, existing_complaints: list, radius_meters: float = 500.0) -> dict:
    """
    Checks if a matching issue category exists within radius_meters.
    """
    for complaint in existing_complaints:
        dist = haversine_distance(new_lat, new_lng, complaint.get("lat", 0.0), complaint.get("lng", 0.0))
        if dist <= radius_meters and complaint.get("category") == category:
            return {
                "is_duplicate": True,
                "parent_ticket": complaint.get("ticket_number"),
                "distance_meters": round(dist, 1)
            }
    return {
        "is_duplicate": False,
        "parent_ticket": None,
        "distance_meters": 0.0
    }
