export const CHANGE_TIMER = 'CHANGE_TIMER';

export const changeTimer = (newTime) => ({
  type: CHANGE_TIMER,
  payload: newTime,
});
