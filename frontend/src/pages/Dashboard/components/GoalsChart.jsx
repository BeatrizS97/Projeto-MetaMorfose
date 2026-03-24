// src/pages/Dashboard/components/GoalsChart.jsx
import './GoalsChart.css';

// Ícones personalizados inline para categorias
const PersonalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="url(#personal-grad)" strokeWidth="2" fill="none"/>
    <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" stroke="url(#personal-grad)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="personal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
  </svg>
);

const CareerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M8 7V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V7M4 7H20C20.5523 7 21 7.44772 21 8V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V8C3 7.44772 3.44772 7 4 7Z" 
          stroke="url(#career-grad)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="career-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#FFA500"/>
      </linearGradient>
    </defs>
  </svg>
);

export const GoalsChart = ({ stats }) => {
  const personal = stats?.byCategory?.personal || 0;
  const career = stats?.byCategory?.career || 0;
  const total = personal + career;

  const personalPercentage = total > 0 ? (personal / total) * 100 : 0;
  const careerPercentage = total > 0 ? (career / total) * 100 : 0;

  return (
    <div className="goals-chart">
      <div className="chart-bars">
        <div className="chart-bar">
          <div className="chart-bar-label">
            <div className="label-with-icon">
              <PersonalIcon />
              <span>Pessoal</span>
            </div>
            <strong>{personal}</strong>
          </div>
          <div className="chart-bar-track">
            <div 
              className="chart-bar-fill personal" 
              style={{ width: `${personalPercentage}%` }}
            >
              <span className="bar-percentage">{Math.round(personalPercentage)}%</span>
            </div>
          </div>
        </div>

        <div className="chart-bar">
          <div className="chart-bar-label">
            <div className="label-with-icon">
              <CareerIcon />
              <span>Carreira</span>
            </div>
            <strong>{career}</strong>
          </div>
          <div className="chart-bar-track">
            <div 
              className="chart-bar-fill career" 
              style={{ width: `${careerPercentage}%` }}
            >
              <span className="bar-percentage">{Math.round(careerPercentage)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color personal"></span>
          <span>Pessoal: {Math.round(personalPercentage)}%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color career"></span>
          <span>Carreira: {Math.round(careerPercentage)}%</span>
        </div>
      </div>
    </div>
  );
};