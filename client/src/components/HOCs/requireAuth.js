import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserLoginStatus } from '../../actions';

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const shouldNavigateAway = () => {
      (async () => {
        const { is_logged_in } = await dispatch(getUserLoginStatus());
        if (!is_logged_in) {
          history.push('/');
        }
      })();
    };

    useEffect(shouldNavigateAway, []);

    if (!user.isLoggedIn) {
      return (
        <div className="text-center">
          <h6>Проверка статуса авторизации...</h6>
        </div>
      );
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ChildComponent {...props} />;
  };

  return ComposedComponent;
};
