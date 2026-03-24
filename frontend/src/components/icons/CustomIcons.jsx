// src/components/CustomIcons.jsx
import React from 'react';

export const RocketIcon = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="rocket-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA" />
        <stop offset="50%" stopColor="#764BA2" />
        <stop offset="100%" stopColor="#F093FB" />
      </linearGradient>
      <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFA500" />
        <stop offset="50%" stopColor="#FF6B9D" />
        <stop offset="100%" stopColor="#FF4757" />
      </linearGradient>
    </defs>
    
    {/* Chamas do foguete */}
    <path d="M 35 85 Q 30 95 25 100 Q 30 97 35 95 Z" fill="url(#flame-gradient)" opacity="0.8">
      <animate attributeName="d" 
        values="M 35 85 Q 30 95 25 100 Q 30 97 35 95 Z;
                M 35 85 Q 30 92 25 95 Q 30 94 35 95 Z;
                M 35 85 Q 30 95 25 100 Q 30 97 35 95 Z"
        dur="0.8s" repeatCount="indefinite"/>
    </path>
    <path d="M 45 90 Q 42 98 40 105 Q 45 100 50 98 Z" fill="url(#flame-gradient)" opacity="0.9">
      <animate attributeName="d" 
        values="M 45 90 Q 42 98 40 105 Q 45 100 50 98 Z;
                M 45 90 Q 42 95 40 98 Q 45 97 50 98 Z;
                M 45 90 Q 42 98 40 105 Q 45 100 50 98 Z"
        dur="0.7s" repeatCount="indefinite"/>
    </path>
    <path d="M 55 90 Q 58 98 60 105 Q 55 100 50 98 Z" fill="url(#flame-gradient)" opacity="0.9">
      <animate attributeName="d" 
        values="M 55 90 Q 58 98 60 105 Q 55 100 50 98 Z;
                M 55 90 Q 58 95 60 98 Q 55 97 50 98 Z;
                M 55 90 Q 58 98 60 105 Q 55 100 50 98 Z"
        dur="0.7s" repeatCount="indefinite"/>
    </path>
    <path d="M 65 85 Q 70 95 75 100 Q 70 97 65 95 Z" fill="url(#flame-gradient)" opacity="0.8">
      <animate attributeName="d" 
        values="M 65 85 Q 70 95 75 100 Q 70 97 65 95 Z;
                M 65 85 Q 70 92 75 95 Q 70 94 65 95 Z;
                M 65 85 Q 70 95 75 100 Q 70 97 65 95 Z"
        dur="0.8s" repeatCount="indefinite"/>
    </path>
    
    {/* Corpo do foguete */}
    <ellipse cx="50" cy="45" rx="18" ry="22" fill="url(#rocket-gradient)" />
    
    {/* Ponta do foguete */}
    <path d="M 50 10 Q 35 25 35 35 L 65 35 Q 65 25 50 10 Z" fill="url(#rocket-gradient)" />
    
    {/* Janela */}
    <circle cx="50" cy="40" r="8" fill="white" opacity="0.9" />
    <circle cx="50" cy="40" r="6" fill="#667EEA" opacity="0.3" />
    <circle cx="48" cy="38" r="2" fill="white" opacity="0.8" />
    
    {/* Detalhes decorativos */}
    <rect x="45" y="55" width="10" height="3" rx="1.5" fill="white" opacity="0.4" />
    <rect x="45" y="60" width="10" height="3" rx="1.5" fill="white" opacity="0.4" />
    
    {/* Asas */}
    <path d="M 32 65 L 25 80 L 32 75 Z" fill="url(#rocket-gradient)" opacity="0.9" />
    <path d="M 68 65 L 75 80 L 68 75 Z" fill="url(#rocket-gradient)" opacity="0.9" />
    
    {/* Base */}
    <path d="M 35 70 L 32 85 L 45 85 L 45 70 Z" fill="#764BA2" />
    <path d="M 65 70 L 68 85 L 55 85 L 55 70 Z" fill="#764BA2" />
    
    {/* Estrelas decorativas */}
    <circle cx="20" cy="25" r="1.5" fill="#FFA500" opacity="0.7">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="80" cy="35" r="1" fill="#FF6B9D" opacity="0.7">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="15" cy="50" r="1.2" fill="#667EEA" opacity="0.7">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export const SuccessStarIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    
    {/* Círculo de fundo */}
    <circle cx="50" cy="50" r="45" fill="url(#star-gradient)" opacity="0.1" />
    
    {/* Estrela principal */}
    <path d="M 50 15 L 58 38 L 82 42 L 66 58 L 70 82 L 50 70 L 30 82 L 34 58 L 18 42 L 42 38 Z" 
          fill="url(#star-gradient)">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="20s"
        repeatCount="indefinite"/>
    </path>
    
    {/* Brilho central */}
    <circle cx="50" cy="50" r="3" fill="white" opacity="0.9">
      <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    
    {/* Partículas ao redor */}
    <circle cx="30" cy="30" r="2" fill="#4ADE80">
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="70" cy="30" r="2" fill="#10B981">
      <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="30" cy="70" r="2" fill="#4ADE80">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="70" cy="70" r="2" fill="#10B981">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export const ChartIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="chart-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#667EEA" />
        <stop offset="100%" stopColor="#764BA2" />
      </linearGradient>
    </defs>
    
    {/* Barras do gráfico */}
    <rect x="15" y="60" width="15" height="0" rx="4" fill="url(#chart-gradient)">
      <animate attributeName="height" from="0" to="30" dur="1s" fill="freeze"/>
      <animate attributeName="y" from="90" to="60" dur="1s" fill="freeze"/>
    </rect>
    <rect x="37" y="40" width="15" height="0" rx="4" fill="url(#chart-gradient)">
      <animate attributeName="height" from="0" to="50" dur="1.2s" fill="freeze"/>
      <animate attributeName="y" from="90" to="40" dur="1.2s" fill="freeze"/>
    </rect>
    <rect x="59" y="25" width="15" height="0" rx="4" fill="url(#chart-gradient)">
      <animate attributeName="height" from="0" to="65" dur="1.4s" fill="freeze"/>
      <animate attributeName="y" from="90" to="25" dur="1.4s" fill="freeze"/>
    </rect>
    <rect x="81" y="15" width="15" height="0" rx="4" fill="url(#chart-gradient)">
      <animate attributeName="height" from="0" to="75" dur="1.6s" fill="freeze"/>
      <animate attributeName="y" from="90" to="15" dur="1.6s" fill="freeze"/>
    </rect>
    
    {/* Linha de tendência */}
    <path d="M 22 75 L 44 55 L 66 40 L 88 25" 
          stroke="#FF6B9D" 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset="200"
          fill="none">
      <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" fill="freeze"/>
    </path>
    
    {/* Pontos na linha */}
    <circle cx="22" cy="75" r="4" fill="#FF6B9D">
      <animate attributeName="r" values="0;4" dur="0.3s" begin="1.5s" fill="freeze"/>
    </circle>
    <circle cx="44" cy="55" r="4" fill="#FF6B9D">
      <animate attributeName="r" values="0;4" dur="0.3s" begin="1.7s" fill="freeze"/>
    </circle>
    <circle cx="66" cy="40" r="4" fill="#FF6B9D">
      <animate attributeName="r" values="0;4" dur="0.3s" begin="1.9s" fill="freeze"/>
    </circle>
    <circle cx="88" cy="25" r="4" fill="#FF6B9D">
      <animate attributeName="r" values="0;4" dur="0.3s" begin="2.1s" fill="freeze"/>
    </circle>
  </svg>
);

export const CalendarIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="calendar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C44BF0" />
        <stop offset="100%" stopColor="#764BA2" />
      </linearGradient>
    </defs>
    
    {/* Corpo do calendário */}
    <rect x="15" y="25" width="70" height="60" rx="8" fill="url(#calendar-gradient)" />
    
    {/* Área branca interna */}
    <rect x="15" y="35" width="70" height="50" rx="6" fill="white" />
    
    {/* Argolas */}
    <rect x="28" y="18" width="6" height="14" rx="3" fill="#764BA2" />
    <rect x="66" y="18" width="6" height="14" rx="3" fill="#764BA2" />
    
    {/* Dias do mês */}
    <circle cx="30" cy="50" r="3" fill="#C44BF0" opacity="0.3" />
    <circle cx="42" cy="50" r="3" fill="#C44BF0" opacity="0.3" />
    <circle cx="54" cy="50" r="3" fill="#C44BF0" opacity="0.3" />
    <circle cx="66" cy="50" r="3" fill="#C44BF0" opacity="0.3" />
    
    <circle cx="30" cy="62" r="3" fill="#C44BF0" opacity="0.3" />
    <circle cx="42" cy="62" r="3" fill="#C44BF0" opacity="0.3" />
    <circle cx="54" cy="62" r="3" fill="#C44BF0" opacity="0.3" />
    <circle cx="66" cy="62" r="3" fill="#C44BF0" opacity="0.3" />
    
    <circle cx="30" cy="74" r="3" fill="#C44BF0" opacity="0.3" />
    <circle cx="42" cy="74" r="3" fill="#C44BF0" opacity="0.3" />
    
    {/* Dia destacado */}
    <circle cx="54" cy="74" r="5" fill="url(#calendar-gradient)">
      <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="54" cy="74" r="2" fill="white" />
  </svg>
);

export const TargetIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="target-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    
    {/* Círculos do alvo */}
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#target-gradient)" strokeWidth="3" opacity="0.3" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="url(#target-gradient)" strokeWidth="3" opacity="0.5" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="url(#target-gradient)" strokeWidth="3" opacity="0.7" />
    <circle cx="50" cy="50" r="10" fill="url(#target-gradient)">
      <animate attributeName="r" values="10;12;10" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    
    {/* Ponto de impacto */}
    <circle cx="50" cy="50" r="3" fill="white" />
  </svg>
);

export const IdeaIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="bulb-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF6B9D" />
      </linearGradient>
    </defs>
    
    {/* Base da lâmpada */}
    <rect x="42" y="75" width="16" height="8" rx="2" fill="#999" />
    <rect x="40" y="83" width="20" height="4" rx="2" fill="#777" />
    
    {/* Corpo da lâmpada */}
    <ellipse cx="50" cy="45" rx="20" ry="25" fill="url(#bulb-gradient)" opacity="0.9" />
    
    {/* Brilho */}
    <ellipse cx="50" cy="45" rx="18" ry="23" fill="white" opacity="0.3" />
    <ellipse cx="45" cy="35" rx="8" ry="12" fill="white" opacity="0.6" />
    
    {/* Conexão */}
    <rect x="45" y="68" width="10" height="7" rx="1" fill="#999" />
    
    {/* Raios de luz */}
    <path d="M 50 15 L 50 8" stroke="#FFA500" strokeWidth="3" strokeLinecap="round" opacity="0.7">
      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite"/>
    </path>
    <path d="M 70 25 L 76 19" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round" opacity="0.7">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.3s" repeatCount="indefinite"/>
    </path>
    <path d="M 30 25 L 24 19" stroke="#FFA500" strokeWidth="3" strokeLinecap="round" opacity="0.7">
      <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.4s" repeatCount="indefinite"/>
    </path>
  </svg>
);


// Ícone principal - MetaMorfose

export const MetaMorfoseIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
    <defs>
      <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="0" dy="1" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Fundo verde-água (menta) */}
    <circle cx="100" cy="100" r="95" fill="#B8E6DC" opacity="0.7"/>
    
    {/* Nuvens decorativas - estilo mais natural */}
    <g opacity="0.6">
      <ellipse cx="40" cy="45" rx="20" ry="14" fill="#FFFFFF"/>
      <ellipse cx="50" cy="48" rx="16" ry="12" fill="#FFFFFF"/>
      <ellipse cx="30" cy="50" rx="14" ry="11" fill="#FFFFFF"/>
      
      <ellipse cx="160" cy="50" rx="18" ry="13" fill="#FFFFFF"/>
      <ellipse cx="170" cy="53" rx="14" ry="11" fill="#FFFFFF"/>
      <ellipse cx="150" cy="54" rx="12" ry="10" fill="#FFFFFF"/>
      
      <ellipse cx="25" cy="110" rx="16" ry="11" fill="#FFFFFF"/>
      <ellipse cx="35" cy="113" rx="13" ry="10" fill="#FFFFFF"/>
      
      <ellipse cx="175" cy="115" rx="15" ry="11" fill="#FFFFFF"/>
      <ellipse cx="165" cy="117" rx="12" ry="9" fill="#FFFFFF"/>
      
      <ellipse cx="155" cy="165" rx="18" ry="12" fill="#FFFFFF"/>
      <ellipse cx="165" cy="168" rx="14" ry="10" fill="#FFFFFF"/>
      <ellipse cx="145" cy="169" rx="13" ry="9" fill="#FFFFFF"/>
    </g>

    {/* Cordinha para pendurar */}
    <g>
      <line x1="100" y1="18" x2="100" y2="38" stroke="#6B5D53" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="100" cy="16" r="4" fill="#8B7D73" stroke="#6B5D53" strokeWidth="1.5"/>
    </g>

    {/* Alvo - Círculo azul externo */}
    <circle cx="100" cy="100" r="58" fill="#5B9BD5" stroke="#2C3E50" strokeWidth="3.5" filter="url(#soft-shadow)"/>
    
    {/* Alvo - Círculo branco */}
    <circle cx="100" cy="100" r="46" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3.5"/>
    
    {/* Alvo - Círculo vermelho/coral */}
    <circle cx="100" cy="100" r="30" fill="#FF7B8F" stroke="#2C3E50" strokeWidth="3.5"/>
    
    {/* Alvo - Círculo amarelo central */}
    <circle cx="100" cy="100" r="15" fill="#FFD147" stroke="#2C3E50" strokeWidth="3"/>

    {/* Flecha atravessando */}
    <g transform="rotate(-35 100 100)">
      <line x1="100" y1="50" x2="100" y2="160" stroke="#6B5D53" strokeWidth="5" strokeLinecap="round"/>
      
      <path 
        d="M100 40 L92 54 L100 51 L108 54 Z" 
        fill="#FFB84D" 
        stroke="#E09C3D" 
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path 
        d="M100 42 L96 50 L100 48 L104 50 Z" 
        fill="#FFD147" 
        opacity="0.7"
      />
      
      <g>
        <path 
          d="M95 160 L88 172 L95 165 Z" 
          fill="#FFD147" 
          stroke="#E09C3D" 
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        
        <path 
          d="M105 160 L112 172 L105 165 Z" 
          fill="#FFD147" 
          stroke="#E09C3D" 
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        
        <line x1="91" y1="165" x2="91" y2="170" stroke="#E09C3D" strokeWidth="1"/>
        <line x1="109" y1="165" x2="109" y2="170" stroke="#E09C3D" strokeWidth="1"/>
      </g>
    </g>
  </svg>
);

export const ButterflyAuthIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className}>
    <defs>
      <linearGradient id="bf-wing-left" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8FB8" />
        <stop offset="100%" stopColor="#FF5C9A" />
      </linearGradient>
      <linearGradient id="bf-wing-right" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7B8CFF" />
        <stop offset="100%" stopColor="#5A67D8" />
      </linearGradient>
      <linearGradient id="bf-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3B2F4A" />
        <stop offset="100%" stopColor="#1F1A28" />
      </linearGradient>
    </defs>

    <circle cx="64" cy="64" r="58" fill="#F4FAFF" opacity="0.95" />

    <path d="M62 64C48 56 35 38 34 24C48 26 60 35 62 50V64Z" fill="url(#bf-wing-left)" />
    <path d="M66 64C80 56 93 38 94 24C80 26 68 35 66 50V64Z" fill="url(#bf-wing-right)" />
    <path d="M62 66C50 74 43 90 44 105C56 103 62 93 62 82V66Z" fill="url(#bf-wing-left)" opacity="0.92" />
    <path d="M66 66C78 74 85 90 84 105C72 103 66 93 66 82V66Z" fill="url(#bf-wing-right)" opacity="0.92" />

    <ellipse cx="64" cy="66" rx="7" ry="22" fill="url(#bf-body)" />
    <circle cx="64" cy="42" r="5" fill="url(#bf-body)" />
    <path d="M61 38C57 32 54 27 53 22" stroke="#3B2F4A" strokeWidth="2" strokeLinecap="round" />
    <path d="M67 38C71 32 74 27 75 22" stroke="#3B2F4A" strokeWidth="2" strokeLinecap="round" />

    <circle cx="50" cy="44" r="4" fill="white" opacity="0.7" />
    <circle cx="78" cy="44" r="4" fill="white" opacity="0.65" />
    <circle cx="52" cy="84" r="3" fill="white" opacity="0.65" />
    <circle cx="76" cy="84" r="3" fill="white" opacity="0.6" />
  </svg>
);

// Ícones de Status de Tarefas

// Em Andamento - Relógio com ponteiro girando
export const InProgressIcon = ({ size = 32, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="clock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA" />
        <stop offset="100%" stopColor="#764BA2" />
      </linearGradient>
      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    
    {/* Círculo externo com progresso */}
    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#clock-gradient)" strokeWidth="3" opacity="0.2"/>
    
    {/* Barra de progresso circular animada */}
    <circle 
      cx="50" 
      cy="50" 
      r="45" 
      fill="none" 
      stroke="url(#progress-gradient)" 
      strokeWidth="4" 
      strokeLinecap="round"
      strokeDasharray="283"
      strokeDashoffset="70"
      transform="rotate(-90 50 50)"
    >
      <animate 
        attributeName="stroke-dashoffset" 
        values="283;70;283" 
        dur="3s" 
        repeatCount="indefinite"
      />
    </circle>
    
    {/* Corpo do relógio */}
    <circle cx="50" cy="50" r="35" fill="url(#clock-gradient)" />
    
    {/* Face do relógio */}
    <circle cx="50" cy="50" r="30" fill="white" />
    
    {/* Marcadores de hora */}
    <circle cx="50" cy="25" r="2" fill="url(#clock-gradient)" />
    <circle cx="75" cy="50" r="2" fill="url(#clock-gradient)" />
    <circle cx="50" cy="75" r="2" fill="url(#clock-gradient)" />
    <circle cx="25" cy="50" r="2" fill="url(#clock-gradient)" />
    
    {/* Ponteiro das horas */}
    <line x1="50" y1="50" x2="50" y2="35" stroke="url(#clock-gradient)" strokeWidth="3" strokeLinecap="round"/>
    
    {/* Ponteiro dos minutos - animado */}
    <line x1="50" y1="50" x2="65" y2="50" stroke="url(#progress-gradient)" strokeWidth="2.5" strokeLinecap="round">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="4s"
        repeatCount="indefinite"
      />
    </line>
    
    {/* Centro do relógio */}
    <circle cx="50" cy="50" r="4" fill="url(#progress-gradient)" />
    
    {/* Partículas flutuantes */}
    <circle cx="20" cy="30" r="2" fill="#FF6B9D" opacity="0.6">
      <animate attributeName="cy" values="30;25;30" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="80" cy="35" r="2" fill="#667EEA" opacity="0.6">
      <animate attributeName="cy" values="35;30;35" dur="2.3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="85" cy="70" r="2" fill="#FFA500" opacity="0.6">
      <animate attributeName="cy" values="70;65;70" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

// Concluído - Estrela que enche com progresso (0-100%)
export const CompletedStarIcon = ({ size = 32, progress = 100, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="star-fill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="star-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
      <clipPath id="star-clip">
        <path d="M50 10 L60 38 L90 42 L70 62 L75 92 L50 77 L25 92 L30 62 L10 42 L40 38 Z" />
      </clipPath>
    </defs>
    
    {/* Círculo de fundo pulsante quando 100% */}
    {progress === 100 && (
      <circle cx="50" cy="50" r="48" fill="url(#star-glow)" opacity="0.15">
        <animate attributeName="r" values="45;50;45" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite"/>
      </circle>
    )}
    
    {/* Contorno da estrela */}
    <path 
      d="M50 10 L60 38 L90 42 L70 62 L75 92 L50 77 L25 92 L30 62 L10 42 L40 38 Z" 
      fill="none"
      stroke="#E5E7EB" 
      strokeWidth="3"
    />
    
    {/* Preenchimento da estrela baseado no progresso */}
    <g clipPath="url(#star-clip)">
      <rect 
        x="0" 
        y={100 - progress} 
        width="100" 
        height={progress} 
        fill="url(#star-fill)"
      />
      
      {/* Brilho superior quando preenchido */}
      {progress > 50 && (
        <rect 
          x="0" 
          y={100 - progress} 
          width="100" 
          height="30" 
          fill="white" 
          opacity="0.3"
        />
      )}
    </g>
    
    {/* Contorno colorido quando completo */}
    {progress === 100 && (
      <path 
        d="M50 10 L60 38 L90 42 L70 62 L75 92 L50 77 L25 92 L30 62 L10 42 L40 38 Z" 
        fill="none"
        stroke="url(#star-fill)" 
        strokeWidth="3"
      />
    )}
    
    {/* Brilho central quando completo */}
    {progress === 100 && (
      <>
        <circle cx="50" cy="50" r="8" fill="white" opacity="0.8">
          <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        
        {/* Partículas brilhantes */}
        <circle cx="30" cy="30" r="2" fill="#FFD700">
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="30;25;30" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="70" cy="35" r="2" fill="#4ADE80">
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="35;30;35" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="65" cy="70" r="2" fill="#10B981">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="70;65;70" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </>
    )}
    
    {/* Texto de porcentagem no centro */}
    <text 
      x="50" 
      y="58" 
      textAnchor="middle" 
      fontSize="16" 
      fontWeight="bold" 
      fill={progress === 100 ? "#10B981" : "#6B7280"}
    >
      {progress}%
    </text>
  </svg>
);

// Ícones da Interface

// Mãozinha acenando
export const WavingHandIcon = ({ size = 32, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    <defs>
      <linearGradient id="hand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    
    <path
      d="M32 52 C28 52 24 50 22 46 L18 38 C17 36 18 34 20 34 C21 34 22 35 23 36 L25 40 L25 20 C25 18 26 16 28 16 C30 16 31 18 31 20 L31 24 L32 24 L32 18 C32 16 33 14 35 14 C37 14 38 16 38 18 L38 24 L39 24 L39 20 C39 18 40 16 42 16 C44 16 45 18 45 20 L45 28 L46 28 L46 24 C46 22 47 20 49 20 C51 20 52 22 52 24 L52 40 C52 48 44 52 32 52 Z"
      fill="url(#hand-gradient)"
      stroke="#4A4A4A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    <g className="wave-lines" opacity="0.7">
      <path d="M8 20 Q12 18 16 20" stroke="#FF6B9D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M6 26 Q10 24 14 26" stroke="#C44BF0" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M8 32 Q12 30 16 32" stroke="#667EEA" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </g>
  </svg>
);

// Dashboard
export const DashboardIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="dash-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#667EEA"/>
      </linearGradient>
    </defs>
    <rect x="2" y="3" width="20" height="14" rx="2" fill="url(#dash-grad)" opacity="0.1"/>
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="url(#dash-grad)" strokeWidth="2"/>
    <path d="M2 7 H22" stroke="url(#dash-grad)" strokeWidth="2"/>
    <path d="M7 21 H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 17 V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 13 L9 10.5 L12 12 L15 9 L18 11" 
          stroke="url(#dash-grad)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
  </svg>
);

// Metas/Alvo
export const GoalsIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="goal-grad">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#FFA500"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="url(#goal-grad)" strokeWidth="1.5" opacity="0.3"/>
    <circle cx="12" cy="12" r="6" stroke="url(#goal-grad)" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="12" cy="12" r="2" fill="url(#goal-grad)"/>
    <path d="M2 2 L10 10" stroke="url(#goal-grad)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="2" cy="2" r="1.5" fill="url(#goal-grad)"/>
  </svg>
);

// Perfil/Usuário
export const ProfileIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="profile-grad">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="8" r="4" fill="url(#profile-grad)" opacity="0.8"/>
    <path d="M5 20 C5 15.5 8 13 12 13 C16 13 19 15.5 19 20" 
          stroke="url(#profile-grad)" 
          strokeWidth="2.5" 
          strokeLinecap="round"/>
    <circle cx="12" cy="12" r="11" stroke="url(#profile-grad)" strokeWidth="1" opacity="0.3"/>
  </svg>
);


// Filtro
export const FilterIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="filter-grad">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#667EEA"/>
      </linearGradient>
    </defs>
    <path d="M4 6 L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 12 L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 18 L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="6" r="2" fill="url(#filter-grad)"/>
    <circle cx="14" cy="12" r="2" fill="url(#filter-grad)"/>
    <circle cx="12" cy="18" r="2" fill="url(#filter-grad)"/>
  </svg>
);

// Check/Concluir
export const CheckIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 13 L9 17 L19 7" 
          stroke="currentColor" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>
);

// Check Circle
export const CheckCircleIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="check-grad">
        <stop offset="0%" stopColor="#4ADE80"/>
        <stop offset="100%" stopColor="#22C55E"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#check-grad)" opacity="0.2"/>
    <circle cx="12" cy="12" r="10" stroke="url(#check-grad)" strokeWidth="2"/>
    <path d="M7 12 L10.5 15.5 L17 9" 
          stroke="url(#check-grad)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
  </svg>
);

// Lixeira
export const TrashIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="trash-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#FF4444"/>
      </linearGradient>
    </defs>
    <path d="M3 6 H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 6 V4 C8 3.5 8.5 3 9 3 H15 C15.5 3 16 3.5 16 4 V6" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <rect x="5" y="6" width="14" height="15" rx="2" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="url(#trash-grad)" 
          fillOpacity="0.1"/>
    <path d="M10 11 L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 11 L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Logout
export const LogoutIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="logout-grad">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#FF4444"/>
      </linearGradient>
    </defs>
    <path d="M9 21 H5 C4.5 21 4 20.5 4 20 V4 C4 3.5 4.5 3 5 3 H9" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <path d="M16 17 L21 12 L16 7" 
          stroke="url(#logout-grad)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
    <path d="M21 12 H9" 
          stroke="url(#logout-grad)" 
          strokeWidth="2.5" 
          strokeLinecap="round"/>
  </svg>
);

// Plus
export const PlusIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="plus-grad">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#667EEA"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#plus-grad)" opacity="0.2"/>
    <path d="M12 7 V17" 
          stroke="url(#plus-grad)" 
          strokeWidth="3" 
          strokeLinecap="round"/>
    <path d="M7 12 H17" 
          stroke="url(#plus-grad)" 
          strokeWidth="3" 
          strokeLinecap="round"/>
  </svg>
);

// Close/X
export const CloseIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6 L6 18" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round"/>
    <path d="M6 6 L18 18" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round"/>
  </svg>
);

// Alert
export const AlertIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="alert-grad">
        <stop offset="0%" stopColor="#FFA500"/>
        <stop offset="100%" stopColor="#FF4444"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="url(#alert-grad)" 
            fillOpacity="0.1"/>
    <path d="M12 7 V13" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round"/>
    <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
  </svg>
);

// Email
export const MailIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="mail-grad">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <rect x="3" y="5" width="18" height="14" rx="2" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="url(#mail-grad)" 
          fillOpacity="0.1"/>
    <path d="M3 7 L12 13 L21 7" 
          stroke="url(#mail-grad)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
  </svg>
);

// Lock
export const LockIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="lock-grad">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <rect x="6" y="11" width="12" height="10" rx="2" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="url(#lock-grad)" 
          fillOpacity="0.1"/>
    <path d="M8 11 V7 C8 5 9.5 3 12 3 C14.5 3 16 5 16 7 V11" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <circle cx="12" cy="16" r="2" fill="url(#lock-grad)"/>
  </svg>
);

// Eye
export const EyeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="eye-grad">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <path d="M2 12 C2 12 5 5 12 5 C19 5 22 12 22 12 C22 12 19 19 12 19 C5 19 2 12 2 12Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="url(#eye-grad)" 
          fillOpacity="0.1"/>
    <circle cx="12" cy="12" r="3" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="url(#eye-grad)"/>
  </svg>
);

// Eye Off
export const EyeOffIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 3 L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10.5 10.7 C10 11.1 9.7 11.7 9.7 12.3 C9.7 13.5 10.7 14.5 11.9 14.5 C12.5 14.5 13 14.2 13.4 13.7" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <path d="M17.2 17 C15.7 18.2 13.9 19 12 19 C5 19 2 12 2 12 C2.9 10.2 4.1 8.7 5.5 7.4" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <path d="M9.3 5.3 C10.2 5.1 11.1 5 12 5 C19 5 22 12 22 12 C21.6 12.8 21.1 13.6 20.5 14.3" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
  </svg>
);

// Configurações
export const SettingsIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="settings-grad">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2 L12 5 M12 19 L12 22 M22 12 L19 12 M5 12 L2 12" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <path d="M18.4 5.6 L16.2 7.8 M7.8 16.2 L5.6 18.4 M18.4 18.4 L16.2 16.2 M7.8 7.8 L5.6 5.6" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill="url(#settings-grad)"/>
  </svg>
);

// Sparkle/Brilho
export const SparkleIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" 
      fill="url(#sparkle-grad)"
    />
    <path 
      d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z" 
      fill="url(#sparkle-grad)"
    />
  </svg>
);

// Coração
export const HeartIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b9d" />
        <stop offset="100%" stopColor="#ff1744" />
      </linearGradient>
    </defs>
    <path 
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.99872 7.05 2.99872C5.59096 2.99872 4.19169 3.5783 3.16 4.61C2.1283 5.64169 1.54872 7.04097 1.54872 8.5C1.54872 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z" 
      fill="url(#heart-grad)"
    />
  </svg>
);

// Carreira/Crescimento
export const CareerIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="career-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b9d" />
        <stop offset="100%" stopColor="#ffa500" />
      </linearGradient>
    </defs>
    <path 
      d="M3 17L9 11L13 15L21 7" 
      stroke="url(#career-grad)" 
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path 
      d="M16 7H21V12" 
      stroke="url(#career-grad)" 
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);