import { setSession } from '@/utils';
import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: any | null;
}

interface PayloadAction {
  type: 'INITIALIZE' | 'LOGIN' | 'LOGOUT';
  payload: AuthState;

  [key: string]: any;
}

interface HandlerState {
  INITIALIZE: (state: AuthState, action: PayloadAction) => AuthState;
  LOGIN: (state: AuthState, action: PayloadAction) => AuthState;
  LOGOUT: (state: AuthState) => AuthState;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: HandlerState = {
  INITIALIZE: (state: AuthState, action: PayloadAction): AuthState => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN: (state: AuthState, action: PayloadAction): AuthState => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  LOGOUT: (state: AuthState): AuthState => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state: AuthState, action: PayloadAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthProviderProps {
  children: ReactNode;
}

type ContextType = AuthState & {
  dispatch: Dispatch<PayloadAction>;
};

const AuthContext = createContext<ContextType>({
  ...initialState,
  dispatch: () => null,
});

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
