import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  UPDATE_STATUS_NOTIFICATIONS_READ,
  LEAVE_PROJECT,
  JOIN_PROJECT,
  LOADING_DATA,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("DITToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateNotificationStatusToRead =
  (notificationIds) => (dispatch) => {
    axios
      .post(`/notifications`, notificationIds)
      .then((res) => {
        dispatch({ type: UPDATE_STATUS_NOTIFICATIONS_READ });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const joinOneProject = (projectId) => (dispatch) => {
  axios
    .post(`/project/${projectId}/join`)
    .then((res) => {
      dispatch({ type: JOIN_PROJECT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const leaveOneProject = (projectId) => (dispatch) => {
  axios
    .post(`/project/${projectId}/leave`)
    .then((res) => {
      dispatch({ type: LEAVE_PROJECT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const setAuthorizationHeader = (token) => {
  const DITToken = `Bearer ${token}`;
  localStorage.setItem("DITToken", DITToken);
  axios.defaults.headers.common["Authorization"] = DITToken;
};
