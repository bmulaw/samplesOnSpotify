import env from "react-dotenv";

export default function GetSamplesFromGenuis (songId) {
    
    let axios = require("axios").default;
    const options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/songs/' + songId,
        headers: {
            'x-rapidapi-host': 'genius.p.rapidapi.com',
            'x-rapidapi-key': env.REACT_APP_API_KEY
        }
    };
    return axios.request(options);
}
