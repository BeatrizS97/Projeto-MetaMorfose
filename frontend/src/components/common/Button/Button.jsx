// src/components/common/Button/Button.jsx
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon,
  disabled,
  loading,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {!loading && icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};