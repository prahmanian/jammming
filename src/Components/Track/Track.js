import React from 'react'
import './Track.css'

// static data
const track = {
    name: "static Track Name",
    artist: "static artist",
    album: 'static album',
    conditional: true,
}

export default class Track extends React.Component {
    render() {
        // const {track} =this.props
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
                <button className="Track-action">{track.conditional ? "+" : "-"}</button>
            </div>
        )
    }
}