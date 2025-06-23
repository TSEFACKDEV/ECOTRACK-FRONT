import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { useEffect } from 'react';

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const isAuthenticated = !!token;

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    // Optionally, you can add logic here to check for token expiration or refresh
  }, [token]);

  return {
    user,
    isAuthenticated,
    handleLogout,
  };
};

export default useAuth;