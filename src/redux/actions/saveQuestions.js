export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const saveQuestions = (data) => ({
  type: SAVE_QUESTIONS,
  payload: data,
});
