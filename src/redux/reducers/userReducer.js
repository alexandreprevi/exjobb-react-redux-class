import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_PROJECT,
  UNLIKE_PROJECT,
  UPDATE_STATUS_NOTIFICATIONS_READ,
  FIRE_PROJECT,
  UNFIRE_PROJECT,
  LAUGH_PROJECT,
  UNLAUGH_PROJECT,
  CONFUSED_PROJECT,
  UNCONFUSED_PROJECT,
  ROCKET_PROJECT,
  UNROCKET_PROJECT,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return { ...state, loading: true };

    // REACTIONS
    case LIKE_PROJECT:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            projectId: action.payload.projectId,
          },
        ],
      };
    case UNLIKE_PROJECT:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.projectId !== action.payload.projectId
        ),
      };
    case FIRE_PROJECT:
      return {
        ...state,
        fires: [
          ...state.fires,
          {
            username: state.credentials.username,
            projectId: action.payload.projectId,
          },
        ],
      };
    case UNFIRE_PROJECT:
      return {
        ...state,
        fires: state.fires.filter(
          (fire) => fire.projectId !== action.payload.projectId
        ),
      };
    case LAUGH_PROJECT:
      return {
        ...state,
        laughs: [
          ...state.laughs,
          {
            username: state.credentials.username,
            projectId: action.payload.projectId,
          },
        ],
      };
    case UNLAUGH_PROJECT:
      return {
        ...state,
        laughs: state.laughs.filter(
          (laugh) => laugh.projectId !== action.payload.projectId
        ),
      };
    case CONFUSED_PROJECT:
      return {
        ...state,
        confuseds: [
          ...state.confuseds,
          {
            username: state.credentials.username,
            projectId: action.payload.projectId,
          },
        ],
      };
    case UNCONFUSED_PROJECT:
      return {
        ...state,
        confuseds: state.confuseds.filter(
          (confused) => confused.projectId !== action.payload.projectId
        ),
      };
    case ROCKET_PROJECT:
      return {
        ...state,
        rockets: [
          ...state.rockets,
          {
            username: state.credentials.username,
            projectId: action.payload.projectId,
          },
        ],
      };
    case UNROCKET_PROJECT:
      return {
        ...state,
        rockets: state.rockets.filter(
          (rocket) => rocket.projectId !== action.payload.projectId
        ),
      };
    case UPDATE_STATUS_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => (notification.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
};
