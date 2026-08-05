import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { IssueProvider } from './context/IssueContext';

import { Navbar } from './components/common/Navbar';
import { CustomCursor } from './components/common/CustomCursor';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { OfficerDashboard } from './pages/OfficerDashboard';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { MapPage } from './pages/MapPage';

// Protected Route Wrapper based on Role
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole: 'citizen' | 'officer' | 'worker' }> = ({
  children,
  allowedRole
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser?.role !== allowedRole) return <Navigate to={`/dashboard/${currentUser?.role}`} replace />;
  return <>{children}</>;
};

export function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <Router>
          <div className="relative min-h-screen bg-[#080C14] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Header Navbar */}
            <Navbar />

            {/* Direct Page Routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* 3 Dedicated Role Dashboards */}
              <Route
                path="/dashboard/citizen"
                element={
                  <ProtectedRoute allowedRole="citizen">
                    <CitizenDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/officer"
                element={
                  <ProtectedRoute allowedRole="officer">
                    <OfficerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/worker"
                element={
                  <ProtectedRoute allowedRole="worker">
                    <WorkerDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/report" element={<ReportIssuePage />} />
              <Route path="/digital-twin" element={<DigitalTwinPage />} />
              <Route path="/map" element={<MapPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </IssueProvider>
    </AuthProvider>
  );
}

export default App;
