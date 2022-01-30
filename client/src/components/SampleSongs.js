import config from '../config'

export default function SampleSongs (songId) {
    
    let axios = require("axios").default;
    const API_KEY = config();
    let allSampledSongs;
    const options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/songs/' + songId,
        headers: {
            'x-rapidapi-host': 'genius.p.rapidapi.com',
            'x-rapidapi-key': API_KEY
        }
    };
    axios.request(options)
    .then(data => {
        allSampledSongs = data.data.response.song.song_relationships[0].songs
        // allSampledSongs.forEach(item => console.log(item.full_title))
        // console.log(allSampledSongs)
    })

    
    return axios.request(options);
}
