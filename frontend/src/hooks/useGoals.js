// src/hooks/useGoals.js
import { useState, useEffect, useCallback } from 'react';
import { goalsService } from '../services/api';

export const useGoals = (category = null) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await goalsService.getAll(category);
      setGoals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = useCallback(async (goalData) => {
    try {
      const newGoal = await goalsService.create(goalData);
      setGoals(prev => [...prev, newGoal]);
      return newGoal;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateGoal = useCallback(async (id, updates) => {
    try {
      const updatedGoal = await goalsService.update(id, updates);
      setGoals(prev => prev.map(g => g.id === id ? updatedGoal : g));
      return updatedGoal;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteGoal = useCallback(async (id) => {
    try {
      await goalsService.delete(id);
      setGoals(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const toggleComplete = useCallback(async (id) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      return updateGoal(id, { completed: !goal.completed });
    }
  }, [goals, updateGoal]);

  return {
    goals,
    loading,
    error,
    fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleComplete
  };
};