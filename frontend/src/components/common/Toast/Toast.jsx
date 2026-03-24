// src/components/common/Toast/Toast.jsx
import { useEffect } from 'react';
import { CheckCircleIcon, AlertIcon, CloseIcon } from '../../icons/CustomIcons';
import './Toast.css';

// Componente Toast para exibir mensagens de feedback ao usuário, como sucesso, erro ou informações. O componente é configurável para diferentes tipos de mensagens, duração e posição na tela.
export const Toast = ({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 4000,
  position = 'bottom-right'
}) => {
  // Efeito colateral para fechar o toast automaticamente após a duração especificada - Usa o hook useEffect para configurar um timer que chama a função onClose após o tempo definido em duration. O timer é limpo se o componente for desmontado antes do tempo ou se a duração ou função onClose forem alterados.
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Ícones para cada tipo de mensagem - Define os ícones a serem exibidos com base no tipo de toast (sucesso, erro, informação)
  const icons = {
    success: <CheckCircleIcon size={24} />,
    error: <AlertIcon size={24} />,
    info: <AlertIcon size={24} />
  };

  return (
    <div className={`toast toast-${type} toast-${position}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-message">{message}</div>
      <button onClick={onClose} className="toast-close">
        <CloseIcon size={18} />
      </button>
    </div>
  );
};