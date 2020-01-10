const initialState = {
    loading: true,
    data: [],
    comment: {}
} 
 export function commentReducer(state = initialState, action) {
     switch (action.type) {
        case 'SHOW_COMMENTS': return {...state, loading: false, data: action.payload}//loading comments' list
        case 'SHOW_COMMENT': return {...state, comment: action.payload}//loading one comment
        default: return state
     }
 }