import { put, takeLatest } from 'redux-saga/effects'

function* showPost(action) {
    let response = yield fetch(`https://postify-api.herokuapp.com/posts/${action.body.id}`, 
        { 
            method: "GET",
            headers: {
                'access-token': localStorage.getItem("access-token"),
                'client': localStorage.getItem("client"),
                'uid': localStorage.getItem("uid")
            }
        })   
    let data = yield response.json()
    console.log(data)
    yield put({type: 'SHOW_POST', payload: data})
}

function* savePost(action) {
    console.log(JSON.stringify(action.body.post))
    console.log(action.body.id)
    function wait(ms) {
        var start = Date.now(),
            now = start;
        while (now - start < ms) {
          now = Date.now();
        }
    }
    wait(10000)
    let response = yield fetch(`https://postify-api.herokuapp.com/posts/${action.body.id}`, 
        { 
            method: "PUT",
            body: JSON.stringify(action.body.post),
            headers: new Headers({
                'content-type': 'application/json',
                'access-token': localStorage.getItem("access-token"),
                'client': localStorage.getItem("client"),
                'uid': localStorage.getItem("uid")
            }) 
        })
    let data = yield response.json()
    wait(10000)
    yield put({type: 'SAVE_POST', payload: data})
    // yield put({type: 'SET_REDUCT', payload: {reduct: false}})
    // wait(10000)
    yield put({type: 'FETCH_POST'})//
    //yield put({type: 'FETCH_POST_LIST'})
}

function* addPost(action) {
    let response = yield fetch('https://postify-api.herokuapp.com/posts',
    {
        method: "POST",
        body: JSON.stringify(action.body.state),
        headers: new Headers({
            'content-type': 'application/json',
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    yield put({type: 'FETCH_POST_LIST'})
}

function* deletePost(action) {
    // let response = yield fetch(`https://postify-api.herokuapp.com/posts/${action.body.id}`, can't identifire id
    let response = yield fetch(`https://postify-api.herokuapp.com/posts/${action.body}`,
    {
        method: "DELETE",
        headers: new Headers({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    //let data = yield response.json()
    yield put({type: 'FETCH_POST_LIST'})
}

export default function* PostSaga() {
    yield takeLatest('FETCH_POST', showPost)
    yield takeLatest('FETCH_SAVE_POST', savePost)
    yield takeLatest('FETCH_ADD_POST', addPost)
    yield takeLatest('FETCH_DELETE_POST', deletePost)
}