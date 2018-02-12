import {FETCH_HEADER} from "../actions/types";

export default function (state={}, action){

    switch(action.type){
        case FETCH_HEADER :
        {
            let newObj = Object.assign({},state,{showComponent:action.payload});
            return newObj.showComponent;
        }

        default:
            return state;
    }
}