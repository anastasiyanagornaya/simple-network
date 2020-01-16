import { put, takeLatest } from 'redux-saga/effects'

function* showComments() {
    let response = yield fetch('https://postify-api.herokuapp.com/comments', { 
        method: "GET",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    console.log(data)
    data.sort(function(a, b){return (b.created_at < a.created_at)?-1:1})
    console.log('sorted-data', data)
    yield put({type: 'SHOW_COMMENTS', payload: data})
}

function* showComment(action) { //loading one comment
    console.log(action)
    console.log(action.body)
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body}`, { 
        method: "GET",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let comment = yield response.json()
    console.log('data_comment', comment)
    yield put({type: 'SHOW_COMMENT', payload: comment})
}

function* addComment(action) {
    console.log('comment', action.body.body)
    let response = yield fetch(`https://postify-api.herokuapp.com/comments`, { 
        method: "POST",
        body: JSON.stringify(action.body.body),
        headers: new Headers ({
            'content-type': 'application/json',
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    console.log('comment-response', data)
    yield put({type: 'FETCH_SHOW_COMMENTS'})
}

function* saveComment(action) { //edit existing comment
    console.log('newMessage', action.body.message)
    console.log(action.body.id)
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body.id}`, { 
        method: "PUT",
        body: JSON.stringify(action.body.message),
        headers: new Headers ({
            'content-type': 'application/json',
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let comment = yield response.json()
    console.log('comment-response', comment)
    yield put({type: 'FETCH_SHOW_COMMENTS'})
}

function* deleteComment(action) {
   let id = JSON.stringify(action.body)
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${id}`, { 
        method: "DELETE",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    console.log('action.body', action.body)
    let data = yield response
    console.log('data', data)
    yield put({type: 'FETCH_SHOW_COMMENTS'})
}

export default function* commentSaga() {
    yield takeLatest('FETCH_SHOW_COMMENTS', showComments)
    yield takeLatest('FETCH_SHOW_COMMENT', showComment)
    yield takeLatest('FETCH_ADD_COMMENT', addComment)
    yield takeLatest('FETCH_SAVE_COMMENT', saveComment)
    yield takeLatest('FETCH_DELETE_COMMENT', deleteComment)
}