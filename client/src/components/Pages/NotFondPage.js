import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center">
    <h1>Error 404: Page is not found</h1>
    <Link
      className="nav-link active"
      id="nav-personal-tab"
      to="/"
      role="tab"
      aria-controls="personal-info-tab"
    >
      На главную
    </Link>
  </div>
);

export default NotFound;
