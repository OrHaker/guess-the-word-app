import * as ACTION_TYPES from "./action_types";

export const setUserMaxSequenceWinsAction = (wins) => {
  return {
    type: ACTION_TYPES.SET_USER_WINS,
    payload: wins,
  };
};

export const setUserFailsAction = (fails) => {
  return {
    type: ACTION_TYPES.SET_USER_FAILS,
    payload: fails,
  };
};


export const setWinnigDataAction = (data) => {
  return {
    type: ACTION_TYPES.SET_WINNIG_DATA,
    payload: data,
  };
};