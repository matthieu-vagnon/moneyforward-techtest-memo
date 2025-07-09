import { useState } from 'react';
import { SessionContext } from './session-context';

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sessionStatus, setSessionStatus] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  return (
    <SessionContext.Provider
      value={{ sessionStatus, setSessionStatus, accessToken, setAccessToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};
