import React, { useEffect, useState } from 'react';
import axios from '../axios';
import requests from '../requests';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const num = Math.floor(Math.random() * request.data.results.length - 1); // random number to fetch movie
      //   console.log(request);
      setMovie(request.data.results[num]);
      return request;
    };
    fetchData();
  }, []);

  //   console.log(movie);
  const truncateOverview = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str;
  };
  // let str = movie?.overview;
  // if (str?.length > 150) {
  //   str = str.substr(0, 150);
  // }
  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner_content'>
        {/* title  */}
        <h1 className='banner_title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* div for 2 buttons  */}
        <button className='banner_button'>Play</button>
        <button className='banner_button'>My List</button>
        {/* description  */}
        <h1 className='banner_description'>
          {truncateOverview(movie?.overview, 150)}
        </h1>
      </div>
      <div className='banner_fadeBottom'></div>
    </header>
  );
};

export default Banner;
