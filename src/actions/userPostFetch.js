export const userPostFetch = user=> {
    return dispatch => {
        return fetch('https://postify-api.herokuapp.com/auth',{
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            let access_token = response.headers.get('access-token')
            let client_token = response.headers.get('client')
            let uid_token = response.headers.get('uid')
            localStorage.setItem("access-token", access_token)
            localStorage.setItem("client", client_token)
            localStorage.setItem("uid", uid_token)
            response.json().then(data => {
            console.log('response-data', data)
            dispatch(loginUser(data))
            let redirect = {redirect: true}
            //let isLoggedIn = {isLoggedIn: true}
            dispatch(setRedirect(redirect))
            //dispatch(setLoggedIn(isLoggedIn))
            console.log('user',user) 
        })
    })
}
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

const setRedirect = userObj => ({
    type: 'SET_REDIRECT',
    payload: userObj
})

// const setLoggedIn = userObj => ({
//     type: 'SET_LOGGEDIN',
//     payload: userObj
// })

        
//user.first_name = data.firs_name, user.last_name = data.last_name, user.email = data.email