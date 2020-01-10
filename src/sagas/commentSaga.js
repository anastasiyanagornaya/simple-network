import { put, takeLatest } from 'redux-saga/effects'

function* showComments() { //loading comments'list
    // let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body.id}`,
    let response = yield fetch('https://postify-api.herokuapp.com/comments', { 
        method: "GET",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    console.log(data.data)
    yield put({type: 'SHOW_COMMENTS', payload: data})
}

function* showComment(action) { //loading one comment
    let response = yield fetch(`https://postify-api.herokuapp.com/comments`, { 
    // let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body.id}`, { 
        method: "GET",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let comment = yield response.json()
    yield put({type: 'SHOW_COMMENT', payload: comment})
}

function* addComment(action) {
    // let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body.id}`, { 
    let response = yield fetch(`https://postify-api.herokuapp.com/comments`, { 
        method: "POST",
        body: JSON.stringify(action.body.comment),
        headers: new Headers ({
            'content-type': 'application/json',
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    console.log('comment-response', data)
    // yield put({type: 'ADD_COMMENT', payload: data})
    yield put({type: 'FETCH_SHOW_COMMENTS'})
}

function* saveComment(action) { //edit existing comment
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body.id}`, { 
        method: "PUT",
        body: JSON.stringify(action.body.message),
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    console.log('comment-response', data)
    // yield put({type: 'ADD_COMMENT', payload: data})
}

function* deleteComment(action) {
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body.id}`, { 
        method: "DELETE",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    console.log(data)
    // yield put({type: 'ADD_COMMENT', payload: data})
}

export default function* commentSaga() {
    yield takeLatest('FETCH_SHOW_COMMENTS', showComments)
    yield takeLatest('FETCH_SHOW_COMMENT', showComment)
    yield takeLatest('FETCH_ADD_COMMENT', addComment)
    yield takeLatest('FETCH_SAVE_COMMENT', saveComment)
    yield takeLatest('FETCH_DELETE_COMMENT', deleteComment)
}