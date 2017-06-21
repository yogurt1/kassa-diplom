import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import BookingPage from '../BookingPage'
// import EventsPage from '../EventsPage'
import './App.css';

class App extends Component {
  state = {
    isLoading: true
  }

  setLoading(isLoading) {
    this.setState({ isLoading })
  }

  async loadData() {
    try {
      await this.props.appState.loadEvents()
    } finally {
      this.setLoading(false)
    }
  }

  async componentDidMount() {
    await this.loadData()
  }

  renderContent() {
    return (
      <Router>
        <div>
          <div className='container'>
            <Switch>
              <Route path='/booking' component={BookingPage} />
              <Redirect to='/booking' />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  renderLoading() {
    return (
      <h1>Loading...</h1>
    )
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderContent()
  }
}

export default inject('appState')(observer(App));