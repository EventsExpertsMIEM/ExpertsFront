import { ACTION } from './types';

// eslint-disable-next-line import/prefer-default-export
export const resetComments = () => async (dispatch) => {
  dispatch({
    type: ACTION.RESET_COMMENTS,
  });
};
