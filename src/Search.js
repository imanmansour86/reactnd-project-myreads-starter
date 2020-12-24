import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends Component {
    static propTypes = {
        books: PropTypes.any.isRequired,
    }

    state = {
        query: '',
        searchResults: [],
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
        this.searchBook(query)
    }

    searchBook = (query) => {
        BooksAPI.search(query)
            .then(
                (filteredBooks) => {
                    console.log(filteredBooks)
                    if (filteredBooks !== undefined && filteredBooks.error !== "empty query") {
                        const searchResults = filteredBooks.map((book) => {
                            const foundBookWithShelf = this.props.books.find(bookToBeFound => book.id === bookToBeFound.id)
                            if (foundBookWithShelf) 
                            book.shelf = foundBookWithShelf.shelf
                            else 
                            book.shelf = 'none'
                            return book;
                        })

                        this.setState(
                            () => ({
                                searchResults
                            }))
                    }
                    else {
                        this.setState(
                            () => ({
                                searchResults: []
                            }))
                    }
                }
            )
    }

    handleSearchChange = (e, bookId) => {
        const currentvalue = e.target.value;
        this.setState((currentSate) => {
            const searchResults = currentSate.searchResults;
            const book = searchResults.find(book => book.id === bookId);
            book.shelf = currentvalue
            BooksAPI.update(book, book.shelf)
            return {
                searchResults
            }
        })
    }


    render() {
        const { searchResults, query } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author"
                            value={query}

                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchResults.map((book) => <Book key={book.id} book={book} onChange={this.handleSearchChange} />)
                        }

                    </ol>
                </div>

            </div>


        )

    }
}

export default Search