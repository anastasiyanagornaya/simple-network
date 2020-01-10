import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import postListSaga from './postListSaga'
import postSaga from './postSaga'
import commentSaga from './commentSaga'

export default function* rootSaga() {
  yield all([
    userSaga(),
    postListSaga(),
    postSaga(),
    commentSaga()
  ])
}