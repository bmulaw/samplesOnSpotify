import SearchSamplesOnSpotify from './SearchSamplesOnSpotify';

export default function GetSamplesListOnSpotify(samples, code) {

    let spotifySongData = [];
    samples.forEach(sampledSong => {
        SearchSamplesOnSpotify(sampledSong, code)
        .then(data => spotifySongData.push(data))

    });

    return spotifySongData;

}