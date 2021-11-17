import React from 'react'
import './Playlist.css'

import TrackList from '../TrackList/TrackList.js'

export default class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"}/>
                <TrackList 
                    tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove}
                />
                <button class='Playlist-save'>SAVE TO SPOTIFY</button>

            </div>
        )
    }
}