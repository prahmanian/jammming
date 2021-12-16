// import spotify Client ID
import {clientId} from './private'
// const redirectUri  = 'http://localhost:3001/'
const redirectUri  = 'http://pedram-jammming.surge.sh' //deployed to surge

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
    },

    // search functionality
    search(searchTerm) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {return response.json()}).then(
            jsonResponse => {
                // if no tracks in response, return empty array
                if (!jsonResponse.tracks) {return []}
                return jsonResponse.tracks.items.map(track => {
                    // format tracks to our shape
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }
        )
    },

    savePlaylist(name, trackURIs, resetCallback) {
        if(!name || !trackURIs.length) {return}

        const accessToken = Spotify.getAccessToken()
        const headers = {Authorization: `Bearer ${accessToken}`,}
        let userId

        return fetch(`https://api.spotify.com/v1/me`, {headers: headers})
            .then(response => {return response.json()})
            .then(jsonResponse => {
                console.log('User: ', jsonResponse)
                userId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                }).then(response => response.json())
                .then(jsonResponse => {
                    const playlistId = jsonResponse.id
                    console.log('Playlist ID: ', playlistId)
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: "POST",
                        body: JSON.stringify({uris: trackURIs})
                    })
                })
            }).then(() => resetCallback())
    },

    getPlaylists(){
        const accessToken = Spotify.getAccessToken()
        const headers = {Authorization: `Bearer ${accessToken}`,}
        let userId

        // get userId
        return fetch(`https://api.spotify.com/v1/me`, {headers: headers})
            .then(response => {return response.json()})
            .then(jsonResponse => {
                console.log('User: ', jsonResponse)
                userId = jsonResponse.id
                // get playlists
                return fetch(`https://api.spotify.com/v1/me/playlists?limit=10`, {
                    headers: headers,
                }).then(response => {return response.json()}).then(
                    jsonResponse => {
                        // filter out playlists not created by the user
                        const filtered = jsonResponse.items.filter(playlist => playlist.owner.id === userId)
                        return filtered
                    }
                )
            })
    },

    removePlaylist(id) {
        const accessToken = Spotify.getAccessToken()
        const headers = {Authorization: `Bearer ${accessToken}`,}

        return fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
            headers: headers,
            method: 'DELETE'
        })
    }
}

export default Spotify