/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { change } from 'redux-form';
import { FIELD_NAMES } from '../helpers/consts';

const TagsSelector = (props) => {
  const { allTags, tags } = props;
  const dispatch = useDispatch();

  const removeTag = (nameToRemove) => dispatch(change(FIELD_NAMES[props.fieldName], 'tags', { ...tags, [nameToRemove]: false }));

  const selectTag = (name) => dispatch(change(FIELD_NAMES[props.fieldName], 'tags', { ...tags, [name]: true }));

  return (
    <div className="tags-input">
      <ul id="tags">
        {Object.entries(tags).map(([tagName, isSelected]) => (
          isSelected && (
          <li key={tagName} className="tag">
            <span className="tag-title">{tagName}</span>
            <span className="tag-close-icon" onClick={() => removeTag(tagName)}>
              x
            </span>
          </li>
          )
        ))}
      </ul>
      <select onChange={(e) => selectTag(e.target.value)}>
        <option value="" defaultValue readOnly>Выберите тэг</option>
        {Object.entries(allTags).map(([tagName, isSelected]) => !isSelected
                    && <option key={tagName} value={tagName}>{tagName}</option>)}
      </select>
    </div>
  );
};

export default TagsSelector;
