import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search'
import Bookshelves from './Bookshelves'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    books: []
  }


  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        console.log(books)
        this.setState(() => ({
          books
        }))
      })
  }

  handleChange = (e, bookId) => {
    const currentvalue = e.target.value;
    this.setState((currentState) => {
      const books = currentState.books;
      const book = books.find(book => book.id === bookId);
      book.shelf = currentvalue
      BooksAPI.update(book, book.shelf)
      return {
        books
      }
    })
  }


  render() {

    const { books } = this.state;

    return (
      <div className="app">
        < Route exact path='/search' render={() => <Search books={books} />} />
        < Route exact path='/' render={() => <Bookshelves onChange={this.handleChange} books={books} />} />
      </div>
    )
  }
}


export default BooksApp


