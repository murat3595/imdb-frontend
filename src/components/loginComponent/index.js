import React, { useState, useEffect } from 'react';

import "./index.css"
import Cookies from 'js-cookie';

import { GoogleOAuthProvider,GoogleLogin  } from '@react-oauth/google';

import { loginapi, registerapi, googleLoginapi } from '../../api/session/index'

import { 
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox } from 'mdb-react-ui-kit';

function Login() {
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };


  const signInFunc = () => {
    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("passwordLogin").value;

    loginapi(email, password, (e) => {Cookies.set("token",e); window.setUser(); window.setMovies(); console.log(e); window.setActivePage("MainPage")});
  }

  const signUpFunc = () => {
    var username = document.getElementById("usernameSign").value;
    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("passwordLogin").value;
    
    registerapi(email, password, username, (e) => {Cookies.set("token",e);  window.setUser();window.setMovies(); console.log(e); window.setActivePage("MainPage")});
  }


  const googleLoginFunc = (idToken) => {
    googleLoginapi(idToken, (e) => {Cookies.set("token",e);  window.setUser();window.setMovies(); window.setActivePage("MainPage")});
  }
  
    return (
              <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
              
                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                      Login
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                      Register
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                  <MDBTabsPane open={justifyActive === 'tab1'}>

                    <MDBInput wrapperClass='mb-4' label='Email address' id='emailLogin' type='email'/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='passwordLogin' type='password'/>


                    <MDBBtn className="mb-4 w-100" onClick={signInFunc}>Sign in</MDBBtn>

                  </MDBTabsPane>

                  <MDBTabsPane open={justifyActive === 'tab2'}>


                    <MDBInput wrapperClass='mb-4' label='Username' id='usernameSign' type='text'/>
                    <MDBInput wrapperClass='mb-4' label='Email' id='emailSign' type='email'/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='passwordSign' type='password'/>


                    <MDBBtn className="mb-4 w-100" onClick={signUpFunc}>Sign up</MDBBtn>

                  </MDBTabsPane>

                  
                </MDBTabsContent>
                <GoogleOAuthProvider clientId="754406716614-3hn1va93cpv40h3kkbit9p9iqage3tbb.apps.googleusercontent.com">
                  <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    googleLoginFunc(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                /></GoogleOAuthProvider>
              </MDBContainer>
  ) 

}


export default Login;