import SongId from './SongId';
import SampleSongs from './SampleSongs';

export default function Samples( playingTrack ) {    
    if (playingTrack == 'undefined undefined') return;
    let songTitle = playingTrack.title.replace(/\([^()]*\)/g, '');
    let currentPlayingMusic = songTitle + " " + playingTrack.artist;
    let sampledSongs;

    const getCorrectSongId = (data) => {
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i].result.title.includes(songTitle)
            && data[i].result.artist_names.includes(currentPlayingMusic['artist'])) {
                index = i;
                break;
            }
        }
        const id = data[index].result.id
        return id;
    }

    const getSampledSongs = (data) => {
        let songSamples = []
        const relations = data.response.song.song_relationships;
        for (let i = 0; i < relations.length; i++) {
            for (let j = 0; j < relations[i].songs.length; j++) {
                let currSample = relations[i].songs[j].full_title;
                if (currSample.includes("&")) {
                    let index = currSample.lastIndexOf("&");
                    currSample = currSample.substring(0, index+1);  
                }
                const cleanedSong = currSample.replace(' by', '').replace(/\([^()]*\)/g, '').replace('The ', '').replace('&', '').toLowerCase();
                songSamples.push(cleanedSong);
            }
        }
        return songSamples;
    }
    // https://www.geeksforgeeks.org/how-to-make-javascript-wait-for-a-api-request-to-return/
    // calls SongID component to get the song ID of current playing track
        return new Promise(function (resolve, reject) {
            SongId(currentPlayingMusic, songTitle)
            .then((res) => {
                const songId = getCorrectSongId(res.data.response.hits);
    
                // another API call to get the samples from this songID
                SampleSongs(songId)
                .then((data) => {
                    sampledSongs = getSampledSongs(data.data);
                    resolve(sampledSongs)
                }, (error) => {
                    reject(error);
                })
            });
        })
        
}
