import * as ACTION_TYPES from "../actions/action_types";

const initState = {
  userMaxSequenceWins: 0,
  userFails: 0,
  winnigData: []
};

const userReducer = (state = initState, { payload, type }) => {
  switch (type) {
    case ACTION_TYPES.SET_USER_WINS:
      return { ...state, userMaxSequenceWins: payload };
    case ACTION_TYPES.SET_USER_FAILS:
      return { ...state, userFails: payload };
    case ACTION_TYPES.SET_WINNIG_DATA:
      return { ...state, winnigData: payload };
    default:
      return state;
  }
};

export default userReducer;
