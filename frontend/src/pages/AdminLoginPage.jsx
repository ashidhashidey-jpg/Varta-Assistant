import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Lock, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAdmin } from '../context/AdminContext';

export default function AdminLoginPage() {
  const { login, isLoading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { password: '' } });

  const redirectTo = location.state?.from?.pathname || '/admin/dashboard';

  const onSubmit = async ({ password }) => {
    const ok = await login(password);
    if (ok) {
      toast.success('Welcome back, admin.');
      navigate(redirectTo, { replace: true });
    } else {
      toast.error('Incorrect password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-light dark:bg-base-dark px-4">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-ink-500 dark:text-ink-300 hover:text-violet-600">
        <ArrowLeft className="w-4 h-4" /> Back home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-sm p-8"
      >
        <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5 shadow-glow-violet">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-1.5">Admin portal</h1>
        <p className="text-sm text-ink-500 dark:text-ink-300 mb-7">
          Enter the dashboard password to view analytics and conversations.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="password" className="label-text block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-field pl-10 pr-10"
                {...register('password', { required: 'A password is required.' })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1.5">{errors.password.message}</p>}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            {!isLoading && 'Log in'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
