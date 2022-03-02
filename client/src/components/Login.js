import React from 'react';
import { Container } from 'react-bootstrap';
import env from "react-dotenv";

const redirect_uri = env.REACT_APP_REDIRECT_URI
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {

    return(
        <Container 
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh'}}> 
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login with Spotify
            </a>
        </Container>
    )
}