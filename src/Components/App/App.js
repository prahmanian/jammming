import React from 'react'
import './App.css';

import SearchBar from '../../Components/SearchBar/SearchBar.js'
import SearchResults from '../../Components/SearchResults/SearchResults.js'
import Playlist from '../../Components/Playlist/Playlist.js'

const track = {
  name: "Jammin'",
  artist: "Pedram",
  album: "LateNite React-ions",
  id: 1234,
  isRemoval: true,

}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: [
        track, track, track
      ],
      playlistName: 'Smooth Eve Jams',
      playlistTracks: [track, track],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
  }

  addTrack(track) {
    // check to see if track is already in playlistTracks
    if (this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      // if it does, break out fo the method
      return;
    }
    // if it does not, add track to end of playlist and update state
    const newPlaylist = this.state.playlistTracks
    newPlaylist.push(track)
    this.setState({playlistTracks: newPlaylist})
  }

  removeTrack(track){
    const filteredTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({playlistTracks: filteredTracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => {return track.uri})
    return trackURIs
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
  
}

