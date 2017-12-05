import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { default as CartUtil } from '../utils/Cart';
import GoogleBooksAPI from '../utils/GoogleBooksAPI';
import CartToggleButton from '../components/CartToggleButton';
import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
        items: [],
        isEmpty: false,
    };

    this.onBookRemoved = this.onBookRemoved.bind(this);
  }

  componentDidMount() {
    const bookIds = CartUtil.all();
    
    for (let i = 0, len = bookIds.length; i < len; i++) {
        GoogleBooksAPI.find(bookIds[i]).then(json => {
            this.setState(state => ({
                ...state,
                items: state.items.concat({
                    id: json.id,
                    title: json.volumeInfo.title,
                    thumbnail: json.volumeInfo.imageLinks.thumbnail,
                }),
            }));
        });
    }

    if (bookIds.length === 0) {
        this.setState(state => ({
            ...state,
            isEmpty: true,
        }))
    }
  }

  onBookRemoved(id) {
    this.setState(state => ({
        ...state,
        items: state.items.filter(book => book.id !== id),
        isEmpty: state.items.length === 1,
    }))
  }
  
  render() {
    const { isEmpty, items } = this.state;

    return (
      <div className="Cart">
        <Header />
        <div className="Cart-books-container">
            {isEmpty 
                ? <p>Your cart is empty</p>
                : items.map(book => (
                    <div className="Cart-book" key={book.id}>
                        <Link to={`/books/${book.id}`}>
                        <img className="Cart-book-image" src={book.thumbnail} alt={book.title} />
                        <h3 className="Cart-book-title">{book.title}</h3>
                        </Link>
                        <CartToggleButton bookId={book.id} onToggled={() => this.onBookRemoved(book.id)} />
                    </div>
                ))}
        </div>
      </div>
    );
  }
}

export default Cart;
