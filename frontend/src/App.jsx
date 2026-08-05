import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ChatPage from './pages/ChatPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ConversationsPage from './pages/ConversationsPage';
import ConversationDetailsPage from './pages/ConversationDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import OnboardedRoute from './routes/OnboardedRoute';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.95)',
            color: '#1E1B2E',
            fontSize: '14px',
            boxShadow: '0 8px 32px rgba(76,56,158,0.16)'
          }
        }}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />

          <Route element={<OnboardedRoute />}>
            <Route path="/chat" element={<PageTransition><ChatPage /></PageTransition>} />
          </Route>

          <Route path="/admin/login" element={<PageTransition><AdminLoginPage /></PageTransition>} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/conversations" element={<ConversationsPage />} />
              <Route path="/admin/conversations/:id" element={<ConversationDetailsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
