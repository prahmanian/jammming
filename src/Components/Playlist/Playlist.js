import React from 'react'
import './Playlist.css'

import TrackList from '../TrackList/TrackList.js'

export default class Playlist extends React.Component {
    constructor(props){
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value)
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
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