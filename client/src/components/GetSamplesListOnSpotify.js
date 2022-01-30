import SearchSamplesOnSpotify from './SearchSamplesOnSpotify';

export default function GetSamplesListOnSpotify(samples, code) {
    let trackURI = []
    let spotifySongData = [];

    return new Promise(function (resolve, reject) {
        samples.forEach(sampledSong => {
            SearchSamplesOnSpotify(sampledSong, code)
            .then(data => {
                if (!trackURI.includes(data.songUri)) {
                    spotifySongData.push(data);
                    trackURI.push(data.songUri);
                }},resolve(spotifySongData))})
            })
}   