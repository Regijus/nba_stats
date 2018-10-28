const initialState = {
    user: {
        name: 'guest',
        id: 'guest',
        isLogged: true
    }
}

export default function(state = initialState) {
    return state.user;
}
