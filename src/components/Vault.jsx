import React, { useState, useEffect } from 'react';

const Vault = ({ onLogout }) => {
  const [message, setMessage] = useState('');
  const [savedMsg, setSavedMsg] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [saveAnimation, setSaveAnimation] = useState(false);

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const savedMessage = sessionStorage.getItem('vault_savedMsg');
    const savedTimestamp = sessionStorage.getItem('vault_lastSaved');
    
    if (savedMessage) {
      setSavedMsg(savedMessage);
    }
    
    if (savedTimestamp) {
      setLastSaved(new Date(savedTimestamp));
    }
  }, []);

  // Typing indicator
  useEffect(() => {
    if (message && message !== savedMsg) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message, savedMsg]);

  const handleSave = () => {
    const timestamp = new Date();
    
    // Save to state
    setSavedMsg(message);
    setLastSaved(timestamp);
    setMessage('');
    
    // Persist to sessionStorage
    sessionStorage.setItem('vault_savedMsg', message);
    sessionStorage.setItem('vault_lastSaved', timestamp.toISOString());
    
    // Show animation
    setSaveAnimation(true);
    setTimeout(() => setSaveAnimation(false), 2000);
  };

  const handleClear = () => {
    // Clear state
    setSavedMsg('');
    setLastSaved(null);
    
    // Clear from sessionStorage
    sessionStorage.removeItem('vault_savedMsg');
    sessionStorage.removeItem('vault_lastSaved');
  };

  const handleEdit = () => {
    setMessage(savedMsg);
    setSavedMsg('');
    setLastSaved(null);
    
    // Clear from sessionStorage when editing
    sessionStorage.removeItem('vault_savedMsg');
    sessionStorage.removeItem('vault_lastSaved');
  };

  const formatTimestamp = (date) => {
    return date ? date.toLocaleString() : '';
  };

  const getCharacterCount = () => {
    return message.length;
  };

  const getWordCount = () => {
    return message.trim() ? message.trim().split(/\s+/).length : 0;
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <style>
        {`
          .vault-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
            color: white;
            padding: 2rem 0;
          }
          
          .vault-header {
            background: rgba(33, 37, 41, 0.95);
            border: 1px solid rgba(108, 117, 125, 0.3);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            margin-bottom: 2rem;
          }
          
          .vault-logo {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #6f42c1 0%, #0d6efd 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(111, 66, 193, 0.3);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: bold;
          }
          
          .vault-card {
            background: rgba(33, 37, 41, 0.95);
            border: 1px solid rgba(108, 117, 125, 0.3);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            height: 100%;
          }
          
          .form-control:focus, .form-select:focus {
            border-color: #6f42c1;
            box-shadow: 0 0 0 0.2rem rgba(111, 66, 193, 0.25);
          }
          
          .btn-gradient-green {
            background: linear-gradient(135deg, #198754 0%, #20c997 100%);
            border: none;
            transition: all 0.3s ease;
          }
          
          .btn-gradient-green:hover {
            background: linear-gradient(135deg, #146c43 0%, #0d9488 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(25, 135, 84, 0.3);
          }
          
          .btn-gradient-blue {
            background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
            border: none;
            transition: all 0.3s ease;
          }
          
          .btn-gradient-blue:hover {
            background: linear-gradient(135deg, #0b5ed7 0%, #520dc2 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
          }
          
          .btn-gradient-yellow {
            background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
            border: none;
            color: #000;
            transition: all 0.3s ease;
          }
          
          .btn-gradient-yellow:hover {
            background: linear-gradient(135deg, #ffca2c 0%, #fd7e14 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
            color: #000;
          }
          
          .btn-gradient-red {
            background: linear-gradient(135deg, #dc3545 0%, #fd5e53 100%);
            border: none;
            transition: all 0.3s ease;
          }
          
          .btn-gradient-red:hover {
            background: linear-gradient(135deg, #bb2d3b 0%, #dc3545 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
          }
          
          .btn:disabled {
            transform: none !important;
            box-shadow: none !important;
          }
          
          .saved-message {
            background: linear-gradient(135deg, #495057 0%, #6c757d 100%);
            border-left: 4px solid #6f42c1;
            border-radius: 10px;
            box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .empty-vault {
            text-align: center;
            padding: 4rem 2rem;
            opacity: 0.7;
          }
          
          .empty-vault-icon {
            font-size: 5rem;
            margin-bottom: 1rem;
          }
          
          .typing-indicator {
            animation: pulse 1s infinite;
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          .save-animation {
            animation: slideInRight 0.5s ease-out;
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .security-card {
            background: rgba(33, 37, 41, 0.95);
            border: 1px solid rgba(108, 117, 125, 0.3);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            margin-top: 2rem;
          }
          
          .security-item {
            background: rgba(73, 80, 87, 0.8);
            border-radius: 10px;
            padding: 1rem;
            height: 100%;
          }
          
          .text-success-custom {
            color: #20c997 !important;
          }
          
          .text-muted-custom {
            color: #adb5bd !important;
          }

          .persistence-indicator {
            background: rgba(32, 201, 151, 0.1);
            border: 1px solid rgba(32, 201, 151, 0.3);
            border-radius: 8px;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        `}
      </style>
      
      <div className="vault-container">
        <div className="container">
          {/* Header */}
          <div className="vault-header p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center">
                  <div className="vault-logo me-3">
                    <span>🔐</span>
                  </div>
                  <div>
                    <h1 className="gradient-text mb-1">Secure Vault</h1>
                    <p className="text-muted mb-0">Your private message storage</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-md-end justify-content-start mt-3 mt-md-0">
                  {saveAnimation && (
                    <div className="alert alert-success d-flex align-items-center me-3 mb-0 py-2 px-3 save-animation">
                      <span className="me-2">✓</span>
                      <small>Saved!</small>
                    </div>
                  )}
                  <div className="persistence-indicator me-3">
                    <span className="text-success-custom me-1">💾</span>
                    <small className="text-success-custom">Session Persistent</small>
                  </div>
                  <button
                    onClick={onLogout}
                    className="btn btn-gradient-red d-flex align-items-center"
                  >
                    <span className="me-2">🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Message Input Section */}
            <div className="col-xl-6 mb-4">
              <div className="vault-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <span className="me-2" style={{fontSize: '1.25rem'}}>✍️</span>
                    <h4 className="mb-0">Compose Message</h4>
                  </div>
                  <div className="text-end">
                    {isTyping && (
                      <div className="d-flex align-items-center mb-1">
                        <span className="text-primary typing-indicator me-2">●</span>
                        <small className="text-primary">Typing...</small>
                      </div>
                    )}
                    <div className="text-muted">
                      <small>{getCharacterCount()}/1000 chars</small>
                    </div>
                    <div className="text-muted">
                      <small>{getWordCount()} words</small>
                    </div>
                  </div>
                </div>
                
                <textarea
                  className="form-control bg-dark text-light border-secondary mb-4"
                  rows="8"
                  placeholder="Write your confidential message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  style={{resize: 'none'}}
                />
                
                <div className="d-flex flex-wrap gap-2">
                  <button
                    onClick={handleSave}
                    disabled={!message.trim()}
                    className="btn btn-gradient-green text-light d-flex align-items-center"
                  >
                    <span className="me-2">💾</span>
                    <span>Save Securely</span>
                  </button>
                  
                  <button
                    onClick={() => setMessage('')}
                    disabled={!message}
                    className="btn btn-secondary d-flex align-items-center"
                  >
                    <span className="me-2">🗑️</span>
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Message Section */}
            <div className="col-xl-6 mb-4">
              <div className="vault-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <span className="me-2" style={{fontSize: '1.25rem'}}>🔒</span>
                    <h4 className="mb-0">Vault Storage</h4>
                  </div>
                  {lastSaved && (
                    <div className="d-flex align-items-center">
                      <span className="text-success me-2">✓</span>
                      <small className="text-success">Secured & Persistent</small>
                    </div>
                  )}
                </div>
                
                {savedMsg ? (
                  <div>
                    <div className="saved-message p-3 mb-3">
                      <p className="mb-0" style={{whiteSpace: 'pre-wrap', lineHeight: '1.6'}}>
                        {savedMsg}
                      </p>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="text-muted">
                        {lastSaved && (
                          <small className="d-flex align-items-center">
                            <span className="me-1">🕒</span>
                            Saved: {formatTimestamp(lastSaved)}
                          </small>
                        )}
                      </div>
                      <div className="text-muted">
                        <small>{savedMsg.length} characters</small>
                      </div>
                    </div>
                    
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        onClick={handleEdit}
                        className="btn btn-gradient-blue text-light d-flex align-items-center"
                      >
                        <span className="me-2">✏️</span>
                        <span>Edit</span>
                      </button>
                      
                      <button
                        onClick={handleClear}
                        className="btn btn-gradient-yellow d-flex align-items-center"
                      >
                        <span className="me-2">🗑️</span>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="empty-vault">
                    <div className="empty-vault-icon">🔒</div>
                    <h5 className="text-muted">Vault is Empty</h5>
                    <p className="text-muted-custom">
                      Your saved messages will appear here securely and persist across page reloads
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Security Information Panel */}
          <div className="security-card p-4">
            <div className="d-flex align-items-center mb-4">
              <span className="me-3" style={{fontSize: '1.5rem'}}>🛡️</span>
              <h4 className="mb-0">Security & Privacy</h4>
            </div>
            
            <div className="row">
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="security-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-success-custom me-2">🔐</span>
                    <strong>Session Persistent</strong>
                  </div>
                  <small className="text-muted-custom">Data survives page reloads during session</small>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="security-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-success-custom me-2">👁️</span>
                    <strong>No Tracking</strong>
                  </div>
                  <small className="text-muted-custom">No permanent data collection</small>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="security-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-success-custom me-2">🔒</span>
                    <strong>Local Storage</strong>
                  </div>
                  <small className="text-muted-custom">Data stored locally in browser</small>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-3 mb-3">
                <div className="security-item">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-success-custom me-2">⚡</span>
                    <strong>Auto-Restore</strong>
                  </div>
                  <small className="text-muted-custom">Messages restored on page load</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vault;