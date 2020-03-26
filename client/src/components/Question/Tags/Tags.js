/* eslint-disable react/prop-types, react/destructuring-assignment */

import React, { useState } from 'react';
import { change } from 'redux-form';
import ReactTags from 'react-tag-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { FIELD_NAMES } from '../../helpers/consts';

const Tags = (props) => {
  console.log(props);
  const initialTags = useSelector((store) => store.form.question
      && store.form.question.values
      && store.form.question.values.tags);
  const [tags, setTags] = useState(initialTags);
  // eslint-disable-next-line no-unused-vars
  const [suggestions, setSuggestions] = useState(props.suggestions);
  const dispatch = useDispatch();

  const handleDelete = (i) => {
    tags.splice(i, 1);
    setTags(tags);
    dispatch(change(FIELD_NAMES.QUESTION, 'tags', tags));
  };

  const handleAddition = (tag) => {
    const newTags = [].concat(tags, tag);
    setTags(newTags);
    dispatch(change(FIELD_NAMES.QUESTION, 'tags', newTags));
  };

  return (
    <>
      <p>Научные области (теги)</p>
      <ReactTags
        tags={tags}
        noSuggestionsText="No tags found"
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        minQueryLength={1}
        autofocus={false}
      />
    </>
  );
};

export default Tags;