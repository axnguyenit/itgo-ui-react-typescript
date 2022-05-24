import axios from './axios';

type Session = string | null;

const setSession = (accessToken: Session, refreshToken: Session) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    refreshToken && localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setSession;
