import React from 'react'
import './TrackList.css'

import Track from '../Track/Track.js'

// static data
const tracks = []

export default class TrackList extends React.Component {
    render() {
        return (
            <div className='TrackList'>
                {tracks.map(track => {return <Track track={track} />})}
            </div>
        )
    }
}