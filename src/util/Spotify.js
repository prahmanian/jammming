// import spotify Client ID
import {clientId} from './private'
const redirectUri  = 'http://localhost:3001/'

// variable to hold user's token
let token

// Use of Implicit Grant Flow to get Spotify user's access token

// Spotify module
const Spotify = {
    getAccessToken() {
        if (token) {return token}

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresInMatch) {
            token = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //This clears the parameterss so we can grab a new token when it expires
            window.setTimeout(() => token = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/')
            return token
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl
        }
    }
}

export default Spotify