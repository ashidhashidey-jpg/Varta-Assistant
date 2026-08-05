import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Top-level error boundary. Catches render errors anywhere below it so a
 * single broken page can't take down the whole app with a blank white screen.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Centralized place to wire up real error reporting later.
    console.error('[ErrorBoundary] Caught render error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.assign('/');
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh-light dark:bg-base-dark px-6">
        <div className="glass-card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-brand-gradient-soft flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-violet-600 dark:text-violet-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Something broke on this page</h2>
          <p className="text-sm text-ink-500 dark:text-ink-300 mb-6">
            Varta hit an unexpected error. Your conversation history is safe — try reloading.
          </p>
          <button onClick={this.handleReload} className="btn-primary w-full">
            Reload Varta Assistant
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
