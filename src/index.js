import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Book from './pages/Book';
import Cart from './pages/Cart';
import registerServiceWorker from './utils/registerServiceWorker';
import './index.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route path={`${process.env.PUBLIC_URL}/books/:id`} component={Book} />
            <Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart} />
        </Switch>
    </Router>, 
    document.getElementById('root')
);

registerServiceWorker();
