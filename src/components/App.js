import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Product from './Product'


const App = (props) => {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Welcome Home</h1>
        </Route>
        <Route path="/products/:id">
          <Product />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
