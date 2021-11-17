import './App.css';

import SearchBar from '../../Components/SearchBar/SearchBar.js'
import SearchResults from '../../Components/SearchResults/SearchResults.js'
// import Playlist from '../../Components/Playlist'

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className='App-playlist'>
          <SearchResults />
          {/* <Playlist /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
