import { apiAddress } from "../api_config"

import Cookies from 'js-cookie';

function getAllMovies(setState)
{
    fetch(apiAddress + "/api/Imdb/GetMoviesOrActors?mtype=-1&pageIndex=0&count=100&search=", {
        method: "GET",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        }
    })
    .then(response => {
        console.log("heeere");
        if(!response.ok)
            throw response
        console.log("nooow");
        return response.json()
    })
    .then(
        data => setState(data.things)
    );
}
function searchMoviesAndActors(searchText, count, pageIndex, setState)
{
    fetch(apiAddress + "/api/Imdb/GetMoviesOrActors?mtype=-1&pageIndex="+pageIndex+"&count="+count+"&search="+searchText, {
        method: "GET",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        }
    })
    .then(response => {
        if(!response.ok)
            throw response
        return response.json()
    })
    .then(
        data => setState(data.things)
    );
}

function AddToWatchList(movieId, callback)
{
    fetch(apiAddress + "/api/Imdb/AddToWatchList", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        },
        body: JSON.stringify({
            movieId: movieId
        })
    })
    .then(response => {
        if(response.status == 401)
        {
            window.setActivePage("Login");
        }
        else {
            callback();
        }
    })
}

function RemoveFromWatchlist(movieId, callback)
{
    fetch(apiAddress + "/api/Imdb/RemoveFromWatchlist", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        },
        body: JSON.stringify({
            movieId: movieId
        })
    })
    .then(response => {
        if(response.status == 401)
        {
            window.setActivePage("Login");
        }
        else {
            callback();
        }
    })
}

function Rate(movieId, rate, comment, callback)
{
    fetch(apiAddress + "/api/Imdb/Rate", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization" : "Bearer " + Cookies.get("token")
        },
        body: JSON.stringify({
            movieId: movieId,
            rate: rate,
            comment: comment
        })
    })
    .then(response => {
        if(response.status == 401)
        {
            window.setActivePage("Login");
        }
        else {
            callback();
        }
    })
}

export {
    getAllMovies,
    searchMoviesAndActors,
    AddToWatchList,
    RemoveFromWatchlist,
    Rate
}