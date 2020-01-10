import { combineReducers } from 'redux'
import { userReducer } from './user'
import { postReducer } from './post'
import { commentReducer } from './comment'

export const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    comment: commentReducer
}) 