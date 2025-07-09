import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';

const withSnackbar = <P extends object>(
  WrappedComponent: React.ComponentType<
    P & {
      showSnackbar: (message: string) => void;
    }
  >
) => {
  const ComponentWithSnackbar = (props: Omit<P, 'showSnackbar'>) => {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const showSnackbar = (message: string) => {
      setMessage(message);
      setOpen(true);
    };

    return (
      <>
        <WrappedComponent {...(props as P)} showSnackbar={showSnackbar} />
        <Snackbar open={open} message={message} />
      </>
    );
  };

  return ComponentWithSnackbar;
};

export default withSnackbar;
