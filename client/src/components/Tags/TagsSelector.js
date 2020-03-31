/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { change } from 'redux-form';
import { FIELD_NAMES } from '../../helpers/consts';

const TagsSelector = ({ tags, fieldName }) => {
  const dispatch = useDispatch();

  const removeTag = (nameToRemove) => dispatch(change(FIELD_NAMES[fieldName], 'tags', {
    ...tags,
    [nameToRemove]: false,
  }));

  const selectTag = (name) => dispatch(change(FIELD_NAMES[fieldName], 'tags', {
    ...tags,
    [name]: true,
  }));

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
      {!Object.values(tags).every(Boolean) && (
        <select className="custom-select custom-select-sm" multiple size={3} onChange={(e) => selectTag(e.target.value)}>
          <option value="" defaultValue readOnly disabled>Выберите тэги</option>
          {Object.entries(tags).map(([tagName, isSelected]) => !isSelected
                        && <option key={tagName} value={tagName}>{tagName}</option>)}
        </select>
      )}
    </div>
  );
};

export default TagsSelector;
