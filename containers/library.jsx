import React, {Component} from 'react';
import Book from '../components/Book.jsx';
import Config from '../config';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addToFavorites, fetchMainBooksList, fetchHeader} from "../actions";

class Library extends Component {

    constructor(props) {
        super(props);

        this.state ={
            BookList: [],
            SearchList : [],
            EmptySearchList : '',
            selectedFilterValue:'',
            MyFavoriteList: []
        };

        this.onChangeFilterValueHandler = this.onChangeFilterValueHandler.bind(this);
        this.onSearchClickHandler = this.onSearchClickHandler.bind(this);
        this.AddFavoriteBookHandler = this.AddFavoriteBookHandler.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
    }

    componentWillMount(){
        this.props.fetchHeader(Config.CALLFROMLIBRARY);
        this.props.fetchMainBooksList();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            let temp = nextProps.data;

            this.setState({BookList : temp.MainBooksList});
            this.setState({FavList : temp.FavoritesList});
        }
    }

    onChangeFilterValueHandler(e){
        this.setState({selectedFilterValue:e.target.value});
        this.searchBooks();
    }

    searchBooks(){

        let searchList = [];

        searchList = this.state.BookList.filter(book => {
            return (
                book["title"].toLowerCase().indexOf(this.state.selectedFilterValue.toLowerCase()) != -1 ||
                book["author"].toLowerCase().indexOf(this.state.selectedFilterValue.toLowerCase()) != -1||
                book["publication"].toLowerCase().indexOf(this.state.selectedFilterValue.toLowerCase()) != -1
            )
        });

        if(searchList && searchList.length > 0){
            this.setState({SearchList:searchList});
        }
        else
            this.setState({EmptySearchList:"No Results Found!!!"});
    }

    AddFavoriteBookHandler(bookObj){

        let token = localStorage.getItem(Config.ACCESS_TOKEN);

        if(token !== null){

            const bookId = bookObj._id;

            fetch(Config.URLFAVORITESAPI , {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                    'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'x-access-token' : token
                },
                body:JSON.stringify({
                    bookId
                })
            })
                .then(results => {
                    if(results !== null){
                        return results.json();
                    }
                })
                .then(json => {
                    if(json !== null){
                        console.log(json.books);
                        this.setState({FavoriteBookList:json.books});
                        console.log(this.state.FavoriteBookList);
                    }
                })
                .then(res =>{
                    let temp = [];

                    if(this.state.FavoriteBookList){
                        console.log(this.state.FavoriteBookList.length);
                        if(this.state.FavoriteBookList.length > 0){
                            for(let i=0; i <this.state.MainBookList.length; i++){
                                for(let j=0; j<this.state.FavoriteBookList.length; j++){
                                    if(this.state.MainBookList[i]._id === this.state.FavoriteBookList[j]){
                                        temp.push(this.state.MainBookList[i]);
                                    }
                                }
                            }

                            this.setState({MyFavoriteList:temp});
                            console.log("temp : " ,temp);
                        }
                    }
                });
        }
        else{
            alert("Please login to add to the favorites!!!");
        }
    }

    onSearchClickHandler(){
        this.searchBooks();
    }

    render(){

        const searchbookList = this.state.SearchList.map((book) => {
            return (
                <div key={book.title} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMLIBRARY} triggerParentUpdate={this.AddFavoriteBookHandler}/>
                </div>
            );
        });

        return(
            <div>

                <div className="container">
                    <div className="row row-header">
                        <div className="col-sm-12">
                            <div>
                                <h1>Search Catalog</h1>
                                <div className="input-group">

                                    <input type="text" className="form-control input-group col-sm-10 " value={this.state.selectedFilterValue} onChange={this.onChangeFilterValueHandler} placeholder="Search"></input>
                                    <div className="input-group-btn">
                                        <button className="btn btn-default btn-block-lg" type="submit" onClick={this.onSearchClickHandler}>
                                            <i className="glyphicon glyphicon-search"></i>
                                        </button>
                                    </div>

                                </div>
                                <div className="containerPadding"></div>
                                <div>
                                    <div className="container ">
                                        <h1>Search Results</h1>
                                        <div className="row ">
                                            <div className="col-sm-12">
                                                {
                                                    (this.state.SearchList.length > 0) ?
                                                        searchbookList :
                                                        this.state.EmptySearchList
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        data : state
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchMainBooksList,
        addToFavorites ,
        fetchHeader
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
