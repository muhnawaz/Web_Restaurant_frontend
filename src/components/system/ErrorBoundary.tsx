// src/components/system/ErrorBoundary.tsx
import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: any) { console.error(err); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <p className="text-white/70">Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
