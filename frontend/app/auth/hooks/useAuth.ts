'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setAuthenticated, Logout } from '../../store/reducers/authSlice';
import { logoutAction } from '../server/actions';

export function useAuth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const logout = async () => {
    await logoutAction();
    dispatch(Logout());
  };

  const setAuth = (value: boolean) => {
    dispatch(setAuthenticated(value));
  };

  return { isAuthenticated, logout, setAuth };
}
