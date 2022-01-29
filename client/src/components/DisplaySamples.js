import React from "react";
import SearchSamplesOnSpotify from "./SearchSamplesOnSpotify";

export default function DisplaySamples({samples, code}) {
    // console.log(code);
    let spotifySongData = [];
    let smallerSample = [];
    for (let i =0; i < samples.length; i++) {
        smallerSample.push(samples[i]);
        SearchSamplesOnSpotify(samples[i], code).then(data => 
            {
                spotifySongData.push(data)
            })
        
    }

    // console.log(spotifyData)
    

    return (
        <div>
            { console.log(spotifySongData['0'])}
            {spotifySongData.map(song => {
                return <li><a href={song.songUri}>song.songName</a></li>;
            })}
        </div>

    )
}