
import {FAVORITE_BOOK_LIST, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from "../actions/types";

export default function (state={}, action){

    switch(action.type){
        case FAVORITE_BOOK_LIST :
        {
            let newObj = Object.assign({},state,{FavoritesList:action.payload});
            return newObj.FavoritesList;
        }

        case ADD_TO_FAVORITES :
        {
            let newObj = Object.assign({},state,{FavoritesList:action.payload});
            return newObj.FavoritesList;
        }

        case REMOVE_FROM_FAVORITES :
        {
            let newObj = Object.assign({},state,{FavoritesList:action.payload});
            return newObj.FavoritesList;
        }

        default:
            return state;
    }
}