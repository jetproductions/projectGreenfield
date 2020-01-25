import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import App from './components/App';
import './index.css';

const store = createStore(reducer);

/* eslint-disable no-undef */
render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
