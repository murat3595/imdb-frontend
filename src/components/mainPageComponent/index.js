import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.css"
import ReactStars from "react-rating-stars-component";
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import { Rate, AddToWatchList, RemoveFromWatchlist } from '../../api/imdb/index';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


function MainPage() {
  
   
    const onClickPoster = (activeMovieIndex) => {
      window.activeMovie = window.movies[activeMovieIndex];

      window.setActivePage("MoviePage");
    }

    const rateFunc = (rating, movieId) => {
      console.log("aaa", rating, movieId);

      Rate(movieId, rating, "", () => {});
    }

    const AddToWatchListFunc = (movieId) => {
      AddToWatchList(movieId, () => {window.setMovies()})
    }

    const RemoveFromWatchListFunc = (movieId) => {
      RemoveFromWatchlist(movieId,() => {window.setMovies()})
    }



    return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-75">
        <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
          window.movies != null && window.movies.filter(e => e.mType == 0).filter((e,i) => i < 10).map((e, i) => {
            return ( 
            <Card key={"movie"+e.id} style={{ width: '15rem' }}>
              <Card.Img onClick={() => {onClickPoster(i)}} style={{height: "25rem"}} variant="top" src={"moviesandactors/" + e.id + ".jpg"} />
              <Card.Body>
                <Card.Title>
                <div style={{maxHeight: "1.5rem", overflow:"hidden", textOverflow: "ellipsis"}}>{e.name} </div></Card.Title>
                <Card.Text>
                  <div style={{maxHeight: "5rem", overflow:"hidden", textOverflow: "ellipsis"}}>
                    {e.description}
                  </div>
                </Card.Text>
                <span>Your Rating</span>
                <ReactStars
                  count={5}
                  size={24}
                  onChange={((rating) => { rateFunc(rating, e.id); })}
                  value={e.rate ? e.rate.point : 0}
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
                  value={e.rating}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                
                {
                  e.addedToWatchlist == false ? 
                  <MDBBtn onClick={() => {AddToWatchListFunc(e.id)}} color='dark'>
                    Add To Watchlist
                  </MDBBtn> : 
                  <MDBBtn onClick={() => {RemoveFromWatchListFunc(e.id)}} color='dark'>
                    Remove From Watchlist
                  </MDBBtn>
                }
              </Card.Body>
            </Card>
            )
          })
        }
      </Carousel>
    </MDBContainer>
  ) 

}


export default MainPage;