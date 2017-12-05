import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
  }

  handleQueryChange(e) {
    let query = e.target.value;

    this.setState(state => ({
      ...state,
      query,
    }));
  }

  handleSearchSubmission(e) {
    e.preventDefault();

    this.props.onSearch(this.state.query);
  }

  handleSearchReset(e) {
    e.preventDefault();

    this.setState(state => ({
      ...state,
      query: '',
    }));
  }

  render() {
    return (
      <form className="SearchBar" onSubmit={this.handleSearchSubmission} onReset={this.handleSearchReset}>
        <div className="SearchBar-wrapper">
          <input 
            type="search" 
            required="required" 
            autoComplete="off" 
            className="SearchBar-input" 
            placeholder="Search for your next book" 
            value={this.state.query} 
            onChange={this.handleQueryChange} 
          />
          <button type="submit" title="Submit your search query." className="SearchBar-submit">
            <SearchBarSubmitSVG />
          </button>
          <button type="reset" title="Clear the search query." className="SearchBar-reset">
            <SearchBarResetSVG />
          </button>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

const SearchBarSubmitSVG = () => (
  <svg role="img" aria-label="Search" viewBox="0 0 40 40">
    <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" fillRule="evenodd" />
  </svg>
);

const SearchBarResetSVG = () => (
  <svg role="img" aria-label="Reset" viewBox="0 0 20 20">
    <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" fillRule="evenodd" />
  </svg>
);


export default SearchBar;
