import React, { useState, useEffect } from "react";
import GetSamplesListOnSpotify from "./GetSamplesListOnSpotify";

export default function DisplaySamples({currPlayingSong, samples, code}) {    
    const [pls, setPls] = useState([])

    useEffect(() => {
        let spotifySongData = GetSamplesListOnSpotify(samples, code)
        spotifySongData.then(data => {
            setPls(data);
        })
    }, [samples])
    
    return (
        <div>
            { pls.map(song => {
                return (<div key={song.songUri}>
                        <a href={song.songUri}> {song.songName} </a>
                        </div>);
            })}
        </div>

    )
}