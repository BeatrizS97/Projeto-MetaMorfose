// src/pages/Dashboard/components/StatsCard.jsx
import './StatsCard.css';

export const StatsCard = ({ icon, title, value, color, trend }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-icon">{icon}</div>
      <div className="stats-card-content">
        <h4>{title}</h4>
        <div className="stats-card-value">{value}</div>
        <span className="stats-card-trend">{trend}</span>
      </div>
    </div>
  );
};