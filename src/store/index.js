import {configureStore, combineReducers, compose} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './auth/authSlice';
import planReducers from './plan/planSlice';
import userReducer from './user/userSlice';
import commonReducer from './common/commonSlice';
import coachReducer from './coach/coachSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  plan: planReducers,
  user: userReducer,
  common: commonReducer,
  coach: coachReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['auth', 'plan', 'user', 'common', 'coach'],
  // Blacklist (Don't Save Specific Reducers)
  // blacklist: ['setting', 'upload']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
