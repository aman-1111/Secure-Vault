import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [savedPassword, setSavedPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate authentication delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!savedPassword) {
      // First time user — save password
      setSavedPassword(password);
      onLogin();
    } else if (savedPassword === password) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <style>
        {`
          .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
          
          .login-card {
            background: rgba(33, 37, 41, 0.95);
            border: 1px solid rgba(108, 117, 125, 0.3);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 100%;
          }
          
          .vault-logo {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #6f42c1 0%, #0d6efd 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 1rem;
            box-shadow: 0 8px 25px rgba(111, 66, 193, 0.3);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: bold;
          }
          
          .form-control:focus {
            border-color: #6f42c1;
            box-shadow: 0 0 0 0.2rem rgba(111, 66, 193, 0.25);
          }
          
          .btn-gradient {
            background: linear-gradient(135deg, #6f42c1 0%, #0d6efd 100%);
            border: none;
            transition: all 0.3s ease;
          }
          
          .btn-gradient:hover {
            background: linear-gradient(135deg, #5a2d91 0%, #0b5ed7 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(111, 66, 193, 0.3);
          }
          
          .btn-gradient:disabled {
            background: #6c757d;
            transform: none;
            box-shadow: none;
          }
          
          .spinner-border-sm {
            width: 1rem;
            height: 1rem;
          }
          
          .security-feature {
            font-size: 0.875rem;
            color: #adb5bd;
            margin-bottom: 0.5rem;
          }
          
          .security-feature .text-success {
            color: #198754 !important;
          }
          
          .alert-custom {
            border-radius: 10px;
            border: none;
          }
          
          .alert-danger-custom {
            background: rgba(220, 53, 69, 0.1);
            color: #f5c6cb;
            border: 1px solid rgba(220, 53, 69, 0.3);
          }
          
          .alert-info-custom {
            background: rgba(13, 110, 253, 0.1);
            color: #b6d4fe;
            border: 1px solid rgba(13, 110, 253, 0.3);
          }
          
          .password-indicator {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #198754;
          }
          
          .position-relative {
            position: relative;
          }
        `}
      </style>
      
      <div className="login-container text-light">
        <div className="login-card p-4">
          {/* Logo/Header */}
          <div className="text-center mb-4">
            <div className="vault-logo">
              <span>🔐</span>
            </div>
            <h2 className="gradient-text mb-2">Secure Vault</h2>
            <p className="text-muted">Enter your password to access your vault</p>
          </div>
          
          {/* Login Form */}
          <div className="mb-3">
            <div className="position-relative">
              <input
                type="password"
                className="form-control form-control-lg bg-dark text-light border-secondary"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              {password && (
                <div className="password-indicator">
                  <span>●</span>
                </div>
              )}
            </div>
          </div>
          
          {error && (
            <div className="alert alert-custom alert-danger-custom d-flex align-items-center mb-3">
              <span className="me-2">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          
          <button
            onClick={handleLogin}
            disabled={!password.trim() || isLoading}
            className="btn btn-gradient btn-lg w-100 text-light d-flex align-items-center justify-content-center"
          >
            {isLoading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span className="me-2">🔓</span>
                <span>Unlock Vault</span>
              </>
            )}
          </button>
          
          {!savedPassword && (
            <div className="alert alert-custom alert-info-custom d-flex align-items-center mt-3">
              <span className="me-2">💡</span>
              <small>First time? Your password will be saved for this session.</small>
            </div>
          )}

          {/* Security Features */}
          <div className="mt-4 pt-3 border-top border-secondary">
            <h6 className="text-light mb-3">Security Features</h6>
            <div className="security-feature d-flex align-items-center">
              <span className="text-success me-2">●</span>
              <span>Session-only password storage</span>
            </div>
            <div className="security-feature d-flex align-items-center">
              <span className="text-success me-2">●</span>
              <span>No data persistence beyond session</span>
            </div>
            <div className="security-feature d-flex align-items-center">
              <span className="text-success me-2">●</span>
              <span>Secure client-side authentication</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;