import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'common/initialSetupRequest',
  async data => {
    return data;
  },
);

export const progressBar = createAsyncThunk(
  'common/progressBar',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged out!',
        isData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        isData: false,
      };
    }
  },
);

export const notifyModal = createAsyncThunk(
  'common/notifyModal',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged out!',
        isData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        isData: false,
      };
    }
  },
);

export const socketREF = createAsyncThunk('common/socketREF', async data => {
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
});

export const PopOverMenu = createAsyncThunk(
  'common/PopOverMenu',
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

export const bubbleReportChat = createAsyncThunk(
  'common/bubbleReportChat',
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

export const clearCommon = createAsyncThunk(
  'common/clearCommon',
  async data => {
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
  },
);

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  socket: undefined,
  isShowAgain: false,
  progressCount: 0.11,
  isCustomHandler: false,
  bubbleChat: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //LOGOUT
    [progressBar.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.progressCount = action.payload.isData;
    },
    [socketREF.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.socket = action.payload.isData;
    },
    [notifyModal.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.isShowAgain = action.payload.isData;
    },
    [PopOverMenu.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.isCustomHandler = action.payload.isData;
    },
    [bubbleReportChat.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.bubbleChat = action.payload.isData;
    },
    [clearCommon.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.authCoordinates = [];
      state.certificates = [];
      state.certificateNames = [];
      state.services = [];
      state.serviceNames = [];
      state.socket = undefined;
      state.notificationsSeen = [];
      state.progressCount = 0.11;
    },
  },
});

export default commonSlice.reducer;
