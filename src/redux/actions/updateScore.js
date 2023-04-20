export const UPDATE_SCORE = 'UPDATE_SCORE';

export const updateScore = (points) => ({
  type: UPDATE_SCORE,
  payload: points,
});
