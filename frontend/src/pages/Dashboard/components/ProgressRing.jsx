// src/pages/Dashboard/components/ProgressRing.jsx
export const ProgressRing = ({ percentage, size = 200 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="50%" stopColor="#C44BF0" />
          <stop offset="100%" stopColor="#667EEA" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#f0f0f0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#progress-gradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      
      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.3em"
        fontSize="3rem"
        fontWeight="900"
        fill="url(#progress-gradient)"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};