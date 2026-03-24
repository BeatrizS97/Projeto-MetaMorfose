// src/components/common/Input/Input.jsx
import './Input.css';

export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-container ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-field ${icon ? 'with-icon' : ''} ${error ? 'error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};