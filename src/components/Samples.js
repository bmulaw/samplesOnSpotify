import GetSamplesFromGenuis from './search/GetSamplesFromGenuis';
import GetSongIdFromGenuis from './search/GetSongIdFromGenuis';

export default function Samples( playingTrack ) {    
    if (playingTrack == 'undefined undefined') return;
    let songTitle = playingTrack.title.replace(/\([^()]*\)/g, '');
    let currentPlayingMusic = songTitle + " " + playingTrack.artist;
    let sampledSongs;

    const getCorrectSongId = (data) => {
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].result.title.includes(songTitle)
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
                let type = relations[i].relationship_type;
                let songName = relations[i].songs[j].title.replace('The ', '').replace(/\([^()]*\)/g, '').toLowerCase();
                let artist = relations[i].songs[j].artist_names.toLowerCase();
                if (artist.includes("&")) artist = artist.substring(0, artist.indexOf('&'));
                songSamples.push("0^x" + type + "0^y" + artist + " " + songName);
            }
        }
        return songSamples;
    }
    // https://www.geeksforgeeks.org/how-to-make-javascript-wait-for-a-api-request-to-return/
    // calls SongID component to get the song ID of current playing track
        return new Promise((resolve, reject) => {
            GetSongIdFromGenuis(currentPlayingMusic, songTitle)
            .then((res) => {
                const songId = getCorrectSongId(res.data.response.hits);

                // another API call to get the samples from this songID
                GetSamplesFromGenuis(songId)
                .then((data) => {
                    sampledSongs = getSampledSongs(data.data);
                    resolve(sampledSongs)
                }, (error) => {
                    reject(error);
                })
            });
        })
        
}
