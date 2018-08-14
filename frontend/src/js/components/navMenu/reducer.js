import {
    TOGGLE_NAVMENU
} from './actionTypes'


export default (state = {
    visible: false

}, action) => {
    switch (action.type) {
        case TOGGLE_NAVMENU:
            return {
                ...state,
                visible: !state.visible
            }
        default:
            return state
    }
}

