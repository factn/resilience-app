import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
    //
    // TODO hook up to raygun or similar
    // logErrorToService(error, errorINfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return "";
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
