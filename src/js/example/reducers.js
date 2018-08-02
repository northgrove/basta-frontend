import {
    EXAMPLE_ACTION
} from './actionTypes'

export const exampleReducer = (state = {
    example: ''
}, action) => {
    switch (action.type) {

        case EXAMPLE_ACTION:
            return {
                example: "set"
            }
        default:
            return state
    }
}
