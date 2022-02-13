# App that lets you play the samples of any song on Spotify

### Tech Stack: Express, React, and Node

APIs: Spotify and Genuis
Backend is hosted on Heroku and Frontend is to be hosted on GitHub Pages

## Demo of the app:

Anytime you listen to a song on Spotify and you want to see its samples, click the "See Samples Below" button. You will be met with the songs that are sampled into the song, or were sampled by another song, or were interpolations/remix/cover of another song. You get the option to click and play those samples on the app allowing you to experience new music and enjoy the engineering behind the music you listen to.

## Click picture to watch a video demonstration of the app on YouTube

[![](thumbnail.jpeg)](https://youtu.be/as6JAZ-Bkak)

## To get the app running:

1. make sure you have node.js installed (https://nodejs.org/en/)
2. git clone this repo

### Frontend (client folder)

3. create a .env file in the root directory (same directory as the gitignore)
4. go to [spotify developer](https://developer.spotify.com/dashboard/login) and create an app
5. copy your client id and paste it in the .env file with a variable name `CLIENT_ID`
6. go to [genius api website](https://genius.com/api-clients), create an app with the website url/redirect uri as http://locahlost:3000
7. copy the client secret and paste in the .env file with a variable name `API_KEY`

### Rest of app

8. from the terminal, cd into the client and the server folder to run `npm install` - this installs all dependencies.
9. from the terminal, cd into the server folder, run `npm run devStart`
10. from the terminal, cd into the client folder and run `npm start` to begin the app (will run on http://localhost:3000)

Will require having a Spotify account.

The app will ask you to sign in to Spotify and you can then search a song you want to listen to. Once you play that song, click on "Show Samples Below" button and the samples should show up on the page and you can then play them. You can click the same button "Hide Samples" to not display the Samples.

## Credits:
1. Bjoern Hasemann (Engineer)
2. Della Lin (Engineer)
3. Gagan Kang (Engineer)
4. [Web Dev Simplified (Engineer/YouTuber)](https://www.youtube.com/watch?v=Xcet6msf3eE&ab_channel=WebDevSimplified)
