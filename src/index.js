import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import AppState from './stores/AppState';
import './index.css';

const appState = new AppState();
global.appState = appState;

ReactDOM.render(
    <Provider appState={appState}>
        <App />
    </Provider>,
    document.getElementById('root')
);
