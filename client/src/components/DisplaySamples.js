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
            const _toSetSamples = samplesList.map(song => {
                return song.title + " by " + song.artist;
            })
            setSamplesToDisplay(_toSetSamples);
        } else {
            setSamplesToDisplay([]);
        }
    }, [displaySamples])


    return (
        <div>  
            <br></br>
            <button onClick={() => handleClick()}>{!displaySamples?"Click for Samples":"Hide Samples"}</button>
            <br></br><br></br>

            {samplesList.length >0 && displaySamples ?
                samplesList.map((song,index) => {
                return (<div key={index}><button style={{borderRadius: "8px", backgroundColor: "lightgreen"}} 
                onClick={() => handleChangeMusic(song)}> 
                {samplesToDisplay?samplesToDisplay[index]: null} 
            </button> <br></br></div>)
            }): null}
        </div>
    )
}