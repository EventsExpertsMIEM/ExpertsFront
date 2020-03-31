import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
    const history = useHistory();


    const shouldNavigateAway = () => {
      if (!isLoggedIn) {
        // eslint-disable-next-line react/prop-types
        history.push('/');
      }
    };

    useEffect(shouldNavigateAway);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ChildComponent {...props} />;
  };

  return ComposedComponent;
};
