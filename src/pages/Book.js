import React, { Component } from 'react';
import Header from '../components/Header';
import GoogleBooksAPI from '../utils/GoogleBooksAPI';
import CartToggleButton from '../components/CartToggleButton';
import './Book.css';

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id: props.match.params.id,
        book: null,
        loading: true,
    };
  }

  componentDidMount() {
      GoogleBooksAPI.find(this.state.id).then(json => {
          console.log(json.volumeInfo);
        this.setState(state => ({
            ...state,
            book: json.volumeInfo,
            loading: false,
        }));
      });
  }
  
  render() {
    const { id, book, loading  } = this.state;

    return (
      <div className="Book">
        <Header />
        {loading 
            ? <div>Loading...</div> 
            : 
                <div className="Book-container">
                    {book.categories
                        &&  <ul className="Book-categories">
                                <li>Categories:</li>
                                {book.categories.map(category => <li key={category}>{category}</li>)}
                            </ul>
                    }
                    <div className="Book-info">
                        <div className="Book-image">
                            <img src={book.imageLinks.medium} alt={book.title} />
                        </div>
                        <div className="Book-details">
                            <h1>{book.title}</h1>
                            <h2>By {book.authors.join(' | ')}</h2>
                            <p dangerouslySetInnerHTML={{__html: book.description}} />
                            <p>Published {book.publishedDate} by {book.publisher}</p>
                            <CartToggleButton bookId={id} />
                        </div>
                    </div>
                </div>
        }
      </div>
    );
  }
}

export default Book;
