import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Optionally log to external service here
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex h-screen flex-col items-center justify-center bg-gray-100 text-center px-4'>
          <h1 className='text-4xl font-bold text-red-600 mb-4'>
            Something went wrong.
          </h1>
          <p className='text-gray-700 mb-6'>
            {this.state.error?.message || "An unexpected error has occurred."}
          </p>
          <button
            onClick={this.handleReload}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
