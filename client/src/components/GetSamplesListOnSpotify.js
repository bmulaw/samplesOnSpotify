import SearchSamplesOnSpotify from './SearchSamplesOnSpotify';

export default function GetSamplesListOnSpotify(samples, code) {
    let trackURI = []
    let spotifySongData = [];

    return new Promise((resolve, reject) => {
        samples.forEach(sampledSong => {
            SearchSamplesOnSpotify(sampledSong, code)
            .then(data => {
                if (!trackURI.includes(data.uri)) {
                    spotifySongData.push(data);
                    trackURI.push(data.uri);
                }},resolve(spotifySongData))})
            })
}   