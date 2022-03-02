import GetSamplesFromGenuis from './search/GetSamplesFromGenuis';
import GetSongIdFromGenuis from './search/GetSongIdFromGenuis';

export default function Samples( playingTrack ) {    
    if (playingTrack === 'undefined undefined') return;
    let songTitle = playingTrack.title.replace(/\([^()]*\)/g, '');
    let currentPlayingMusic = songTitle + " " + playingTrack.artist;
    if (currentPlayingMusic.includes("-")) currentPlayingMusic = currentPlayingMusic.substring(0, currentPlayingMusic.indexOf('-'));
    let sampledSongs;

    const getCorrectSongId = (data) => {
        if (data.length === 0) return;
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
        let songSamples = [];
        const relations = data.response.song.song_relationships;
        for (let i = 0; i < relations.length; i++) {
            for (let j = 0; j < relations[i].songs.length; j++) {
                let type = relations[i].relationship_type.replace('_', ' ');
                let songName = relations[i].songs[j].title.replace('The ', '').replace(/\([^()]*\)/g, '').toLowerCase();
                let artist = relations[i].songs[j].artist_names.replace(/\([^()]*\)/g, '').toLowerCase();                
                if (artist.includes("&")) artist = artist.substring(0, artist.indexOf('&'));
                songSamples.push("0^x" + type + "0^y" + artist + " " + songName);
            }
        }
        return songSamples;
    }

    return new Promise((resolve, reject) => {
        GetSongIdFromGenuis(currentPlayingMusic)
        .then((res) => {
            const songId = getCorrectSongId(res.data.response.hits);
            if (songId) {
                GetSamplesFromGenuis(songId)
                .then((data) => {
                    sampledSongs = getSampledSongs(data.data);
                    resolve(sampledSongs);
                }, (error) => {
                    reject(error);
                })
            }
        });
    })
}
