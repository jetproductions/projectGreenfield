import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import App from './components/App'

const store  = createStore(reducer)

render(<Provider store={store}><App /></Provider>, document.getElementById('app'))