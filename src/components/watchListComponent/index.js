import React, { useState, useEffect } from 'react';

import "./index.css"

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer } from 'mdb-react-ui-kit';


import { Rate, AddToWatchList, RemoveFromWatchlist } from '../../api/imdb/index';
function WatchList() {
  const onClickPoster = (movie) => {
    window.activeMovie = movie;

    window.setActivePage("MoviePage");
  }

  const RemoveFromWatchListFunc = (movieId) => {
    RemoveFromWatchlist(movieId,() => {window.setMovies()})
  }
  
    return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-75">
        <MDBBadge className='ms-2 bg-dark'>WatchList Movies</MDBBadge>
                <MDBTable align='middle'>
                  <MDBTableHead>
                    <tr>
                      <th scope='col'> </th>
                      <th scope='col'>Title</th>
                      <th scope='col'>General Rating</th>
                      <th scope='col'>YourRating</th>
                      <th scope='col'></th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {
                      window.movies == null ? <>No movies</> : window.movies.filter(f => f.addedToWatchlist == true).map((s) => {
                        return (<tr>
                        <td>
                          <div  onClick={() => {onClickPoster(s)}} className='d-flex align-items-center'>
                            <img
                              src={'moviesandactors/'+ s.id + ".jpg"}
                              alt=''
                              style={{ width: '8rem', height: '8rem' }}
                              className='rounded-circle'
                            />
                          </div>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{s.name}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{s.name}</p>
                        </td>
                        <td>
                        <MDBBtn onClick={() => {RemoveFromWatchListFunc(s.id)}} color='dark'>
                          Remove From Watchlist
                        </MDBBtn>
                        </td>
                      </tr>)
                      })
                      }
                  </MDBTableBody>
                </MDBTable>
        </MDBContainer>
  ) 
}


export default WatchList;