

import { apiAddress } from "../api_config"
import Cookies from 'js-cookie';


function loginapi(email, password, setState)
{
    fetch(apiAddress + "/api/User/Login", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if(!response.ok)
            throw response
        return response.json()
    })
    .then(
        data => setState(data.token)
    );
}

function googleLoginapi(idToken, setState)
{
    fetch(apiAddress + "/api/User/GoogleLogin", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        },
        body: JSON.stringify({
            idToken: idToken
        })
    })
    .then(response => {
        if(!response.ok)
            throw response
        return response.json()
    })
    .then(
        data => setState(data.token)
    );
}

function getCurrentUserapi(setState)
{
    fetch(apiAddress + "/api/User/CurrentUser", {
        method: "GET",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        },
    })
    .then(response => {
        if(!response.ok)
            throw response
        return response.json()
    })
    .then(
        data => setState(data.user)
    )
}


function registerapi(email, password, username, setState)
{
    fetch(apiAddress + "/api/User/Register", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        },
        body: JSON.stringify({
            email: email, 
            password: password, 
            username: username
        })
    })
    .then(response => {
        if(!response.ok)
            throw response
        return response.json()
    })
    .then(
        data => setState(data.token)
    )
}

export {
    loginapi,
    googleLoginapi,
    getCurrentUserapi,
    registerapi
}