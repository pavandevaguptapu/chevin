import { GET_All_TEAMS } from "../constants/action-types";

const defaultState = { teamsArray: [] };

const teamReducer = (state = defaultState, action) => {       
        switch (action.type) {      
        case "GET_All_TEAMS":{
            state.teamsArray=[]
            for(var i=0;i<action.payload.length;i++){
                //Object.assign({},state,{teamsArray:(action.payload[i])})
                state.teamsArray=state.teamsArray.concat(action.payload[i]);
            }
            return state
        }
        
        default:
            return state;
    }
};

export default teamReducer;
