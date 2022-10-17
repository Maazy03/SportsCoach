import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'user/initialSetupRequest',
  async data => {
    return data;
  },
);

export const coachBoarding = createAsyncThunk(
  'common/coachBoarding',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const clearCoach = createAsyncThunk('user/clearCoach', async data => {
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
  isOnBoard: false,
};

const coachSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //ONBOARDING COACH
    [coachBoarding.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.isOnBoard = action.payload.isData;
    },

    [clearCoach.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.user = undefined;
      state.userToken = '';
      state.allLeads = [];
      state.companyStats = undefined;
      state.allPackages = [];
      state.userCards = [];
      state.isOnBoard = false;
      state.notifications = [];
    },
  },
});

export default coachSlice.reducer;
