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
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
  
}

