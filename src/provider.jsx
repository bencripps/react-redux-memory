import React from 'react';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import store from './store/store';

export default (
    <Provider store={ store }>
        <App />
    </Provider>
);