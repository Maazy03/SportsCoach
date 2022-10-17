import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'user/initialSetupRequest',
  async data => {
    return data;
  },
);

export const getUserData = createAsyncThunk('auth/getUserData', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged in!',
      userData: data?.data?.user,
      userToken: data?.data?.token,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      userData: undefined,
      userToken: undefined,
    };
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async data => {
  try {
    return {
      status: 'success',
      userData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: error.code,
    };
  }
});

export const updateUserToken = createAsyncThunk(
  'user/updateUserToken',
  async data => {
    try {
      return {
        status: 'success',
        userData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: error.code,
      };
    }
  },
);

export const getUserCards = createAsyncThunk(
  'auth/getUserCards',
  async data => {
    try {
      return {
        status: 'success',
        cardsData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: error.code,
        cardsData: undefined,
      };
    }
  },
);

export const getAllLeads = createAsyncThunk('user/getAllLeads', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged out!',
      location: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      location: false,
    };
  }
});

export const getAllPackages = createAsyncThunk(
  'user/getAllPackages',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged out!',
        location: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        location: false,
      };
    }
  },
);

export const getCompanyStats = createAsyncThunk(
  'user/getCompanyStats',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged out!',
        location: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        location: false,
      };
    }
  },
);

export const clearUser = createAsyncThunk('user/clearUser', async data => {
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
  user: undefined,
  userToken: '',
  allLeads: [],
  allPackages: [],
  companyStats: undefined,
  userCards: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },

    [getUserData.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
    },

    [getUserData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;

      state.user = action.payload.userData;
      state.userToken = action.payload.userToken;
    },
    // UPDATE USER
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.user = action.payload.userData;
    },
    // UPDATE USER TOKEN
    [updateUserToken.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.userToken = action.payload.userData;
    },
    [getUserCards.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.userCards = action.payload.cardsData;
    },

    [getAllLeads.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.allLeads = action.payload.location;
    },
    [getAllPackages.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.allPackages = action.payload.location;
    },
    [getCompanyStats.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.companyStats = action.payload.location;
    },

    [clearUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.user = undefined;
      state.userToken = '';
      state.allLeads = [];
      state.companyStats = undefined;
      state.allPackages = [];
      state.userCards = [];
      state.notifications = [];
    },
  },
});

export default userSlice.reducer;
