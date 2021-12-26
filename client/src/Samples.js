import React, { useState } from 'react';
import axios from 'axios';
import Player from './Player'

export default function Samples({ playingTrack }) {
    const [song, setSong] = useState([]);
    var axios = require("axios").default;

    var music = playingTrack['title'] + " " + playingTrack['artist']
    if (music != 'undefined undefined') {
        console.log('music', music); 
        var options = {
            method: 'GET',
            url: 'https://genius.p.rapidapi.com/search',
            params: {q: music},
            headers: {
                'x-rapidapi-host': 'genius.p.rapidapi.com',
                'x-rapidapi-key': 'dfcaddd723msh6b216a6f6b60baep1fb122jsn29391c842471'
            }}
    };

    const getSongID = (data)  =>{
        var id = 0
        for (var i = 0; i < data.length; i++) {
            if(data[i].result.title == playingTrack['title'] 
            && playingTrack['artist'] in data[i].result.artist_names) {
                id = data[i].result.id
            }
        }
        console.log(id, 'songid')
        return id;
    }

    axios.request(options)
        .then(res => {
            console.log('id', getSongID(res.data.response.hits))
            console.log(res.data.response.hits)
            setSong(res.data.response.hits[0]);
        })
        .catch(function (error) {
            console.error(error);
        });
    return (
        <div>
            {song}
        </div>
    )
}