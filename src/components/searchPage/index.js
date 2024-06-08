import React, { useState, useEffect } from 'react';

import "./index.css"


import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer } from 'mdb-react-ui-kit';

function SearchPage() {

  const [moviesThings, setMoviesThings] = useState(null);
  const [peopleThings, setPeopleThings] = useState(null);

  useEffect(() => {
    if(window.searchThings == null)
      return;
    setMoviesThings(window.searchThings.filter(s => s.mType == 0));

    setPeopleThings(window.searchThings.filter(s => s.mType == 1));
  }, [window.searchThings])

  
  const onClickPoster = (movie) => {
    window.activeMovie = movie;

    window.setActivePage("MoviePage");
  }

  
    return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-75">
        <MDBBadge className='ms-2 bg-dark'>Movies</MDBBadge>
                <MDBTable align='middle'>
                  <MDBTableHead>
                    <tr>
                      <th scope='col'> </th>
                      <th scope='col'>Title</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {
                      moviesThings == null ? <>No movies</> : moviesThings.map((s) => {
                        return (<tr onClick={() => {onClickPoster(s)}}>
                        <td>
                          <div className='d-flex align-items-center'>
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
                      </tr>)
                      })
                      }
                  </MDBTableBody>
                </MDBTable>

        <MDBBadge className='ms-2 bg-dark'>People</MDBBadge>
                <MDBTable align='middle'>
                  <MDBTableHead>
                    <tr>
                      <th scope='col'> </th>
                      <th scope='col'>Name</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {
                      moviesThings == null ? <>No people</> : peopleThings.map(s => {
                        return (<tr>
                        <td>
                          <div className='d-flex align-items-center'>
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
                      </tr>)
                      })
                      }
                  </MDBTableBody>
                </MDBTable>
        </MDBContainer>
  ) 

}


export default SearchPage;