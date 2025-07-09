import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebookF,
  faApple
} from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

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
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('Attempting to register with:', formData.email);
        await register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        });

        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Registration error:', error);
        let errorMessage = 'Registration failed';

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
                <h1 className="fw-bold text-responsive-xl">Create Account</h1>
                <p className="text-muted text-responsive">Join our learning community today</p>
              </div>
              
              {/* Social Signup Options */}
              <div className="mb-4">
                <div className="d-grid gap-2 mb-3">
                  <button className="btn btn-outline-secondary">
                    <FontAwesomeIcon icon={faGoogle} className="me-2" />
                    <span className="d-none d-sm-inline">Sign up with </span>Google
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
              
              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3 mb-mobile-2">
                  <label htmlFor="fullName" className="form-label text-responsive">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                  </div>
                </div>
                
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
                  <label htmlFor="password" className="form-label text-responsive">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
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
                  <small className="form-text text-muted text-responsive">Must be at least 8 characters long</small>
                </div>
                
                <div className="mb-3 mb-mobile-2">
                  <label htmlFor="confirmPassword" className="form-label text-responsive">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn password-toggle-btn"
                      data-password-visible={showConfirmPassword}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      <FontAwesomeIcon 
                        icon={showConfirmPassword ? faEyeSlash : faEye} 
                        className="text-muted"
                      />
                    </button>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>
                
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label text-responsive" htmlFor="agreeTerms">
                    I agree to the <Link to="/terms" className="text-decoration-none">Terms of Service</Link> and <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                  </label>
                  {errors.agreeTerms && <div className="invalid-feedback">{errors.agreeTerms}</div>}
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mb-4 text-responsive" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
                
                <div className="text-center">
                  <p className="text-responsive">Already have an account? <Link to="/login" className="text-decoration-none">Log In</Link></p>
                </div>
                {errors.general && <div className="alert alert-danger text-responsive">{errors.general}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;