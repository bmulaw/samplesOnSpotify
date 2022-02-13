import env from "react-dotenv";

export default function GetSongIdFromGenuis(currentPlayingMusic) {

    let axios = require("axios").default;
    const options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/search',
        params: {q: currentPlayingMusic},
        headers: {
            'x-rapidapi-host': 'genius.p.rapidapi.com',
            'x-rapidapi-key': env.API_KEY
        }
    };
    
    return axios.request(options);
}