import React from 'react';
import { Container } from 'react-bootstrap'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=9acdec0bb38146d59436f7773c7e835a&response_type=code&redirect_uri=http://localhost:3000"  

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