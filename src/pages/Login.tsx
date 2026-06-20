import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin' || password === 'sannidhi') {
      localStorage.setItem('authenticated', 'true');
      onLogin();
      navigate('/');
    } else if (password.trim() === '') {
      setError('Please enter your password');
    } else {
      setError('Incorrect password. Hint: admin');
    }
  };

  return (
    <div className="login-container flex min-h-screen w-full items-center justify-center p-4">
      <style>{`
        .login-container {
          background-image: url('/login_bg.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          font-family: 'Epigram', Georgia, serif;
        }

        /* Centered parchment card */
        .login-card {
          width: 100%;
          max-width: 400px;
          background: rgba(246, 236, 222, 0.95);
          border: 1.5px solid #5c3e16;
          border-radius: 1.25rem;
          padding: 2.25rem 2rem;
          box-shadow: 0 20px 50px rgba(44, 27, 7, 0.45);
          position: relative;
          text-align: center;
        }

        /* Rounded inner double border */
        .login-card::after {
          content: '';
          position: absolute;
          inset: 5px;
          border: 1px solid #9c7f5c;
          border-radius: 1rem;
          pointer-events: none;
          opacity: 0.65;
        }

        .login-logo-wrap {
          position: relative;
          width: 110px;
          height: 110px;
          margin: 0 auto 0.75rem;
          border-radius: 50%;
          border: 1.5px solid #5c3e16;
          background: #fdfaf5;
          overflow: hidden;
          padding: 2px;
          box-shadow: inset 0 2px 8px rgba(92, 62, 22, 0.15);
        }

        .login-logo {
          width: 100%;
          height: 100%;
          object-cover: cover;
          border-radius: 50%;
        }

        .login-title {
          font-size: 1.85rem;
          font-weight: 600;
          color: #2c1b07;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .login-subtitle {
          font-size: 0.78rem;
          color: #5c442c;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
        }

        .login-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.5rem 0 1.25rem;
          color: #8c7257;
        }

        .login-input-wrap {
          position: relative;
          margin-bottom: 1rem;
        }

        .login-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 2.5rem;
          border-radius: 0.6rem;
          border: 1px solid #a38c72;
          background: #ebd8c0;
          color: #2c1b07;
          font-size: 0.85rem;
          font-weight: 500;
          outline: none;
          transition: border-color 150ms, box-shadow 150ms;
        }

        .login-input::placeholder {
          color: #8c755c;
        }

        .login-input:focus {
          border-color: #5c3e16;
          box-shadow: 0 0 0 3px rgba(92, 62, 22, 0.1);
        }

        .login-btn {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.6rem;
          background: linear-gradient(to bottom, #a0723e, #623e16);
          border: 1px solid #4a2e0e;
          color: #fcf8f2;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 150ms;
          box-shadow: 0 4px 10px rgba(98, 62, 22, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .login-btn:hover {
          background: linear-gradient(to bottom, #b0814c, #70471c);
          box-shadow: 0 6px 14px rgba(98, 62, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .login-btn:active {
          background: linear-gradient(to bottom, #8f6131, #553511);
          transform: translateY(0);
        }

        .login-error {
          font-size: 0.75rem;
          color: #a82516;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
      `}</style>

      <div className="login-card z-10">
        {/* Temple logo circle */}
        <div className="login-logo-wrap">
          <img src="/logo.jpg" alt="Sannidhi Temple Logo" className="login-logo" />
        </div>

        {/* Ornate Diya scroll decoration */}
        <div className="flex justify-center -mt-1 mb-2 text-[#5c3e16] fill-current">
          <svg viewBox="0 0 100 20" className="w-24">
            <path d="M50,2 C52,2 53,6 50,9 C47,6 48,2 50,2 Z" fill="#d8aa4a" /> {/* Flame */}
            <path d="M45,9 C45,12 55,12 55,9 C55,7 45,7 45,9 Z" /> {/* Bowl */}
            <path d="M48,12 L52,12 L50,14 Z" /> {/* Base */}
            <path d="M42,10 C36,7 30,11 24,10 C18,9 15,6 10,9" fill="none" stroke="#5c3e16" strokeWidth="0.8" /> {/* Left scroll */}
            <path d="M58,10 C64,7 70,11 76,10 C82,9 85,6 90,9" fill="none" stroke="#5c3e16" strokeWidth="0.8" /> {/* Right scroll */}
            <circle cx="11" cy="10" r="0.8" />
            <circle cx="89" cy="10" r="0.8" />
          </svg>
        </div>

        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Enter your password to continue</p>

        <form onSubmit={handleLogin}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-input-wrap">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c755c]">
              <Lock size={15} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c755c] hover:text-[#5c3e16] transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        {/* Ornate Diya scroll bottom decoration */}
        <div className="flex justify-center mt-5 text-[#5c3e16] fill-current">
          <svg viewBox="0 0 100 20" className="w-24">
            <path d="M50,2 C52,2 53,6 50,9 C47,6 48,2 50,2 Z" fill="#d8aa4a" /> {/* Flame */}
            <path d="M45,9 C45,12 55,12 55,9 C55,7 45,7 45,9 Z" /> {/* Bowl */}
            <path d="M48,12 L52,12 L50,14 Z" /> {/* Base */}
            <path d="M42,10 C36,7 30,11 24,10 C18,9 15,6 10,9" fill="none" stroke="#5c3e16" strokeWidth="0.8" /> {/* Left scroll */}
            <path d="M58,10 C64,7 70,11 76,10 C82,9 85,6 90,9" fill="none" stroke="#5c3e16" strokeWidth="0.8" /> {/* Right scroll */}
            <circle cx="11" cy="10" r="0.8" />
            <circle cx="89" cy="10" r="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}
