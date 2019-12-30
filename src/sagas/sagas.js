import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import postListSaga from './postListSaga'
import postSaga from './postSaga'

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    userSaga(),
    postListSaga(),
    postSaga()
  ])
}