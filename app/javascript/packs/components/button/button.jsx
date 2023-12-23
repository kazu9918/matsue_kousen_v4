import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({ url, children }) => {
  return (
    <Link to={url}>
      <button>{children}</button>
    </Link>
  );
};
