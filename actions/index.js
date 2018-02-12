
import Config from '../config';
import {deleteData, getData, postData} from "./services";

import { MAIN_BOOK_LIST, FAVORITE_BOOK_LIST, ADD_TO_FAVORITES,
         REMOVE_FROM_FAVORITES,DO_LOGIN,DO_REGISTER, FETCH_HEADER,DO_LOGOUT} from './types';

function successMethod(action, data) {
    return {
        type: action,
        payload : data
    }
}

function getHeader(token){

    let header = {};

    if(token === ''){
        header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
            'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    }
    else{
        header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
            'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
            'Access-Control-Allow-Headers': 'Content-Type',
            'x-access-token': token
        }
    }

    return header;
}

export function fetchMainBooksList() {

    let token = '';
    let header = getHeader(token);

    return function(dispatch){
        return getData(Config.URLBOOKSAPI,header).then(results => {
            dispatch(successMethod(MAIN_BOOK_LIST,results));
            dispatch(successMethod(FETCH_HEADER,false));
        })
    }
}

export function fetchFavoriteBooksList() {
    let token = localStorage.getItem(Config.ACCESS_TOKEN_KEY);

    let header = getHeader(token);

    return function(dispatch){
        return getData(Config.URLFAVORITESAPI,header).then(results =>{

            let response = '';

            if(results === null || results === undefined || results.books === undefined || results.books === null){
                response = [];
            }
            else{
                response = results.books;
            }

            dispatch(successMethod(FAVORITE_BOOK_LIST,response));
            dispatch(successMethod(FETCH_HEADER,true));
        });
    }
}

export function addToFavorites(bookObj) {

    let token = localStorage.getItem(Config.ACCESS_TOKEN_KEY);
    let header = getHeader(token);

    const bookId = bookObj._id;
    let data = {bookId};

    if(token !== null) {
        return function (dispatch) {
            return postData(Config.URLFAVORITESAPI,header,data).then(json => {
                if(json != null){
                    dispatch(successMethod(ADD_TO_FAVORITES,json.books))
                }
            });
        };
    }
}

export function removeFromFavorites(bookObj) {

    let token = localStorage.getItem(Config.ACCESS_TOKEN_KEY);
    let header = getHeader(token);
    const bookId = bookObj._id;
    let data = {bookId};

    if(token !== null) {
        return function (dispatch) {
            return deleteData(Config.URLFAVORITESAPI,header,data).then(json => {
                if(json != null){
                    dispatch(successMethod(REMOVE_FROM_FAVORITES,json.books))
                }
            });
        };
    }
}

export function doLogin(username, password,history) {

    let token = '';
    let header = getHeader(token);
    let data = {
        "username":username,
        "password":password
    };

    return function(dispatch){
        return postData(Config.URLLOGINAPI,header, data).then(results =>{
            dispatch(successMethod(DO_LOGIN,results));
        })
    };
}

export function doRegister(firstname, lastname, username,password,emailid, confirmpassword,history) {

    let token = '';
    let header = getHeader(token);
    let data = {
        "firstName":firstname,
        "lastName": lastname,
        "username":username,
        "password":password,
        "emailId":emailid,
        "confirmPassword":confirmpassword
    };

    return function(dispatch) {
        return postData(Config.URLREGISTERAPI,header,data).then(json => {
            dispatch(successMethod(DO_REGISTER,json));
        });
    };
}

export function doLogout() {

    let token = '';
    let header = getHeader(token);
    let data = {};

    return function(dispatch) {
        return getData(Config.URLLOGOUTAPI,header,data).then(json => {
            dispatch(successMethod(DO_LOGOUT,json));
            dispatch(successMethod(FETCH_HEADER,false));
        });
    };
}

export function fetchHeader(callFrom) {
    return function (dispatch){

        let result = false;

        switch (callFrom){
            case Config.CALLFROMHOME:
            {
                return result = false;
            }

            case Config.CALLFROMLIBRARY:
            {
                return result = false;
            }

            case Config.CALLFROMLOGIN:
            {
                return result = false;
            }

            case Config.CALLFROMUSER:
            {
                return result = true;
            }

            case Config.CALLFROMLOGOUT:
            {
                return result = false;
            }

            default:
            {
                return result = false;
            }
        }

        dispatch(successMethod(FETCH_HEADER,result));
    };
}