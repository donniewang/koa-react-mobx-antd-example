import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import './index.css';

import store from './models';
import Router from './pages/router';

ReactDOM.render((
    <BrowserRouter basename="/">
        <Provider { ...store }>
            <Router />
        </Provider>
    </BrowserRouter>
), document.getElementById('root'));