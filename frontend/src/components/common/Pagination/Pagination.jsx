// src/components/common/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css';

// Ícone de seta esquerda para navegação
const ChevronLeftIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Ícone de seta direita para navegação
const ChevronRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Componente de paginação reutilizável para listas com muitos itens
// Props:
// - currentPage: Número da página atual (começando em 1)
// - totalPages: Total de páginas
// - onPageChange: Função callback quando a página mudar
// - siblingCount: Número de páginas a mostrar ao lado da página atual (padrão: 1)
export const Pagination = React.memo(({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange = () => {},
  variant = 'simple' // 'simple' = só botões prev/next | 'full' = números de página
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Gera array de números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Máximo de números de página a mostrar
    const halfWindow = Math.floor(maxVisible / 2);
    
    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);
    
    // Ajusta o range se estiver perto do início ou fim
    if (endPage - startPage < maxVisible - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisible - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
    }
    
    // Adiciona primeira página e reticências se necessário
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // Adiciona páginas do range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Adiciona última página e reticências se necessário
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (variant === 'simple') {
    return (
      <div className="pagination pagination--simple">
        <button
          className="pagination__btn pagination__btn--prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Página anterior"
          title="Página anterior"
        >
          <ChevronLeftIcon />
        </button>
        
        <span className="pagination__info">
          {currentPage} de {totalPages}
        </span>
        
        <button
          className="pagination__btn pagination__btn--next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
          title="Próxima página"
        >
          <ChevronRightIcon />
        </button>
      </div>
    );
  }

  // Variant 'full' com números de página
  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination pagination--full">
      <button
        className="pagination__btn pagination__btn--prev"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon />
      </button>
      
      <div className="pagination__pages">
        {pageNumbers.map((page, idx) => (
          <React.Fragment key={idx}>
            {page === '...' ? (
              <span className="pagination__ellipsis">…</span>
            ) : (
              <button
                className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`}
                onClick={() => handlePageClick(page)}
                aria-label={`Página ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <button
        className="pagination__btn pagination__btn--next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';
