
import {DO_REGISTER, DO_LOGIN, DO_LOGOUT} from '../actions/types';

export default function (state={}, action){

    switch(action.type){
        case DO_REGISTER:
        {
            let newObj = Object.assign({},state,{RegisterUser:action.payload});
            return newObj.RegisterUser;
        }

        case DO_LOGIN:
        {
            let newObj = Object.assign({},state,{LoginUser:action.payload});
            return newObj.LoginUser;
        }

        case DO_LOGOUT:
        {
            let newObj = Object.assign({},state,{LogoutUser:action.payload,showComponent :false});
            return newObj;
        }

        default:
            return state;
    }
}

