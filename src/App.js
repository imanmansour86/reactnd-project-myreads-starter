import React, { Component } from 'react'
import './App.css'
import { Route, route } from 'react-router-dom'
import Search from './Search'
import Bookshelves from './Bookshelves'


class BooksApp extends React.Component {

  render() {

    return (
      <div className="app">

        < Route exact path='/search' render={() => <Search />} />

        < Route exact path='/' render={() => <Bookshelves />} />

      </div>
    )
  }
}


export default BooksApp


