import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var accessToken = 'BQDEAImvbQPGUfHavzlf2_pLkvFqOXD7jpRJn8d1nONwFuKiNvYK3M-10GDk0U7jSkXuphOcnClVFSdjNvbYUJxgxBO1B6vYcZbeXqz9_khGBLHXb0jpcrdhQ4s9U3BaF5ouRntb-eiQYg1bx2oaaPbgZLe6bc6xrj0hyimoUd3HR0M-q04&refresh_token=AQDw0pObmcbEd9yhwWY-9XSQfOG5MNPVMHJfH7cuB4hjzkP0ate0IZ9x7-ia44g1IqjeZR_QHyWasbxJddGh9I3UknkB7tHnwEkhq2jWRGA-OBlD4D9pZA_Lr5GtOcGrjUI';
    var myHeaders = new Headers();

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });
        console.log('artist', json);

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=CA&`
        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          console.log('artists top tracks: ', json);
          const { tracks } = json;
          this.setState({ tracks });
        })
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title"> Music Master </div>
        <FormGroup>
          <InputGroup>
          <FormControl
            type="text"
            placeholder="Search for an Artist"
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value})}}
            onKeyPress={event => {
              if (event.key === 'Enter'){
                this.search()
            }
            }}
          />
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
