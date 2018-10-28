const initialState = {
    players: [
        {
            name: "LeBron James",
            team: "Los Angeles Lakers",
            id: '416483'
        },
        {
            name: "Stephen Curry",
            team: "Golden State Warriors",
            id: '201939'
        }
    ]
};

export default function(state = initialState) {
    return state.players;
}
