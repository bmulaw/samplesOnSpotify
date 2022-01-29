import React, { useState, useEffect } from "react";
import GetSamplesListOnSpotify from "./GetSamplesListOnSpotify";

export default function DisplaySamples({samples, code}) {    
    
    // let spotifySongData = [
    //     {"songName": 'Baby My Love', "songUri": 'spotify:track:68HCQwAQO9Ta0YXhxEqVup'},
    //     {"songName": 'Baby My Love', "songUri": 'spotify:track:68HCQwAQO9Ta0YXhxEqVup'},
    //     {"songName": 'GONE, GONE / THANK YOU', "songUri": 'spotify:track:1hz7SRTGUNAtIQ46qiNv2p'},
    //     {"songName": "I Ain't Got Time!", "songUri": 'spotify:track:430qNtapCS3Ue1yoSql1oV'}];
    // setSampledSongSpotify(spotifySongData)


    let spotifySongData = GetSamplesListOnSpotify(samples, code)
    return (
        <div>
            { console.log(spotifySongData)}
            {/* { spotifySongData.map(song => {
                return (<div>
                        <a href={song.songUri}> {song.songName} </a>
                        </div>);
            })} */}
        </div>

    )
}