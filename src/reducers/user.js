const initialState = {
    
} 

export function userReducer(state = initialState, action) {
     switch (action.type) {
        case 'SET_REDIRECT': return { ...state, redirect: action.payload }
        case 'PROFILE_USER': return state = action.payload
        default: return state
     }
 }  