import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { logError } from './firebase'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' };
  }
  componentDidCatch(error, errorInfo) {
    // Log to Firebase with more context
    logError(error, {
      ...errorInfo,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      const errorMsg = encodeURIComponent(`Error pada BINUS B29 UAS Prep:\n${this.state.errorMessage}\n\nURL: ${window.location.href}`);
      return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#111827', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Oups, Terjadi Kesalahan</h1>
          <p style={{ color: '#9CA3AF', marginBottom: '20px' }}>Aplikasi mengalami kendala. Laporan error telah dikirim ke admin.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', cursor: 'pointer', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>Refresh Halaman</button>
            <a href={`https://wa.me/6287839256171?text=${errorMsg}`} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', cursor: 'pointer', background: '#22C55E', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>💬 Hubungi Admin</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
