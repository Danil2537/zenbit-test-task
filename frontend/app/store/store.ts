import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import rootReducer from './reducers/rootPageSlice';
import loginPageReducer from './reducers/loginPageSlice';
import signupPageReducer from './reducers/signupPageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rootPage: rootReducer,
    loginPage: loginPageReducer,
    signupPage: signupPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
