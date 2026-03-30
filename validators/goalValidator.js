// Função de validação para metas
export function validateGoal(data) {
  return data.title && typeof data.title === 'string';
}
