// src/pages/Goals/AddGoalModal.jsx
import { useState } from 'react';
import './AddGoalModal.css';

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round"/>
  </svg>
);

const CATEGORIES = [
  {
    key: 'corpo',
    label: 'Corpo',
    desc: 'Fitness, alimentação, sono',
    color: 'green',
  },
  {
    key: 'mente',
    label: 'Mente',
    desc: 'Estudo, leitura, hábitos',
    color: 'blue',
  },
  {
    key: 'carreira',
    label: 'Carreira',
    desc: 'Trabalho, dinheiro, projetos',
    color: 'pink',
  },
  {
    key: 'vida',
    label: 'Vida',
    desc: 'Relacionamentos, hobbies, lazer',
    color: 'orange',
  },
];

const PERIOD_LABELS = {
  day:   'Hoje',
  week:  'Semana',
  month: 'Mês',
  year:  'Ano',
};

export const AddGoalModal = ({ onClose, onAdd, defaultCategory = 'personal', period = 'month' }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: defaultCategory,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'O título é obrigatório';
    else if (form.title.trim().length < 3) e.title = 'Mínimo de 3 caracteres';
    else if (form.title.trim().length > 100) e.title = 'Máximo de 100 caracteres';
    if (form.description && form.description.length > 500) e.description = 'Máximo de 500 caracteres';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    try {
      await onAdd({ ...form, period });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
  };

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={handleKeyDown} role="dialog"
      aria-modal="true" aria-labelledby="modal-title">
      <div className="add-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="add-modal__header">
          <div>
            <div className="add-modal__period-tag">
              {PERIOD_LABELS[period] || 'Mês'}
            </div>
            <h2 className="add-modal__title" id="modal-title">Nova Meta</h2>
          </div>
          <button className="add-modal__close" onClick={onClose} aria-label="Fechar modal">
            <CloseIcon />
          </button>
        </div>

        <div className="add-modal__body">
          {/* Category Selector */}
          <div className="add-modal__field">
            <label className="add-modal__label">Categoria</label>
            <div className="add-modal__categories">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  type="button"
                  className={`add-modal__cat add-modal__cat--${cat.color} ${form.category === cat.key ? 'add-modal__cat--active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, category: cat.key }))}
                  aria-pressed={form.category === cat.key}
                >
                  <span className="add-modal__cat-label">{cat.label}</span>
                  <span className="add-modal__cat-desc">{cat.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="add-modal__field">
            <label className="add-modal__label" htmlFor="goal-title">
              Título da Meta <span className="add-modal__required">*</span>
            </label>
            <input
              id="goal-title"
              type="text"
              className={`add-modal__input ${errors.title ? 'add-modal__input--error' : ''}`}
              value={form.title}
              onChange={e => {
                setForm(f => ({ ...f, title: e.target.value }));
                if (errors.title) setErrors(er => ({ ...er, title: '' }));
              }}
              placeholder="Ex: Correr 5km toda semana"
              maxLength={100}
              autoFocus
            />
            <div className="add-modal__field-meta">
              {errors.title
                ? <span className="add-modal__error">{errors.title}</span>
                : <span></span>
              }
              <span className="add-modal__char">{form.title.length}/100</span>
            </div>
          </div>

          {/* Description */}
          <div className="add-modal__field">
            <label className="add-modal__label" htmlFor="goal-desc">
              Descrição <span className="add-modal__optional">(opcional)</span>
            </label>
            <textarea
              id="goal-desc"
              className={`add-modal__textarea ${errors.description ? 'add-modal__input--error' : ''}`}
              value={form.description}
              onChange={e => {
                setForm(f => ({ ...f, description: e.target.value }));
                if (errors.description) setErrors(er => ({ ...er, description: '' }));
              }}
              placeholder="Descreva sua meta com mais detalhes..."
              rows={4}
              maxLength={500}
            />
            <div className="add-modal__field-meta">
              {errors.description
                ? <span className="add-modal__error">{errors.description}</span>
                : <span></span>
              }
              <span className="add-modal__char">{form.description.length}/500</span>
            </div>
          </div>

          {/* Submit */}
          <button
            className="add-modal__submit"
            onClick={handleSubmit}
            disabled={loading || !form.title.trim()}
          >
            {loading ? (
              <span className="add-modal__spinner"></span>
            ) : null}
            {loading ? 'Criando...' : 'Criar Meta'}
          </button>

          <p className="add-modal__hint">
            <kbd>Ctrl</kbd> + <kbd>Enter</kbd> para criar rapidamente
          </p>
        </div>
      </div>
    </div>
  );
};