import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebookF,
  faApple
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error on change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('Attempting to login with:', formData.email);
        await login({
          email: formData.email,
          password: formData.password
        }, formData.rememberMe);

        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed';

        if (error.message) {
          errorMessage = error.message;
        }

        setErrors({ general: errorMessage });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container-fluid py-5 py-mobile-3">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5 px-mobile-2">
              <div className="auth-heading mb-4 text-center text-md-start">
                <h1 className="fw-bold text-responsive-xl">Welcome Back!</h1>
                <p className="text-muted text-responsive">Login to continue learning</p>
              </div>
              
              {/* Social Login Options */}
              <div className="mb-4">
                <div className="d-grid gap-2 mb-3">
                  <button className="btn btn-outline-secondary">
                    <FontAwesomeIcon icon={faGoogle} className="me-2" />
                    <span className="d-none d-sm-inline">Continue with </span>Google
                  </button>
                </div>
                <div className="d-flex gap-2 social-buttons-row">
                  <button className="btn btn-outline-secondary flex-fill">
                    <FontAwesomeIcon icon={faFacebookF} className="me-1 me-sm-2" />
                    <span className="d-none d-md-inline">Facebook</span>
                    <span className="d-md-none">FB</span>
                  </button>
                  <button className="btn btn-outline-secondary flex-fill">
                    <FontAwesomeIcon icon={faApple} className="me-1 me-sm-2" />
                    Apple
                  </button>
                </div>
              </div>
              
              <div className="separator d-flex align-items-center my-4">
                <span className="line flex-grow-1"></span>
                <span className="mx-3 text-muted">or</span>
                <span className="line flex-grow-1"></span>
              </div>
              
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3 mb-mobile-2">
                  <label htmlFor="email" className="form-label text-responsive">Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
                
                <div className="mb-3 mb-mobile-2">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label htmlFor="password" className="form-label text-responsive mb-0">Password</label>
                    <Link to="/forgot-password" className="small text-decoration-none">Forgot password?</Link>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn password-toggle-btn"
                      data-password-visible={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <FontAwesomeIcon 
                        icon={showPassword ? faEyeSlash : faEye} 
                        className="text-muted"
                      />
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>
                
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mb-4" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log In'}
                </button>
                
                {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                
                <div className="text-center">
                  <p>Don't have an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;