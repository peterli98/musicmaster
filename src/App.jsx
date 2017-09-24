import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    var accessToken = 'BQBX974rm9TsiEvMsqzIp14cHpTgoMubdUAPLB79zarAjfdhM6Dfu3QwCXq31XqeqpmJJcZQq1EhWmHecz-FA64S05zjR8FVqNIXbwdjggJxHj7nqtCSWQgA9Jm0JL85_QbE0Y3xMVbmyfE-c31WQd37uI5pBPQmrsP1PqA5GM76DCUfv_g&refresh_token=AQArAHW4wtu65O-ZDqGi8fVyMIl-wHeKAL7qYM-lOrnf9qTNk5AmGuAhkFrgVZKuPZsqVwMZUbwAhoyFzAOZsufVjQqat5UbUeDc8Nqzlqdx7yEKhBu-92mZu-T7QxwGs0Q';
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
        console.log('artist', artist);
        this.setState({ artist });
      })
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
        <Profile
          artist={this.state.artist}
        />
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
