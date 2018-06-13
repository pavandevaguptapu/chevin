import { GET_All_TEAMS } from "../constants/action-types";

const defaultState = { teamsArray: [] };

const teamReducer = (state = defaultState, action) => {
    console.log(action)
    switch (action.type) {
        case GET_All_TEAMS.type:
            return { ...state, teamsArray: action.payload };
        default:
            return state;
    }
};

export default teamReducer;
