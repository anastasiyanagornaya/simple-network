export const addPostFetch = post => {
    return dispatch => {
        return fetch('https://postify-api.herokuapp.com/posts',
        {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                'access-token': localStorage.getItem("access-token"),
                'client': localStorage.getItem("client"),
                'uid': localStorage.getItem("uid")
            }
        }).then(response => {
            response.json().then(data => {
                console.log('response-data', data)
                dispatch(addPost(post))
                console.log('user', post)            
            })
        })
    }
}

const addPost = userObj => ({
    type: 'ADD_POST',
    payload: userObj
})

