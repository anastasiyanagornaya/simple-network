const initialState = {
    
} 

export function userReducer(state = initialState, action) {
     switch (action.type) {
        case 'LOGIN_USER': return state = action.payload
        case 'SET_REDIRECT': return { ...state, redirect: action.payload }
        case 'SET_LOGGEDIN': return { ...state, isLoggedIn: action.payload }
        case 'SET_LOGGEDOUT': return { ...state, isLoggedIn: action.payload }
        case 'PROFILE_USER': return state = action.payload
     default:
        return state
     }
 }  