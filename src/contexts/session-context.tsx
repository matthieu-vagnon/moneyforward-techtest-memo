import { createContext } from 'react';

type SessionContextType = {
  sessionStatus: boolean | undefined;
  setSessionStatus: (status: boolean) => void;
  accessToken: string | undefined;
  setAccessToken: (token: string) => void;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);
