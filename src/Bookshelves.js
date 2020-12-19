import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class Bookshelves extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }


    handleChange = (e, bookId) => {
        const currentvalue = e.target.value;
        this.setState((currentSate) => {
            const books = [...currentSate.books];
            const book = books.find(book => book.id === bookId);
            book.shelf = currentvalue
            BooksAPI.update(book, book.shelf)
            return {
                books
            }
        })
    }


    render() {

        const { books } = this.state

        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">

                    <div>
                        <BookShelf books={books.filter(book => book.shelf === 'currentlyReading')} title="Currently Reading" onChange={this.handleChange} />
                        <BookShelf books={books.filter(book => book.shelf === 'wantToRead')} title="Want to read" onChange={this.handleChange} />
                        <BookShelf books={books.filter(book => book.shelf === 'read')} title="Read" onChange={this.handleChange} />
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