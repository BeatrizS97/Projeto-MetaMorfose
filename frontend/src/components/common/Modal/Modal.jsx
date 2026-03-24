// src/components/common/Modal/Modal.jsx
import { useEffect } from 'react';
import { CloseIcon } from '../../icons/CustomIcons';
import './Modal.css';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = ''
}) => {
  useEffect(() => {
    if (!isOpen) return;

    // Bloquear scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';

    // Listener para ESC - Serve para fechar o modal quando a tecla ESC é pressionada, se a opção closeOnEscape estiver habilitada
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    // Adiciona o listener de teclado para ESC se a opção estiver habilitada
    if (closeOnEscape) {
      document.addEventListener('keydown', handleEscape);
    }

    // Cleanup: desbloqueia o scroll e remove o listener de ESC quando o modal é fechado ou desmontado
    return () => {
      document.body.style.overflow = 'unset';
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscape);
      }
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Verifica se o modal deve ser renderizado - Se a prop isOpen for falsa, o modal não é renderizado e retorna null
  if (!isOpen) return null;

  // Função para lidar com cliques no overlay - Serve para fechar o modal quando o usuário clicar fora da área do modal, se a opção closeOnOverlayClick estiver habilitada
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-container modal-${size} ${className}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && (
              <h2 className="modal-title">{title}</h2>
            )}
            {showCloseButton && (
              <button
                className="modal-close-button"
                onClick={onClose}
                aria-label="Fechar modal"
              >
                <CloseIcon size={24} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};