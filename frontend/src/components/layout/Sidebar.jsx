import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessagesSquare, LogOut, Sparkles } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/conversations', label: 'Conversations', icon: MessagesSquare }
];

export default function Sidebar() {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="hidden md:flex md:w-64 flex-col gap-1 p-5 border-r border-ink-100 dark:border-white/10 h-screen sticky top-0">
      <div className="flex items-center gap-2 font-display font-bold text-lg mb-8 px-2">
        <span className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </span>
        Varta Admin
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-gradient-soft text-violet-700 dark:text-violet-300'
                  : 'text-ink-500 dark:text-ink-300 hover:bg-violet-50 dark:hover:bg-white/5'
              )
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-ink-500 dark:text-ink-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </aside>
  );
}
