import config from '../config'

export default function SongId (currentPlayingMusic) {

    let axios = require("axios").default;
    const API_KEY = config();

    const options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/search',
        params: {q: currentPlayingMusic},
        headers: {
            'x-rapidapi-host': 'genius.p.rapidapi.com',
            'x-rapidapi-key': API_KEY
        }
    };
    
    return axios.request(options);
}