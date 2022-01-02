import SongId from './SongId';
import SampleSongs from './SampleSongs';

export default function Samples( playingTrack ) {    
    if (currentPlayingMusic == 'undefined undefined') return;
    var songTitle = playingTrack.title.replace(/\([^()]*\)/g, '');
    var currentPlayingMusic = songTitle + " " + playingTrack.artist;
    

    const getCorrectSongId = (data) => {
        var index = 0;
        for (var i = 0; i < data.length; i++) {
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
        var songSamples = []
        const relations = data.response.song.song_relationships;
        for (var i = 0; i < relations.length; i++) {
            for (var j = 0; j < relations[i].songs.length; j++) {
                const cleanedSong = relations[i].songs[j].full_title.replace(' by', '').replace(/\([^()]*\)/g, '')
                songSamples.push(cleanedSong);
            }
        }
        return songSamples;
    }

    
    SongId(currentPlayingMusic, songTitle).then((data) => {
        // console.log(data.data.response.hits)
        const songId = getCorrectSongId(data.data.response.hits);
        console.log('id', songId);
        SampleSongs(songId).then((data) => {
            const samples = getSampledSongs(data.data)
            console.log(samples)
         })
    });

}
