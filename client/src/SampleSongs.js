import config from './config'
export default function SampleSongs (songId) {
    var axios = require("axios").default;
    const API_KEY = config();
    
    var options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/songs/' + songId,
        headers: {
            'x-rapidapi-host': 'genius.p.rapidapi.com',
            'x-rapidapi-key': API_KEY
        }
    };
    return axios.request(options);
}
