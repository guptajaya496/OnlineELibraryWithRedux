
import {GET,POST,DELETE,CORS} from "./types";

export function getData(url,header) {
    return fetch(url,{
        method:GET,
        mode: CORS,
        headers: header
    }).then(function(response){
        return response.json();
    });
}

export function postData(url,header, data){
    return fetch(url, {
        method: POST,
        mode: CORS,
        headers: header,
        body:JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    })
}

export function deleteData(url,header, data){
    return fetch(url, {
        method: DELETE,
        mode: CORS,
        headers: header,
        body:JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    })
}