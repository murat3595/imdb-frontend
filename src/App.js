import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, act } from 'react';


import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInputGroup,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import { loginapi, getCurrentUserapi } from './api/session';

import { getAllMovies, searchMoviesAndActors } from './api/imdb';

import Login from './components/loginComponent';
import MainPage from './components/mainPageComponent'
import MoviePage from './components/moviePageComponent'
import SearchPage from './components/searchPage'
import WatchList from './components/watchListComponent'
import Cookies from 'js-cookie';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  window.currentUser = currentUser;

  const [movies, setMovies] = useState(null);
  window.movies = movies;


  useEffect(() => {

    getCurrentUserapi(setCurrentUser);
    getAllMovies(setMovies);
  },[])

  window.setMovies = () => {
    getAllMovies(setMovies);
  }

  window.setUser = () => {
    getCurrentUserapi(setCurrentUser);
  }

  window.returnToHome = () => {
    setActivePage("MainPage"); 
    window.setMovies();
  }

  const [activePage, setActivePage] = useState("MainPage") //MainPage, Login, SearchPage, MoviePage, WatchListPage
  window.setActivePage = setActivePage;
  window.activePage = activePage;



  const [searchThings, setSearchThings] = useState(null);
  window.searchThings = searchThings;

  const searchFunc = () => {
    let searchText = document.getElementById("searchbox").value;

    searchMoviesAndActors(searchText, 100, 0, (e) => { setSearchThings(e); window.setActivePage("SearchPage"); })
  }

  return (
 <>
      {
        activePage == "Login" ? <></> :
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark  bg-body-tertiary w-75 m-auto">
          <div className="container-fluid">
            <button
              data-mdb-collapse-init
              className="navbar-toggler"
              type="button"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <a className="navbar-brand mt-2 mt-lg-0" href="#">
                <img
                  src="imdb.png"
                  height="15"
                  alt="MDB Logo"
                  loading="lazy"

                  onClick={window.returnToHome}
                />
              </a>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>

              
            <div className="d-flex" style={{width:"100%"}}>
              <form className="d-flex input-group ">
                <input
                  id="searchbox"
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onKeyDown={(e) => {
                    if(e.keyCode == 13)
                    {
                      searchFunc();
                    }
                  }}
                />
                <span className="input-group-text border-0" id="search-addon" onClick={searchFunc}>
                  <i className="fas fa-search"></i>
                </span>
              </form>
            </div>
            </div>


            <div className="d-flex align-items-center">

              <div className="dropdown">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => { setActivePage("WatchListPage") }}>Watchlist</a>
                </li>
                {
                  window.currentUser != null ? <>
                  <li className="nav-item">
                    <a className="nav-link" href="#">{currentUser.username}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => { setCurrentUser(null); Cookies.remove("token"); window.setMovies(); window.returnToHome(); }} >Logout</a>
                  </li>
                  </> :
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => { setActivePage("Login") }}>Sign in</a>
                  </li>
                }
              </ul>
              </div>
            </div>
          </div>
        </nav>
      }

      {
        activePage == "MainPage" ? <MainPage></MainPage> :
        activePage == "Login" ? <Login></Login> :
        activePage == "SearchPage" ? <SearchPage></SearchPage> :
        activePage == "MoviePage" ? <MoviePage></MoviePage> :
        activePage == "WatchListPage" ? <WatchList></WatchList>
        : <></>
      }
  
 </>
  );
}

export default App;
