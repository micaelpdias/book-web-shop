import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
        <header className="Header">
            <h1 className="Header-title">The Book Shop</h1>
            <ul className="Header-navigation">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>
            {this.props.children}
        </header>
    );
  }
}

export default Header;
