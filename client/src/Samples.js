import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Player from './Player'

export default function Samples({ playingTrack }) {
    const [song, setSong] = useState([]);
    const [songId, setSongId] = useState();
    const [samples, setSamples] = useState([]);
    var axios = require("axios").default;

    const searchSongInfo = () => {
        var options = {
            method: 'GET',
            url: 'https://genius.p.rapidapi.com/search',
            params: {q: music},
            headers: {
                'x-rapidapi-host': 'genius.p.rapidapi.com',
                'x-rapidapi-key': 'dfcaddd723msh6b216a6f6b60baep1fb122jsn29391c842471'
        }}
        return options;
    }

    const getSongSamples = (id) => {
        const songSamples = [];
        var options = {
            method: 'GET',
            url: 'https://genius.p.rapidapi.com/songs/' + id,
            headers: {
                'x-rapidapi-host': 'genius.p.rapidapi.com',
                'x-rapidapi-key': 'dfcaddd723msh6b216a6f6b60baep1fb122jsn29391c842471'
            }};
        axios.request(options)
             .then(res => {
                    const relations = res.data.response.song.song_relationships;
                    for (var i = 0; i < relations.length; i++) {
                        // console.log(relations)
                        for (var j = 0; j < relations[i].songs.length; j++) {
                            // console.log(relations[i].songs[j])
                            const cleanedSong = relations[i].songs[j].full_title.replace(' by', '').replace(/\([^()]*\)/g, '')
                            songSamples.push(cleanedSong);
                        }
                    }
                    setSamples(songSamples);
                    return songSamples;
                })
                .catch(function (error) {
                    console.error(error);
                });        
        }


    const getSongID = (data)  =>{
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            if(data[i].result.title.includes(songTitle)
            && data[i].result.artist_names.includes(playingTrack['artist'])) {
                index = i;
                break;
            }
        }
        const id = data[index].result.id
        return [id, index];
    }
    if (playingTrack['title'] != undefined) {
        var songTitle = playingTrack['title'].replace(/\([^()]*\)/g, '')
        var music = songTitle + " " + playingTrack['artist']
    }
    useEffect(() => {
        if (music != 'undefined undefined') {
            const options = searchSongInfo();
            axios.request(options)
            .then(res => {
                const [id, index] = getSongID(res.data.response.hits);
                setSong(res.data.response.hits[index].result);
                if (id !== 0) {
                    setSongId(id);
                } else {
                    console.log('50', song.id)
                    setSongId(song.id)
                }
                getSongSamples(id);
                console.log(samples);
            })
            .catch(function (error) {
                console.error(error);
            });
        };
    }, [playingTrack]); 
    
    return (
        <div>
            {songId}
        </div>
    )
}