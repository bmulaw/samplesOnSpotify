import React, { useState, useEffect } from "react";
import GetSamplesListOnSpotify from "./GetSamplesListOnSpotify";

export default function DisplaySamples({currPlayingTrack, samples, code}) {    
    const [samplesList, setSamplesList] = useState([])
    const [displaySamples, setDisplaySamples] = useState(false);
    const [samplesToDisplay, setSamplesToDisplay] = useState([]);

    useEffect(() => {
        let spotifySongData = GetSamplesListOnSpotify(samples, code)
        spotifySongData.then(data => {
            setSamplesList(data);
        })
    }, [samples])

    const handleClick = () => {
        setDisplaySamples(!displaySamples);
    }

    const handleChangeMusic = (newSong) => {
        currPlayingTrack(newSong);
    }

    useEffect(() => {
        if(displaySamples && samplesList.length>0)  {
            setSamplesToDisplay(samplesList[0].title + " "+ samplesList[0].artist);
        } else {
            setSamplesToDisplay([]);
        }
    }, [displaySamples])


    return (
        <div>  
            <br></br>
            <button onClick={() => handleClick()}>{!displaySamples?"Click for Samples":"Hide Samples"}</button>
            <br></br><br></br>
            {/* displays samples that can be clicked and played  */}
            {samplesList.length >0 && displaySamples ?
                <button style={{borderRadius: "8px", backgroundColor: "lightgreen"}} 
                    onClick={() => handleChangeMusic(samplesList[0])}> 
                    {samplesToDisplay?samplesToDisplay: null} 
                </button> : null}
        </div>
    )
}