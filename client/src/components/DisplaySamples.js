import React, { useState, useEffect } from "react";
import GetSamplesListOnSpotify from "./GetSamplesListOnSpotify";

export default function DisplaySamples({samples, code}) {    
    const [samplesList, setSamplesList] = useState([])

    useEffect(() => {
        let spotifySongData = GetSamplesListOnSpotify(samples, code)
        spotifySongData.then(data => {
            setSamplesList(data);
        })
    }, [samples])

    return (
        <div>
            { samplesList? samplesList.map(song => {
                return (<div key={song.songUri}>
                        <a href={song.songUri}> {song.songName} - {song.artist}</a>
                        </div>);
            }): []}
        </div>

    )
}