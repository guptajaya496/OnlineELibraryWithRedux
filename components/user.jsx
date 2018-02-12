import React, {Component} from 'react';
import MyFavoriteBooksList from '../containers/myfavoritesbooklist.jsx';

class User extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="row row-header">
                    <MyFavoriteBooksList/>
                </div>
            </div>
        );
    }
}

export default User;
