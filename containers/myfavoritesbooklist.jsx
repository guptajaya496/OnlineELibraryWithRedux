import React,{Component} from 'react';
import Book from '../components/Book.jsx'
import Config from '../config';
import {connect} from "react-redux";
import {fetchMainBooksList, fetchFavoriteBooksList,addToFavorites,removeFromFavorites,fetchHeader} from "../actions/index";
import {bindActionCreators} from "redux";

class MyFavoriteBooksList extends Component{

    constructor(props){
        super(props);

        this.state = {
            MyFavoriteList : [],
            EbookPath : '',
            SearchResults : [],
            EmptySearchList : '',
            selectedFilterValue:'',
            list:{},
            Booklist : [],
            FavList:[]
        };

        this.AddFavoriteBookHandler = this.AddFavoriteBookHandler.bind(this);
        this.RemoveFavoriteBookHandler = this.RemoveFavoriteBookHandler.bind(this);
        this.openEbookHandler = this.openEbookHandler.bind(this);
        this.onChangeFilterValueHandler = this.onChangeFilterValueHandler.bind(this);
        this.onSearchClickHandler = this.onSearchClickHandler.bind(this);
        this.AddFavoriteBookHandler = this.AddFavoriteBookHandler.bind(this);
        this.renderFavoritesList = this.renderFavoritesList.bind(this);
    }

    componentWillMount(){
        this.props.fetchHeader(Config.CALLFROMUSER);
        this.props.fetchMainBooksList();
        this.props.fetchFavoriteBooksList();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            let temp = nextProps.data;
            this.setState({Booklist : temp.MainBooksList});
            this.setState({FavList : temp.FavoritesList});
            this.renderFavoritesList(temp.MainBooksList, temp.FavoritesList);
        }
    }

    onChangeFilterValueHandler(e){
        this.setState({selectedFilterValue:e.target.value});
        let filterValue= this.state.selectedFilterValue;
        let BooksList = this.state.Booklist;
        let searchList = [];

        searchList = BooksList.filter(book => {
            return (
                book["title"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1 ||
                book["author"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1||
                book["publication"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1
            )
        });

        if(searchList && searchList.length > 0){
            this.setState({SearchResults:searchList});
        }
        else
            this.setState({EmptySearchList:"No Results Found!!!"});
    }

    AddFavoriteBookHandler(bookObj){
        this.props.addToFavorites(bookObj);
    }

    onSearchClickHandler(){

        let filterValue=this.state.selectedFilterValue;
        let BooksList = this.state.Booklist;
        let searchList = [];

        searchList = BooksList.filter(book => {
            return (
                book["title"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1 ||
                book["author"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1||
                book["publication"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1
            )
        });

        if(searchList && searchList.length > 0){
            this.setState({SearchList:searchList});
        }
        else
            this.setState({EmptySearchList:"No Results Found!!!"});
    }

    RemoveFavoriteBookHandler(bookObj){
        this.props.removeFromFavorites(bookObj);
    }

    openEbookHandler(bookObj){
        this.setState({EbookPath:bookObj.path});
    }

    renderFavoritesList(mainList,favoriteList){

        let temp = [];

        if(favoriteList){
            if(favoriteList.length > 0){
                for(let i=0; i <mainList.length; i++){
                    for(let j=0; j<favoriteList.length; j++){
                        if(mainList[i]._id === favoriteList[j]){
                            temp.push(mainList[i]);
                        }
                    }
                }
                this.setState({MyFavoriteList:temp});
            }
            else{
                this.setState({MyFavoriteList:[]});
            }
        }
    }

    render(){

        const favBookList = (this.state.MyFavoriteList)? this.state.MyFavoriteList.map((book) => {
            return (
                <div key={book.title} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMUSER}
                          triggerParentUpdate={this.RemoveFavoriteBookHandler}
                          openEBook={this.openEbookHandler}/>
                </div>
            );
        }) : null;

        const searchbookList = (this.state.SearchResults)? this.state.SearchResults.map((book) => {
            return (
                <div key={book.id} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMLIBRARY} triggerParentUpdate={this.AddFavoriteBookHandler}/>
                </div>
            );
        }): null;

        return(
            <div className="container">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-sm-12">
                            <div>
                                <h1>Search Catalog</h1>
                                <div className="input-group col-sm-1"></div>
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
                                                    (this.state.SearchResults.length > 0) ?
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

                <div className="row row-header"></div>
                <div className="container row-header">
                    <h1>My Favorites</h1>
                </div>
                <div className="row ">
                    {favBookList}
                </div>
            </div>
        );
    }
}

function  mapStateToProps(state){

    return{
        data : state
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
            fetchMainBooksList,
            fetchFavoriteBooksList,
            addToFavorites,
            removeFromFavorites,
            fetchHeader
           }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoriteBooksList);
