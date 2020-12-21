import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Bookshelves extends Component {
    static propTypes = {
        books: PropTypes.any.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    render() {
        const { books, onChange } = this.props
        const Shelves = [{ title: "Currently Reading", value: 'currentlyReading' }, { title: 'Want to read', value: 'wantToRead' }, { title: 'Read', value: 'read' }]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            Shelves.map(
                                (shelf, index) => <BookShelf key = {index} books={books.filter(book => shelf.value === book.shelf)} title={shelf.title} onChange={onChange} />
                            )
                        }
                    </div>
                    )
                </div>
                <div className="open-search">
                    <Link to='/search'> Add a book</Link>
                </div>
            </div>

        )
    }

}

export default Bookshelves