import React from 'react';
import { reduxForm } from 'redux-form';
import requireAuth from '../../HOCs/requireAuth';
import { FIELD_NAMES } from '../../../helpers/consts';
import {
  maxValue1024, maxValue128, minValue28, required, trim, uppercase,
} from '../../../helpers/helpers';
import { addArticle } from '../../../actions';
import CreatePublication from '../Publication/CreatePublication';

const INPUT_FIELDS = [
  {
    name: 'title',
    placeholder: 'Тема статьи',
    validate: [required, minValue28, maxValue128],
    elementType: 'input',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
  {
    name: 'body',
    placeholder: 'Текст статьи',
    validate: [required, maxValue1024],
    elementType: 'textarea',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
];

const INITIAL_VALUES = {
  title: '',
  body: '',
  tags: {},
};

const CreateArticle = ({ title, scrollRef, onClick }) => (
  <CreatePublication
    INPUT_FIELDS={INPUT_FIELDS}
    INITIAL_VALUES={INITIAL_VALUES}
    fieldName={FIELD_NAMES.ARTICLE}
    addPublication={addArticle}
    redirectPath="/articles"
    title={title || 'Новая статья'}
    scrollRef={scrollRef}
    onClick={onClick}
  />
);

export default reduxForm({
  form: FIELD_NAMES.ARTICLE,
  initialValues: INITIAL_VALUES,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(requireAuth(CreateArticle));
