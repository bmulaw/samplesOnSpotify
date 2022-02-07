import SpotifyWebApi from 'spotify-web-api-node';
import clientid from '../clientid'
let client_id = clientid();

const spotifyApi = new SpotifyWebApi({
    clientId: client_id
})

export default function SearchSamplesOnSpotify(sampledSong, code) {
    spotifyApi.setAccessToken(code)
    
    return new Promise(function (resolve, reject) {
        spotifyApi.searchTracks(sampledSong)
        .then(res => {
            let song = res.body.tracks.items[0];
            if (song) {
                let songName = song.name.toLowerCase();
                if (sampledSong.includes(songName)) {
                    resolve({"title": song.name,
                            "artist": song.artists[0].name,
                             "uri": song.uri,
                            "albumUrl": song.album.images[0].url})}
                }}, (error) => {
                    reject(error);
            })
        })
    }