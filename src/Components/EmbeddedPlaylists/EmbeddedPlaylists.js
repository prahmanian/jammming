import React from 'react'
import EmbeddedPLaylist from '../EmbeddedPlaylist/EmbeddedPlaylist'
import './EmbeddedPlaylists.css'

export default class EmbeddedPLaylists extends React.Component {
    render() {
        return (
            <div className='EmbeddedPlaylists'>
                <h2>Your Playlists</h2>
                <div className='PlaylistContainer'>
                    {this.props.playlists.map(playlist => {
                        return <EmbeddedPLaylist playlist={playlist} key={playlist.id} removePlaylist={this.props.removePlaylist}/>
                    })}
                </div>
                
            </div>
        )
    }
}