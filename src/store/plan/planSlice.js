import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'plans/initialSetupRequest',
  async data => {
    return data;
  },
);

export const companyNotifications = createAsyncThunk(
  'plan/companyNotifications',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged out!',
        notiData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        notiData: false,
      };
    }
  },
);

export const clearPlans = createAsyncThunk('plans/clearPlans', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success!',
      isData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      isData: undefined,
    };
  }
});

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  notifications: [],
};

const planSlice = createSlice({
  name: 'plan',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [companyNotifications.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.notifications = action.payload.notiData;
    },
    [clearPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.notifications = [];
    },
  },
});

export default planSlice.reducer;
