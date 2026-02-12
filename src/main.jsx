import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-pink-50 px-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-pink-200 p-6 text-center">
            <h1 className="text-2xl font-bold text-pink-600 mb-3">Something went wrong 💔</h1>
            <p className="text-gray-700 mb-5">Tap reload to continue your surprise.</p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-full font-bold"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
)
