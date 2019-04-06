import React from 'react'
import {
  Redirect, Link, Route, Switch,
} from 'react-router-dom'
import Home from './container/Home'
import City from './container/City'
import './App.scss'

const App = () => (
  <div>
    <nav className="navbar navbar">
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/city">City</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/city" component={City} />
    </Switch>
  </div>
)

export default App
