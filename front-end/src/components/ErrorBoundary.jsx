// src/components/ErrorBoundary.jsx
import { Component } from 'react'; // <-- Missing import added here
import PropTypes from 'prop-types'; // For type checking

/**
 * Error boundary component to catch JavaScript errors in child components
 * - Logs errors to console
 * - Optionally integrates with Sentry
 * - Provides user-friendly fallback UI
 */
export default class ErrorBoundary extends Component {
  state = { 
    error: null,
    errorInfo: null 
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.func // Optional custom fallback render
  };

  static defaultProps = {
    fallback: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ 
      error,
      errorInfo: errorInfo.componentStack 
    });
    
    console.error('Component Error:', error, errorInfo);
    
    // Error tracking service integration
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, { 
        extra: errorInfo 
      });
    }
  }

  handleRetry = () => {
    this.setState({ error: null, errorInfo: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  renderFallback() {
    if (this.props.fallback) {
      return this.props.fallback({
        error: this.state.error,
        onRetry: this.handleRetry
      });
    }

    return (
      <div className="error-container p-4 text-center">
        <h3 className="text-lg font-medium text-red-600 mb-2">
          Something went wrong
        </h3>
        <button 
          onClick={this.handleRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm">
              Error Details (Dev Only)
            </summary>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {this.state.error?.toString()}
              {this.state.errorInfo && (
                <>
                  <div className="mt-2 font-semibold">Component Stack:</div>
                  {this.state.errorInfo}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    );
  }

  render() {
    if (this.state.error) {
      return this.renderFallback();
    }
    return this.props.children;
  }
}