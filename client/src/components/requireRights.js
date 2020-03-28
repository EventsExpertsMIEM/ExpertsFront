import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ROLES } from '../actions/types';

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const role = useSelector((store) => store.user.role);
    const history = useHistory();

    const shouldNavigateAway = () => {
      if (role !== ROLES.SUPERADMIN && role !== ROLES.ADMIN) {
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
