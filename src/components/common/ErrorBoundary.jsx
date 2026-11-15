import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { console.error('UI error:', err); }
  render() {
    if (this.state.failed) {
      return this.props.silent ? null : (
        <div className="grid min-h-[60vh] place-items-center bg-espresso px-6 text-center text-ivory">
          <div>
            <p className="eyebrow">Something went wrong</p>
            <h1 className="display mt-4 text-4xl">We hit a snag loading this page.</h1>
            <button onClick={() => window.location.reload()} className="btn btn-gold mt-8">Reload page</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
