import React,{Component} from 'react';
import Book from '../components/Book.jsx';
import {connect} from 'react-redux';
import {fetchMainBooksList,fetchHeader} from "../actions/index";
import {bindActionCreators} from "redux";
import Config from '../config';

class MainBooksList extends Component{

    constructor(props){
        super(props);

        this.state = {
            BookList : [],
            FeaturedList: []
        };

        this.getFeaturedBooksList = this.getFeaturedBooksList.bind(this);
    }

    componentWillMount(){
        this.props.fetchHeader(Config.CALLFROMHOME);
        this.props.fetchMainBooksList();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            let temp = nextProps.data;
            this.setState({BookList : temp.MainBooksList});
            this.getFeaturedBooksList(temp.MainBooksList);
        }
    }

    getFeaturedBooksList(mainList){
        if(mainList !== null || mainList !== undefined){
            if(mainList.length > 0){
                let featuredBookList = mainList.filter(book => {
                    return book.featured === "featured"
                });

                this.setState({FeaturedList : featuredBookList});
            }
        }
    }

    render(){
        const bookList =  (this.state.FeaturedList.length > 0) ? this.state.FeaturedList.map((book) => {
            return(
                <div key={book.title} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMHOME}/>
                </div>
            );
        }) : null;

        return(
            <div className="container">
                <h1>New Arrivals</h1>
                <div className="row ">
                    {bookList}
                </div>
            </div>
        );
    }
}

function  mapStateToProps(state){

    return {
        data : state
    };
}

function mapDispatchToProps(dispatch){

    return bindActionCreators({
        fetchMainBooksList,
        fetchHeader
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBooksList);

