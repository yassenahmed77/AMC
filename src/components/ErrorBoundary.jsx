import { Component } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center font-sans">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-xl space-y-6">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={36} />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                Unexpected Issue Occurred
              </h1>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                An isolated glitch occurred. Your application data and cart items remain safe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-maincolor text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                <Home size={14} />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
