import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends Component {
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
                (searchResults) => {
                    console.log(searchResults)
                    if (searchResults !== undefined && searchResults.error !== "empty query") {
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
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

                        <input type="text" placeholder="Search by title or author"
                            value={query}

                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">

                        {searchResults.map((book) => <Book key={book.id} book={book} onChange={this.handleSearchChange} />)
                        }

                    </ol>
                </div>

            </div>


        )

    }
}

export default Search