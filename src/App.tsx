import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Admin Pages
import { DashboardPage } from './pages/admin/DashboardPage';
import { EnquiriesPage } from './pages/admin/EnquiriesPage';
import { EnquiryFormPage } from './pages/admin/EnquiryFormPage';
import { ClientsPage } from './pages/admin/ClientsPage';
import { StaffPage } from './pages/admin/StaffPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { SetupPage } from './pages/admin/SetupPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="enquiries" element={<EnquiriesPage />} />
                <Route path="enquiry-form" element={<EnquiryFormPage />} />
                <Route path="clients" element={<ClientsPage />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="setup" element={<SetupPage />} />
              </Route>

              {/* Default Redirects */}
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;