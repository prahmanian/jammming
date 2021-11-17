import React from 'react'
import './Playlist.css'

// import Tracklist from '../TrackList/TrackList.js'

export default class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"}/>
                {/* <TrackList /> */}
                <button class='Playlist-save'>SAVE TO SPOTIFY</button>

            </div>
        )
    }
}