import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

    const shouldNavigateAway = () => {
      if (!isLoggedIn) {
        // eslint-disable-next-line react/prop-types
        props.history.push('/');
      }
    };

    useEffect(shouldNavigateAway);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ChildComponent {...props} />;
  };

  return ComposedComponent;
};
