import p from 'immer';
import { ACTION } from '../actions/types';

const INITIAL_STATE = {
  0: {
    id: 0,
    name: 'Конференция ботоводов',
    date: '16 января 2020',
    sm_description: `V ежегодная конференция для ботоводов-любителей ипрофессионалов пройдет в этом году при поддержке
         крупнейших российских IT компаний. Приглашаем вас принять участие и заслушать доклады разработчиков и руководителей.`,
  },
};

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.GET_ALL_QUESTIONS:
      // eslint-disable-next-line no-param-reassign
      state = { ...state, ...action.payload };
      return state;
    default:
      return state;
  }
});
