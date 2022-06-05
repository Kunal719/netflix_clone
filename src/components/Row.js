import React, { useEffect, useState } from 'react';
import axios from '../axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const imagesURL = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState('');

  useEffect(() => {
    // async function to fetch data from third party
    const fetchData = async () => {
      const request = await axios.get(fetchURL);
      //   console.log(request);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchURL]);

  //   console.log(movies);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerURL) {
      setTrailerURL('');
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.orignal_name || '')
        .then((url) => {
          const urlParam = new URLSearchParams(new URL(url).search); // to get id
          setTrailerURL(urlParam.get('v'));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className='row'>
      {/* title */}
      <h2 style={{ color: 'white' }}>{title}</h2>
      {/* container with images */}
      <div className='row_images'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_image ${isLargeRow && 'row_image_large'}`}
            src={`${imagesURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </div>
  );
};

export default Row;
