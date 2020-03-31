import React from 'react';
import { reduxForm } from 'redux-form';
import CreatePublication from '../Publication/CreatePublication';
import requireAuth from '../../HOCs/requireAuth';
import { FIELD_NAMES } from '../../../helpers/consts';
import {
  maxValue1024, maxValue128, minValue28, required, trim, uppercase,
} from '../../../helpers/helpers';
import { addQuestion } from '../../../actions';

const INPUT_FIELDS = [
  {
    name: 'title',
    placeholder: 'Тема вопроса',
    validate: [required, minValue28, maxValue128],
    elementType: 'input',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
  {
    name: 'body',
    placeholder: 'Текст вопрса',
    validate: [required, maxValue1024],
    elementType: 'textarea',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
  {
    name: 'only_experts_answer',
    placeholder: 'Вопрос только для экспертов',
    elementType: 'input',
    type: 'checkbox',
  },
  {
    name: 'closed',
    placeholder: 'Закрытый',
    elementType: 'input',
    type: 'checkbox',
  },
  {
    name: 'only_chosen_tags',
    placeholder: 'Только выбранные теги',
    elementType: 'input',
    type: 'checkbox',
  },
];

const INITIAL_VALUES = {
  title: '',
  body: '',
  only_experts_answer: false,
  closed: false,
  only_chosen_tags: false,
  tags: {},
};

const CreateQuestion = ({ title, scrollRef, onClick }) => (
  <CreatePublication
    INPUT_FIELDS={INPUT_FIELDS}
    INITIAL_VALUES={INITIAL_VALUES}
    fieldName={FIELD_NAMES.QUESTION}
    addPublication={addQuestion}
    redirectPath="/"
    title={title || 'Новый вопрос экспертам'}
    scrollRef={scrollRef}
    onClick={onClick}
  />
);

export default reduxForm({
  form: FIELD_NAMES.QUESTION,
  initialValues: INITIAL_VALUES,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(requireAuth(CreateQuestion));
