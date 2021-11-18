import React from 'react'
import './App.css';

import SearchBar from '../../Components/SearchBar/SearchBar.js'
import SearchResults from '../../Components/SearchResults/SearchResults.js'
import Playlist from '../../Components/Playlist/Playlist.js'

import Spotify from '../../util/Spotify';
import EmbeddedPLaylists from '../EmbeddedPlaylists/EmbeddedPlaylists';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      playlists: [],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    this.reset = this.reset.bind(this)
    this.getPlaylists = this.getPlaylists.bind(this)
    this.removePlaylist = this.removePlaylist.bind(this)
  }

  componentDidMount() {
    this.getPlaylists()
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
    Spotify.savePlaylist(this.state.playlistName, trackURIs, this.reset)
  }

  search(searchTerm) {
    console.log('search term: ', searchTerm)
    Spotify.search(searchTerm).then( results => {
      this.setState({searchResults: results})
    })
  }

  getPlaylists(){
    Spotify.getPlaylists().then(playlists => {this.setState({playlists: playlists})})
  }

  removePlaylist(id){
    Spotify.removePlaylist(id).then(() => {this.getPlaylists()})
  }

  reset() {
    this.setState({
      playlistName:'New Playlist', 
      playlistTracks: []
    })
    this.getPlaylists()
    // .then(console.log('state.playlistName: ', this.state.playlistName))
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
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
          <EmbeddedPLaylists playlists={this.state.playlists} removePlaylist={this.removePlaylist}/>
        </div>
      </div>
    );
  }
  
}

