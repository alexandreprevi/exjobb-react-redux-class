import {
  SET_PROJECTS,
  LIKE_PROJECT,
  UNLIKE_PROJECT,
  LOADING_DATA,
  DELETE_PROJECT,
  CREATE_PROJECT,
  SET_PROJECT,
  CREATE_COMMENT,
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
  projects: [],
  project: {},
  loading: false,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return { ...state, loading: true };
    case SET_PROJECTS:
      return { ...state, projects: action.payload, loading: false };
    case SET_PROJECT:
      return { ...state, project: action.payload, loading: false };
    case CREATE_PROJECT:
      return {
        ...state,
        loading: false,
        projects: [action.payload, ...state.projects],
      };
    case DELETE_PROJECT:
      let projectToDelete = state.projects.findIndex(
        (project) => project.projectId === action.payload
      );
      state.projects.splice(projectToDelete, 1);
      return { ...state };
    case CREATE_COMMENT:
      let commentedProject = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );

      return {
        ...state,
        project: {
          ...state.project,
          comments: [action.payload, ...state.project.comments],
          commentCount: state.project.commentCount + 1,
        },
        projects: state.projects.map((project, projectsIndex) =>
          projectsIndex === commentedProject
            ? { ...project, commentCount: project.commentCount + 1 }
            : project
        ),
      };
    case LIKE_PROJECT:
    case UNLIKE_PROJECT:
      // find in the state the project that has the same id as the one we got back and replace it in the state
      let indexLiked = state.projects.findIndex(
        (project) => project.projectId === action.payload.projectId
      );
      state.projects[indexLiked] = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          likeCount: action.payload.likeCount,
        },
      };
    case FIRE_PROJECT:
    case UNFIRE_PROJECT:
      // find in the state the project that has the same id as the one we got back and replace it in the state
      let indexFired = state.projects.findIndex(
        (project) => project.projectId === action.payload.projectId
      );
      state.projects[indexFired] = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          fireCount: action.payload.fireCount,
        },
      };
    case LAUGH_PROJECT:
    case UNLAUGH_PROJECT:
      // find in the state the project that has the same id as the one we got back and replace it in the state
      let indexLaughed = state.projects.findIndex(
        (project) => project.projectId === action.payload.projectId
      );
      state.projects[indexLaughed] = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          laughCount: action.payload.laughCount,
        },
      };
    case CONFUSED_PROJECT:
    case UNCONFUSED_PROJECT:
      // find in the state the project that has the same id as the one we got back and replace it in the state
      let indexConfused = state.projects.findIndex(
        (project) => project.projectId === action.payload.projectId
      );
      state.projects[indexConfused] = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          confusedCount: action.payload.confusedCount,
        },
      };
    case ROCKET_PROJECT:
    case UNROCKET_PROJECT:
      // find in the state the project that has the same id as the one we got back and replace it in the state
      let indexRocketed = state.projects.findIndex(
        (project) => project.projectId === action.payload.projectId
      );
      state.projects[indexRocketed] = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          rocketCount: action.payload.rocketCount,
        },
      };

    default:
      return state;
  }
};
