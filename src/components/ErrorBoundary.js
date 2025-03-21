import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error in FaceRecognition:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2 style={{ color: "red" }}>Something went wrong. Please try again.</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
