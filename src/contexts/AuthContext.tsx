import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
// router
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '~/routes/paths';
// api
import { userApi } from '~/api';
// hooks
import { useAppDispatch } from '~/hooks';
// redux
import { getCartFromServer } from '~/redux/slices/cart';
//
import { setSession } from '~/utils';
import LoadingScreen from '~/components/LoadingScreen';

interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: any | null;
}

interface PayloadAction<T> {
  type: 'INITIALIZE' | 'LOGIN' | 'LOGOUT';
  payload: T;

  [key: string]: any;
}

interface HandlerState {
  INITIALIZE: (state: AuthState, action: PayloadAction<AuthState>) => AuthState;
  LOGIN: (state: AuthState, action: PayloadAction<AuthState>) => AuthState;
  LOGOUT: (state: AuthState) => AuthState;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: HandlerState = {
  INITIALIZE: (
    state: AuthState,
    action: PayloadAction<AuthState>,
  ): AuthState => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN: (state: AuthState, action: PayloadAction<AuthState>): AuthState => {
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

const reducer = (state: AuthState, action: PayloadAction<AuthState>) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthProviderProps {
  children: ReactNode;
}

type ContextType = AuthState & {
  logout: () => void;
  dispatch: Dispatch<PayloadAction<AuthState>>;
};

const AuthContext = createContext<ContextType>({
  ...initialState,
  logout: () => {},
  dispatch: () => null,
});

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const dispatchRedux = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        if (accessToken) {
          setSession(accessToken, refreshToken);

          const { user } = await userApi.myAccount();

          if (!user.emailVerified)
            navigate(PATH_AUTH.verify, { replace: true });
          if (user.emailVerified) {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user,
              },
            });
            dispatchRedux(getCartFromServer());
          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
      setIsLoading(false);
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    setSession(null, null);
    dispatch({ type: 'LOGOUT', payload: { user: null } });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <AuthContext.Provider value={{ ...state, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
