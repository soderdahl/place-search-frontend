import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      places: [],
      errorMsg: null,
      apiResult: null
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  /*
  Sends a request to backend with POST-method.
   */

  getPlaces = async place => {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://place-search-backend-demo.herokuapp.com/'
        : ''
    let response = await fetch(`${baseUrl}api/getLocations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ place: place })
    })
    let data = await response.json()
    return data
  }

  handleSearchSubmit = event => {
    event.preventDefault()

    this.getPlaces(this.state.searchValue)
      .then(data => {
        let places = data.places
        this.setState({
          places
        })
      })
      .catch(err =>
        this.setState({
          errorMsg: err
        })
      )
  }

  render() {
    const places = this.state.places.length
      ? this.state.places.map((place, i) => {
          return (
            <li className='places-list-item' key={`${i}-react-key`}>
              <h3>{place.canonicalName}</h3>
              <p>{place.kind}</p>
              <p>
                {place.lat}, {place.lng}
              </p>
              <p>{place.longName}</p>
            </li>
          )
        })
      : null

    return (
      <div className='App'>
        <header className='header'>
          <h1 className='header-text'>Place Search</h1>
        </header>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            className='input-text'
            onChange={e => this.setState({ searchValue: e.target.value })}
            type='text'
            name='search'
          />

          <button className='submit-button'>Sök</button>
        </form>
        <div>
          <h2 className='result-header'>
            {places ? 'Result' : 'Search for places'}
          </h2>
          <ul className='places-list'>{places}</ul>
        </div>
      </div>
    )
  }
}

export default App
