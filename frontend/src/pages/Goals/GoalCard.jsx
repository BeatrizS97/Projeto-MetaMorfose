// src/pages/Goals/GoalCard.jsx
import { useEffect, useState } from 'react';
import './GoalCard.css';

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M3 6H21M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6M10 11V17M14 11V17M5 6L6 20C6 20.55 6.45 21 7 21H17C17.55 21 18 20.55 18 20L19 6H5Z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3 10H21M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18 10L14 6L4 16V20Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8L16 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export const GoalCard = ({ goal, index, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(goal.title || '');
  const [draftDescription, setDraftDescription] = useState(goal.description || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setDraftTitle(goal.title || '');
    setDraftDescription(goal.description || '');
  }, [goal.title, goal.description]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

  const handleSave = async () => {
    const normalizedTitle = draftTitle.trim();
    const normalizedDescription = draftDescription.trim();

    if (!normalizedTitle) {
      setError('O titulo da meta nao pode ficar vazio.');
      return;
    }

    if (normalizedTitle === (goal.title || '').trim() && normalizedDescription === (goal.description || '').trim()) {
      setIsEditing(false);
      setError('');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await onUpdate({ title: normalizedTitle, description: normalizedDescription });
      setIsEditing(false);
    } catch {
      setError('Nao foi possivel salvar a meta agora.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`goal-card ${goal.completed ? 'goal-card--done' : ''}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="goal-card__body">
        {isEditing ? (
          <div className="goal-card__edit">
            <input
              type="text"
              className="goal-card__edit-input"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              maxLength={200}
              placeholder="Titulo da meta"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSave();
                }
                if (e.key === 'Escape') {
                  setIsEditing(false);
                  setDraftTitle(goal.title || '');
                  setDraftDescription(goal.description || '');
                  setError('');
                }
              }}
            />
            <textarea
              className="goal-card__edit-textarea"
              value={draftDescription}
              onChange={(e) => setDraftDescription(e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="Descricao (opcional)"
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />
            {error && <p className="goal-card__edit-error">{error}</p>}
            <div className="goal-card__edit-actions">
              <button
                type="button"
                className="goal-card__small-btn goal-card__small-btn--ghost"
                onClick={() => {
                  setIsEditing(false);
                  setDraftTitle(goal.title || '');
                  setDraftDescription(goal.description || '');
                  setError('');
                }}
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="goal-card__small-btn goal-card__small-btn--save"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <h4 className={`goal-card__title ${goal.completed ? 'goal-card__title--done' : ''}`}>
              {goal.title}
            </h4>
            {goal.description && (
              <p className="goal-card__desc">{goal.description}</p>
            )}
          </>
        )}
      </div>

      <div className="goal-card__footer">
        <div className="goal-card__date">
          <CalIcon />
          <span>{formatDate(goal.createdAt)}</span>
        </div>
        <div className="goal-card__actions">
          <button
            className="goal-card__btn goal-card__btn--edit"
            onClick={() => {
              setError('');
              setIsEditing((prev) => !prev);
            }}
            aria-label={isEditing ? 'Cancelar edicao' : 'Editar meta'}
            title={isEditing ? 'Cancelar edicao' : 'Editar rapidamente'}
          >
            <EditIcon />
          </button>
          <button
            className={`goal-card__btn goal-card__btn--check ${goal.completed ? 'goal-card__btn--checked' : ''}`}
            onClick={onToggle}
            aria-label={goal.completed ? 'Reabrir meta' : 'Concluir meta'}
            title={goal.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
            disabled={isEditing || saving}
          >
            <CheckIcon />
          </button>
          <button
            className="goal-card__btn goal-card__btn--delete"
            onClick={onDelete}
            aria-label="Deletar meta"
            title="Deletar meta"
            disabled={isEditing || saving}
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {goal.completed && (
        <div className="goal-card__done-badge">Concluída</div>
      )}
    </div>
  );
};