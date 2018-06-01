import { SET_SELECTED_TEAM } from "../constants/action-types";

const defaultState = { selectedTeamId: '' };

const teamReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SELECTED_TEAM:
            return { ...state, selectedTeamId: action.payload };
        default:
            return state;
    }
};

export default teamReducer;
