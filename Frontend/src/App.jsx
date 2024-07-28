import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreateBook from "../Pages/CreateBook"
import DeleteBook from '../Pages/DeleteBook'
import EidtBook from '../Pages/EditBook'
import ShowBook from "../Pages/ShowBook"
import Home from "../Pages/Home"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/book/create' element={<CreateBook/>} />
      <Route path='/book/delete/:id' element={<DeleteBook/>} />
      <Route path='/book/edit/:id' element={<EidtBook/>} />
      <Route path='/book/show/:id' element={<ShowBook/>} />
    </Routes>
  )
}

export default App
