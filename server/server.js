const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "45c8cca7568346c09d2ae3e15488221c",
        clientSecret: "d6fa9189dfbc4a4d9a589bad895830f0",
        refreshToken: ""
    })

    spotifyApi.refreshAccessToken()
    .then((data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
    }).catch(() => {
        res.sendStatus(400);
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "45c8cca7568346c09d2ae3e15488221c",
        clientSecret: "d6fa9189dfbc4a4d9a589bad895830f0",
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch(() => {
        res.sendStatus(400);
    })
})

app.listen(3001)