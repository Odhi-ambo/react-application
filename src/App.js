import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=87c400b&t='; // Update the API URL structure

/*const movie={
  "Title":"Amazing Spiderman Syndrome",
  "Year": "2023",
  "ImdbID": "tt2586634",
  "Type": "movie",
  "Poster": "N/A"
}*/


const App = () => {
  const [movies, setMovies] =useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}${title}`); // Updated API URL with dynamic search term
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.Search);
      setMovies(data.search || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    searchMovies(searchTerm); // Use the dynamic search term in the API request
  }, [searchTerm]); // Re-run the effect whenever the searchTerm state changes

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the searchTerm state with user input
        />
        <img src={SearchIcon} alt='Search' onClick={() => searchMovies(searchTerm)} />
      </div>
      {
        movies?.length > 0
        ?(
       
      <div className='container'>{/* Display movie search results here */}
    {movies.map((movie) =>(
      //<MovieCard movie = {movie}/>
      <MovieCard key={movie.imdbID} movie={movie} />
    ))}
    </div>
        ):(
          <div className='empty'>
            <h2>No Movies found</h2>
          </div>
        )
}
</div>
  );
};

export default App;
