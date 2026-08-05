import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Sparkles, User, Briefcase, Target, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useVisitor } from '../context/VisitorContext';
import { onboardVisitor } from '../services/widgetService';
import { notifyApiError } from '../services/api';

const PROFESSIONS = ['Student', 'Job Seeker', 'Working Engineer', 'Freelancer', 'Other'];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { saveVisitor } = useVisitor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { name: '', profession: '', goal: '' } });

  const profession = watch('profession');

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const data = await onboardVisitor(values);
      saveVisitor({
        visitorId: data.visitorId,
        conversationId: data.conversationId,
        visitorName: data.visitorName || values.name
      });
      toast.success(`Welcome, ${data.visitorName || values.name}!`);
      navigate('/chat');
    } catch (error) {
      notifyApiError(error, 'Could not start your session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-light dark:bg-base-dark px-4 py-10">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-ink-500 dark:text-ink-300 hover:text-violet-600">
        <ArrowLeft className="w-4 h-4" /> Back home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-md p-8"
      >
        <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5 shadow-glow-violet">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-1.5">Let's personalize Varta for you</h1>
        <p className="text-sm text-ink-500 dark:text-ink-300 mb-7">
          Three quick details — that's all it takes before you start chatting.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="label-text block mb-1.5">
              Your name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
              <input
                id="name"
                type="text"
                placeholder="e.g. Ananya Rao"
                className="input-field pl-10"
                {...register('name', { required: 'Please share your name.', minLength: { value: 2, message: 'That name looks too short.' } })}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-500 mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="profession" className="label-text block mb-1.5">
              Profession
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300 z-10" />
              <select
                id="profession"
                className="input-field pl-10 appearance-none"
                {...register('profession', { required: 'Please choose your profession.' })}
              >
                <option value="">Select one…</option>
                {PROFESSIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            {errors.profession && <p className="text-xs text-rose-500 mt-1.5">{errors.profession.message}</p>}
          </div>

          <div>
            <label htmlFor="goal" className="label-text block mb-1.5">
              What's your goal right now?
            </label>
            <div className="relative">
              <Target className="absolute left-3.5 top-3.5 w-4 h-4 text-ink-300" />
              <textarea
                id="goal"
                rows={3}
                placeholder="e.g. Crack SDE interviews in the next 2 months"
                className="input-field pl-10 resize-none"
                {...register('goal', { required: 'Tell Varta what you\'re working towards.', minLength: { value: 4, message: 'A little more detail helps Varta personalize answers.' } })}
              />
            </div>
            {errors.goal && <p className="text-xs text-rose-500 mt-1.5">{errors.goal.message}</p>}
          </div>

          <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
            {!isSubmitting && (
              <>
                Start chatting <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
