import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CivicAI Uncaught Error:', error, errorInfo);
  }

  public handleReset = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#080C14] text-white">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 text-center space-y-6 shadow-glowCyan">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white font-display">CivicAI App Reset</h2>
              <p className="text-xs text-slate-400 font-mono">
                Click below to clear cached session state and launch CivicAI Operating System.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3.5 px-6 rounded-2xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-glowCyan flex items-center justify-center gap-2 hover:bg-cyan-400"
            >
              <RefreshCw className="w-4 h-4" /> Reset Session & Launch App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
