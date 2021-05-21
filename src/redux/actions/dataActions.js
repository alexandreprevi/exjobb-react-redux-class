import {
  SET_PROJECTS,
  LOADING_DATA,
  LIKE_PROJECT,
  UNLIKE_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_PROJECT,
  CREATE_COMMENT,
  FIRE_PROJECT,
  UNFIRE_PROJECT,
  LAUGH_PROJECT,
  CONFUSED_PROJECT,
  ROCKET_PROJECT,
  UNLAUGH_PROJECT,
  UNCONFUSED_PROJECT,
  UNROCKET_PROJECT,
} from "../types";
import axios from "axios";

export const getAllProjects = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/projects")
    .then((res) => {
      dispatch({ type: SET_PROJECTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_PROJECTS, payload: [] });
    });
};

export const getOneProject = (projectId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/project/${projectId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_PROJECT, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOneUser = (username) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({ type: SET_PROJECTS, payload: res.data.projects });
    })
    .catch(() => {
      dispatch({ type: SET_PROJECTS, payload: [] });
    });
};

export const addReactionToOneProject = (projectId, type) => (dispatch) => {
  axios
    .post(`/project/${projectId}/${type}/add`)
    .then((res) => {
      switch (type) {
        case "like":
          return dispatch({ type: LIKE_PROJECT, payload: res.data });
        case "fire":
          return dispatch({ type: FIRE_PROJECT, payload: res.data });
        case "laugh":
          return dispatch({ type: LAUGH_PROJECT, payload: res.data });
        case "confused":
          return dispatch({ type: CONFUSED_PROJECT, payload: res.data });
        case "rocket":
          return dispatch({ type: ROCKET_PROJECT, payload: res.data });
        default:
          return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeReactionFromOneProject = (projectId, type) => (dispatch) => {
  axios
    .post(`/project/${projectId}/${type}/remove`)
    .then((res) => {
      switch (type) {
        case "like":
          return dispatch({ type: UNLIKE_PROJECT, payload: res.data });
        case "fire":
          return dispatch({ type: UNFIRE_PROJECT, payload: res.data });
        case "laugh":
          return dispatch({ type: UNLAUGH_PROJECT, payload: res.data });
        case "confused":
          return dispatch({ type: UNCONFUSED_PROJECT, payload: res.data });
        case "rocket":
          return dispatch({ type: UNROCKET_PROJECT, payload: res.data });
        default:
          return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteOneProject = (projectId) => (dispatch) => {
  axios
    .delete(`/project/${projectId}`)
    .then(() => {
      dispatch({ type: DELETE_PROJECT, payload: projectId });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createOneProject = (newProject) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/project", newProject)
    .then((res) => {
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const createOneComment = (projectId, newComment) => (dispatch) => {
  axios
    .post(`/project/${projectId}/comment`, newComment)
    .then((res) => {
      dispatch({ type: CREATE_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
