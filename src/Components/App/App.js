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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
  
}

