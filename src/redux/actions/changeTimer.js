export const CHANGE_TIMER = 'CHANGE_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
// export const SAVE_TIMER_ID = 'SAVE_TIMER_ID';

export const changeTimer = (newTime) => ({
  type: CHANGE_TIMER,
  payload: newTime,
});

// export const saveTimerId = (timerId) => ({
//   type: CHANGE_TIMER,
//   playload: timerId,
// });

export const resetTimer = () => ({
  type: RESET_TIMER,
});
