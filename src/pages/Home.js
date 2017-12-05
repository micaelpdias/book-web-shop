import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CartToggleButton from '../components/CartToggleButton';
import GoogleBooksAPI from '../utils/GoogleBooksAPI';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loading: false,
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query) {
    this.setState(state => ({
      ...state,
      loading: true,
    }));

    GoogleBooksAPI.search(query, 10).then(json => {
      this.setState(state => ({
          ...state,
          results: json.items.map(item => ({
              id: item.id,
              title: item.volumeInfo.title,
              thumbnail: item.volumeInfo.imageLinks.thumbnail,
          })),
          loading: false,
      }));
    });
  }

  render() {
    return (
      <div className="Home">
        <Header>
          <SearchBar onSearch={this.handleSearch} />
        </Header>
        <br/>
        <div className="Home-books-container">
            {this.state.loading 
              ? <div>Loading...</div> 
              : this.state.results.map(book => (
                  <div className="Home-book" key={book.id}>
                      <Link to={`/books/${book.id}`}>
                        <img className="Home-book-image" src={book.thumbnail} alt={book.title} />
                        <h3 className="Home-book-title">{book.title}</h3>
                      </Link>
                      <CartToggleButton bookId={book.id} />
                  </div>
                ))
            }
        </div>
      </div>
    );
  }
}

export default Home;
