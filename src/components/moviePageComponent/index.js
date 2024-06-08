import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBContainer
} from 'mdb-react-ui-kit';
import "./index.css"
import ReactStars from "react-rating-stars-component";

import { Rate, AddToWatchList, RemoveFromWatchlist } from '../../api/imdb/index';


function MoviePage() {

  
  const rateFunc = (rating, movieId) => {
    console.log("aaa", rating, movieId);

    Rate(movieId, rating, "", () => {});
  }
  const AddToWatchListFunc = (movieId) => {
    AddToWatchList(movieId, () => {window.setMovies(); window.activeMovie.addedToWatchlist = true;})
  }

  const RemoveFromWatchListFunc = (movieId) => {
    RemoveFromWatchlist(movieId,() => {window.setMovies(); window.activeMovie.addedToWatchlist = false;})
  }
    return (
      
      <MDBContainer className="p-3 my-5 d-flex flex-column w-75">
               <MDBCard>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                  <MDBCardImage width={"25%"} src={"moviesandactors/"+window.activeMovie.id+".jpg"} fluid  />
                  <a>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                  </a>
                </MDBRipple>
                <div id='viewRangerContainer'>{parse(window.activeMovie.videoLink)}</div>
                <MDBCardBody>
                  <MDBCardTitle>{window.activeMovie.name}</MDBCardTitle>
                  <MDBCardText>
                    {window.activeMovie.description}
                  </MDBCardText>
                  
                <span>Your Rating</span>
                <ReactStars
                  count={5}
                  size={24}
                  onChange={((rating) => { rateFunc(rating, window.activeMovie.id); })}
                  value={window.activeMovie.rate ? window.activeMovie.rate.point : 0}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <span>General Rating</span>
                <ReactStars
                  edit={false}
                  count={5}
                  size={24}
                  value={window.activeMovie.rating}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                  {
                    window.activeMovie.addedToWatchlist == false ? 
                    <MDBBtn onClick={() => {AddToWatchListFunc(window.activeMovie.id)}} color='dark'>
                      Add To Watchlist
                    </MDBBtn> : 
                    <MDBBtn onClick={() => {RemoveFromWatchListFunc(window.activeMovie.id)}} color='dark'>
                      Remove From Watchlist
                    </MDBBtn>
                  }
                </MDBCardBody>
              </MDBCard>
      </MDBContainer>
  ) 

}
export default MoviePage;