import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="citizen") # citizen, admin, officer, worker
    avatar = Column(String, nullable=True)
    reward_points = Column(Integer, default=0)
    phone = Column(String, nullable=True)
    department_code = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Department(Base):
    __tablename__ = "departments"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, index=True, nullable=False)
    sla_hours = Column(Integer, default=24)

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(String, primary_key=True, index=True)
    ticket_number = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False) # POTHOLE, GARBAGE, WATER_LEAKAGE, etc.
    severity = Column(String, default="MEDIUM") # LOW, MEDIUM, HIGH, CRITICAL
    status = Column(String, default="SUBMITTED") # SUBMITTED, AI_VERIFIED, ASSIGNED, IN_PROGRESS, COMPLETED
    image_url = Column(String, nullable=False)
    after_image_url = Column(String, nullable=True)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    address = Column(String, nullable=False)
    ward = Column(String, nullable=False)
    city = Column(String, nullable=False)
    is_anonymous = Column(Boolean, default=False)
    upvotes_count = Column(Integer, default=0)
    user_id = Column(String, ForeignKey("users.id"))
    department_id = Column(String, ForeignKey("departments.id"), nullable=True)
    assigned_worker_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
