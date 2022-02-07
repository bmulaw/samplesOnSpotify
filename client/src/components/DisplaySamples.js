import React, { useState, useEffect } from "react";
import GetSamplesListOnSpotify from "./GetSamplesListOnSpotify";

export default function DisplaySamples({samples, code}) {    
    const [samplesList, setSamplesList] = useState([])
    const [displaySamples, setDisplaySamples] = useState(false);
    let samplesToDisplay = null;

    useEffect(() => {
        let spotifySongData = GetSamplesListOnSpotify(samples, code)
        spotifySongData.then(data => {
            setSamplesList(data);
        })
    }, [samples])

    const handleClick = () => {
        setDisplaySamples(!displaySamples);
        console.log(displaySamples)
        if(displaySamples)  {
            samplesToDisplay = (
                <div>
                    { samplesList.map(song => {
                        return (<div key={song.songUri}>
                                <a href={song.songUri}>{song.songName} - {song.artist}</a>
                                </div>);
                    })}
                </div>)
        console.log(samplesToDisplay.props.children[0])
        } else {
            samplesToDisplay = null;
        }
    }


    return (
        <div>
            
        <button onClick={handleClick}>Click</button>
        {console.log(displaySamples)}
        </div>
    )
}