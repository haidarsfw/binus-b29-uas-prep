import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { logError } from './firebase'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#111827', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Oups, Terjadi Kesalahan</h1>
          <p style={{ color: '#9CA3AF', marginBottom: '20px' }}>Aplikasi mengalami kendala. Laporan error telah dikirim ke admin.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', cursor: 'pointer', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>Refresh Halaman</button>
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
