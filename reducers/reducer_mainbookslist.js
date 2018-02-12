
import { MAIN_BOOK_LIST } from '../actions/types';

export default function (state={}, action){

    switch(action.type){
        case MAIN_BOOK_LIST:
        {
            let newObj = Object.assign({},state,{MainBooksList:action.payload});
            return newObj.MainBooksList;
        }

        default:
            return state;
    }
}