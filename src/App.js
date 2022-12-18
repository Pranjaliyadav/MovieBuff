import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import SearchIcon from "./search.svg"
import MovieCard from './MovieCard';

//691750bf - api key omdb

const movie1 =
{
  "Title": "Superman, Spiderman or Batman",
  "Year": "2011",
  "imdbID": "tt2084949",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
  //got this by right clicking on fetched data on chromes's console log. very effecient.
}


const API_URL = 'https://www.omdbapi.com?apikey=691750bf';
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

//why asyc? its bcz this will take some time to fetch so we use await along with it to make it load properly. 
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search);   //we setting movie state to the data we get. Now we have the data like posters, title, name,year
  }

  useEffect(() => {
    searchMovies('Batman')  //we are initially showing Batman movie searches as default
  }, []);

  return (
    <div className='app'>
      <h1>MoviesHub</h1>

      <div className="search">

        <input
          placeholder="Search for movies"
          value={searchTerm //We are searching the entered term
        }
          onChange={(e) => setSearchTerm(e.target.value) //e is the event attribute and we get value by e.target.value, everytime we input something, searchterm will update cuz of its setter function
        }
        />

        <img src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm) //the data.Search will take form of searchTerm.Search and then whatever you enter will get the result
          } />

      </div>

      {
        movies?.length > 0 //if the Array of movies we get for particular searchTeam is 0 then No movies found otherwise we map the movies we got and then use MovieCard component to fetch out important details needed
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))
                //important step. we are mapping every movie we got to movie prop and updating moviecard.jsx//
              }


            </div>
          ) : (
            <div className="empty">
              <h2>No movies found!</h2>
            </div>
          )
      }


    </div>
  )
}

export default App;
