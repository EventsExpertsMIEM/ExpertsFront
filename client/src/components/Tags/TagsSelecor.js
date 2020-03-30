/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTags } from '../../actions';

const mapTagsToSelected = (tags) => tags.reduce((acc, { name }) => {
  acc[name] = false;
  return acc;
}, {});

const TagsInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const [tags, setTags] = useState(props.tags);
  const dispatch = useDispatch();

  const removeTag = (nameToRemove) => setTags({ ...tags, [nameToRemove]: false });

  const selectTag = (name) => setTags({ ...tags, [name]: true });

  useEffect(() => {
    dispatch(getAllTags());
    setTags(props.tags);
  }, [JSON.stringify(props.tags)]);

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
        {Object.entries(tags).map(([tagName, isSelected]) => !isSelected
                    && <option key={tagName} value={tagName}>{tagName}</option>)}
      </select>
    </div>
  );
};

const TagsSelecor = () => {
  const tags = useSelector((store) => store.tags);

  return (
    <div>
      <TagsInput tags={mapTagsToSelected(tags)} />
    </div>
  );
};

export default TagsSelecor;
