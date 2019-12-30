export function setUser(name) {
    return {
        type: 'SET_USER',
        payload: name,
    }
}