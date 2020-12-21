import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = (props) => {
    const { books, title, onChange } = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {books.map(
                        (book) =>

                            <Book key={book.id} book={book} onChange={onChange} />
                    )}

                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    books: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
}
export default BookShelf