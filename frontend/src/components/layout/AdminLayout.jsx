import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, MessagesSquare, Sparkles } from 'lucide-react';
import Sidebar from './Sidebar';
import ThemeToggle from '../ui/ThemeToggle';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/conversations', label: 'Conversations', icon: MessagesSquare }
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-base-light dark:bg-base-dark">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-ink-100 dark:border-white/10 sticky top-0 bg-base-light/90 dark:bg-base-dark/90 backdrop-blur-md z-30">
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="w-7 h-7 rounded-lg bg-brand-gradient flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </span>
            Varta Admin
          </div>
          <button onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu" className="p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {mobileOpen && (
          <div className="md:hidden border-b border-ink-100 dark:border-white/10 p-4 flex flex-col gap-1 bg-base-light dark:bg-base-dark">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium',
                    isActive ? 'bg-brand-gradient-soft text-violet-700' : 'text-ink-500 dark:text-ink-300'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
            <div className="flex items-center justify-between pt-2 px-3.5">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-rose-500"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="hidden md:flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
