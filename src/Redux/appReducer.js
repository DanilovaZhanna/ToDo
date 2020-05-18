import { ERROR } from "./constants";

const initState = {
    error: null
};
export default function appReducer(state = initState,action) {
    switch(action.type) {
        case ERROR: return {
            ...state,
            error:action.error
        };
        default: return state;
    }
}