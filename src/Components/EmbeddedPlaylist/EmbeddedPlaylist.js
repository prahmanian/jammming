import React from 'react'
import DeleteButton from '../DeleteButton/DeleteButton'

export default class EmbeddedPLaylist extends React.Component {
    render() {
        return (
            <div className='EmbeddedPlaylist'>
                <iframe 
                    src={`https://open.spotify.com/embed/playlist/${this.props.playlist.id}`} 
                    title={this.props.playlist.name} 
                    width="300" 
                    height="380" 
                    frameBorder="0" 
                    allowtransparency="true" 
                    allow="encrypted-media"
                ></iframe>
                <DeleteButton id={this.props.playlist.id} removePlaylist={this.props.removePlaylist}/>


            </div>
        )
    }
}