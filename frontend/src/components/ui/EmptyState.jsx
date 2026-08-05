export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-brand-gradient-soft flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-violet-600 dark:text-violet-300" />
        </div>
      )}
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm text-ink-500 dark:text-ink-300 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
