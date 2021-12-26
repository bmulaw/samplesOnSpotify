import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import Samples from './Samples';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "45c8cca7568346c09d2ae3e15488221c",
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState([])
    const [samples, setSamples] = useState([]);

    function chooseTrack(track) {
        setPlayingTrack(track);
    }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;
        spotifyApi.searchTracks(search)
        .then(res => {
            if (cancel) return;
            setSearchResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, images) => {
                            if (images.height < smallest.height) return images;
                            return smallest;
                        },
                        track.album.images[0]
                    )

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                }))            
            })
        return () => cancel = true;
    }, [search, accessToken]);

    return (
        <Container className="d-flex flex-column py-2" 
        style={{ height: "100vh" }}> 
        
        <Form.Control 
            type="search"
            placeholder="Search a song/artist"
            value={search}
            onChange={e => setSearch(e.target.value)}
        /> 
        
        <div className="flex-grow-1 my-2" 
             style={{ overflowY: "auto" }} >
                 {searchResults.map(track => (
                     <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                 ))}
             </div>
        <div> <Player accessToken={accessToken} trackUri={playingTrack?.uri}/> </div>
        <div> <Samples playingTrack={playingTrack}/> </div>
        </Container>
    )
}