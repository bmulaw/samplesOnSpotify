export default function SampleSongs (songId) {
    var axios = require("axios").default;
    
    var options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/songs/' + songId,
        headers: {
            'x-rapidapi-host': 'genius.p.rapidapi.com',
            'x-rapidapi-key': 'dfcaddd723msh6b216a6f6b60baep1fb122jsn29391c842471'
        }
    };
    return axios.request(options);
}
