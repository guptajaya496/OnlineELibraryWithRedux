import {combineReducers} from 'redux';
import  MainBooksList from './reducer_mainbookslist';
import FavoritesList from './reducer_favoritebooklist';
import User from './reducer_user';
import Header from './reducer_header';

const rootReducer = combineReducers({
    MainBooksList,
    FavoritesList,
    User,
    Header
});

export default rootReducer;
