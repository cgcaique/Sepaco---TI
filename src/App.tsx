import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { useAuth } from './providers/AuthProvider';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { PendingApproval } from './pages/PendingApproval';
import { ClientDashboard } from './pages/ClientDashboard';
import { CreateJob } from './pages/CreateJob';
import { JobsList } from './pages/JobsList';
import { JobProposals } from './pages/JobProposals';
import { Marketplace } from './pages/Marketplace';
import { ProfessionalProfile } from './pages/ProfessionalProfile';
import { BookingRequest } from './pages/BookingRequest';
import { ProfessionalDashboard } from './pages/ProfessionalDashboard';
import { Availability } from './pages/Availability';
import { ChatThread } from './pages/ChatThread';
import { AdminReview } from './pages/AdminReview';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, profile } = useAuth();
  if (loading) {
    return <div className="p-10 text-sm text-slate-500">Carregando...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (profile?.role === 'profissional' && profile.status_verificacao !== 'approved') {
    return <PendingApproval />;
  }
  return <>{children}</>;
};

const DashboardRouter = () => {
  const { profile } = useAuth();
  if (profile?.role === 'profissional') {
    return <ProfessionalDashboard />;
  }
  if (profile?.role === 'admin') {
    return <AdminReview />;
  }
  return <ClientDashboard />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pending" element={<PendingApproval />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppShell>
              <DashboardRouter />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/cards"
        element={
          <ProtectedRoute>
            <AppShell>
              <JobsList />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/cards/novo"
        element={
          <ProtectedRoute>
            <AppShell>
              <CreateJob />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/cards/propostas"
        element={
          <ProtectedRoute>
            <AppShell>
              <JobProposals />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <AppShell>
              <Marketplace />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace/:id"
        element={
          <ProtectedRoute>
            <AppShell>
              <ProfessionalProfile />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <AppShell>
              <BookingRequest />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profissional/disponibilidade"
        element={
          <ProtectedRoute>
            <AppShell>
              <Availability />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <AppShell>
              <ChatThread />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AppShell>
              <AdminReview />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
