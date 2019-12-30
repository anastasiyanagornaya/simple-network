const initialState = {
    loading: true,
    data: [],
    post: []
}

export function postReducer(state=initialState, action) {
    switch (action.type) {
    case 'POST_LIST': return {...state, loading: false, data: action.payload}
    case 'SHOW_POST': return {...state, post: action.payload}
    case 'SAVE_POST': return {...state, post: action.payload}
    case 'ADD_POST': return {...state, data: action.payload}
    default:
    return state
    }
}  