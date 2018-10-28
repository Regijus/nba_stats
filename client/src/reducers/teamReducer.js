const initialState = {
    teams: [
        {
            name: "Los Angeles Lakers",
            id: '1610612747'
        },
        {
            name: "Chicago Bulls",
            id: '1610612741'
        }
    ]
};

export default function(state = initialState) {
    return state.teams;
}
