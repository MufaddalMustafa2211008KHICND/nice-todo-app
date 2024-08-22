import React, { useEffect } from 'react';

interface AlertProps {
  type: string;
  msg: string;
  removeAlert: () => void;
  list: any[];
}

const Alert: React.FC<AlertProps> = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
