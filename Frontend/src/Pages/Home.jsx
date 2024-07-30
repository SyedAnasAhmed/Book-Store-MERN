import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import BooksTable from "../Components/home/BooksTable";
import BooksCard from "../Components/home/BooksCard";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showtype, setshowtype] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("api/books")
      .then((response) => {
        console.log(response.data.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setshowtype("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setshowtype("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {loading ? <Spinner /> : showtype === "table" ? (<BooksTable books={books}/>) : (<BooksCard books={books} />) }
    </div>
  );
}

export default Home;

// import React from 'react'

// const Home = () => {
//   return (
//     <div className='w-10 bg-slate-950 text-purple-600'>
//       hello
//     </div>
//   )
// }

// export default Home
