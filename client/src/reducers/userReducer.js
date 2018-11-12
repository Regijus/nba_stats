const initialState = {
    user: {
        name: 'guest',
        id: 'guest',
        isLogged: false
    }
}

export default function(state = initialState) {
    return state.user;
}
