import React from 'react'
import { useState } from 'react'
import BackButton from '../Components/BackButton'
import axios from 'axios'
import Spinner from '../Components/Spinner'
import { useNavigate, useParams } from 'react-router'
import {useSnackbar} from 'notistack'

const DeleteBook = () => {

  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar()

  const HandleDeleteBook = () => {
    setloading(true)
    axios.delete(`/api/books/${id}`)
    .then(()=>{
      setloading(false)
      navigate("/")
      enqueueSnackbar("Book Deleted Successfully" , {variant:'success'})
    })
    .catch((error)=>{
      setloading(false)
      console.log(error)
      enqueueSnackbar(error.message , {variant:'error'})
    })
  }
  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Delete Book</h1>
        {loading ? <Spinner/> : " "}
        <div className='flex flex-col items-center border-2 border-sky-600 rounded-xl w-[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
            <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={HandleDeleteBook}>Yes, Delete It</button>
        </div>
    </div>
  )
}

export default DeleteBook
