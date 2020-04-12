/* eslint-disable react/prop-types, react/destructuring-assignment, no-shadow */
import React, {
  Fragment, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDetailedDateTime } from '../../../../helpers/helpers';
import { deleteAvatar, getAvatar, loadAvatar } from '../../../../actions';
import { DEFAULT_AVATAR } from '../../../../helpers/consts';

const format = (value) => {
  const isArray = Array.isArray(value);
  if (value === undefined || (isArray && !value.length)) {
    return '—';
  }

  if (isArray) {
    return value.join(', ');
  }
  return value;
};

const PersonalInfo = (props) => {
  const {
    name,
    surname,
    email,
    role,
    tags,
    interests,
    position,
    rating,
    registrationDate,
    questionCount,
    articleCount,
    commentCount,
  } = props.user;

  const MAP = {
    Имя: name,
    Фамилия: surname,
    'Электронная почта': email,
    Роль: role,
    Тэги: tags,
    Интересы: interests,
    Должность: position,
    Рейтинг: rating,
    'Дата регистрации': formatDetailedDateTime(registrationDate),
    'Количество вопросов': questionCount,
    'Количество статей': articleCount,
    'Количество комментариев': commentCount,
  };

  const dispatch = useDispatch();
  const ref = useRef(null);
  const user = useSelector((store) => store.user);
  const avatar = useSelector((store) => store.avatar);

  const onChange = async (e) => {
    const { files: [file] } = e.target;
    const formData = new FormData();
    formData.append('file', file);
    await dispatch(loadAvatar(user.id, formData));
    await dispatch(getAvatar(user.id));
  };

  useEffect(() => {
    (async () => {
      if (!avatar[user.id]) {
        await dispatch(getAvatar(user.id));
      }
    })();
  }, [user.id, avatar, dispatch]);

  // eslint-disable-next-line no-unused-vars
  const avatarEdit = () => {
    if (avatar[user.id]) {
      return (
        <div className="text-center">
          <button
            className="btn btn-sm btn-outline-danger m-3"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteAvatar(user.id));
            }}
          >
            Удалить фото
          </button>
        </div>
      );
    }

    return (
      <div className="text-center">
        <input
          className="d-none"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
          ref={ref}
        />
        <button
          className="btn btn-sm btn-outline-dark m-3"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            return ref.current.click();
          }}
        >
          Загрузить фото
        </button>
      </div>
    );
  };

  return (
    <form id="personal-info">
      <div
        className="tab-pane fade show active text-center mt-3"
        id="personal-info-tab"
        role="tabpanel"
        aria-labelledby="nav-personal-tab"
      >
        <img
          alt="User Pic"
          src={avatar[user.id] || DEFAULT_AVATAR}
          id="profile-image1"
          className="img-fluid rounded"
          style={{ width: '15rem' }}
        />
        {avatarEdit()}
        <dl>
          {Object.entries(MAP).map(([key, value]) => (
            (
              <Fragment key={key}>
                <dt>{key}</dt>
                <dd>{format(value)}</dd>
              </Fragment>
            )
          ))}
        </dl>
      </div>
    </form>
  );
};

export default PersonalInfo;
