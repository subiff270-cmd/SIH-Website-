# CivicAI – AI Powered Crowdsourced Civic Issue Reporting System
> **Smart India Hackathon (SIH) 2026 Flagship Platform**

CivicAI is an enterprise-ready, AI-powered crowdsourced civic infrastructure management system designed for smart municipalities across India. It empowers citizens to report civic defects (potholes, solid waste overflow, broken street lights, water pipe bursts, drainage blockages) using photos, GPS location, and voice notes. An integrated AI neural engine automatically classifies defects using YOLOv8 Computer Vision, clusters geospatial duplicate reports within 500m via Haversine distance calculations, ranks severity, and routes work orders directly to assigned department officers and field workers.

---

## Key Features

1. **3D Smart City Digital Twin (React Three Fiber & Three.js)**:
   - Interactive 3D holographic city canvas with procedural buildings, moving vehicles, glowing road traffic lines, autonomous inspection drones with light cones, rotating Earth atmosphere, and inspectable 3D complaint nodes (Red = Critical, Orange = High, Yellow = Medium, Green = Resolved).

2. **AI Computer Vision & Triage Visualizer**:
   - Simulated YOLOv8 defect detection scanner overlaying real-time laser scan lines, target bounding box indicators, classification confidence %, severity ratings, duplicate alerts, and automated department routing recommendations.

3. **Geospatial Duplicate Prevention Engine**:
   - Haversine distance proximity algorithm preventing duplicate municipal dispatch by clustering complaints reported within 500 meters of an active ticket.

4. **Speech-to-Text Voice Recorder**:
   - Native Web Audio API voice note recorder with live animated sound wave frequency bars and AI transcription.

5. **Multi-Role Experience**:
   - **Citizen Hub**: Issue reporting dropzone, live resolution timeline (Submitted → AI Verified → Assigned → In Progress → Completed), citizen reward points leaderboard.
   - **City Command Center (Admin)**: Executive Recharts analytics, weekly resolution trend lines, department SLA compliance meters, AI triage accuracy score (96.8%), PDF/CSV export tools.
   - **Department Officer Dashboard**: Triage matrix for PWD, Solid Waste, Water, and Electrical boards, SLA countdowns, worker assignment modal.
   - **Field Worker Mobile View**: Assigned task queue, turn-by-turn GPS navigation link, before/after repair photo verification workflow.

---

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Leaflet GIS, Recharts, Lucide Icons.
- **Backend**: Python FastAPI, SQLAlchemy, Pydantic, Uvicorn, PyJWT.
- **AI Engine**: YOLOv8 Vision Model simulation, Haversine Geospatial Duplicate Clustering, Severity Matrix Ranker.
- **Deployment**: Docker, Docker Compose, Nginx.

---

## How to Run Locally

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Open Swagger API docs at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Docker Production Deployment
```bash
cd deployment
docker-compose up --build -d
```
