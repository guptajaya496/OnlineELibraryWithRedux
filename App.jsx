
import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers/index';
import Home from './components/home.jsx';
import Register from "./containers/register.jsx";
import Login from "./containers/login.jsx";
import Library from "./containers/library.jsx";
import AboutUs from './components/aboutus.jsx';
import ContactUs from './components/contactus.jsx';
import User from './components/user.jsx';
import Logout from './containers/logout.jsx';
import Header from "./containers/header.jsx";
import Footer from "./components/footer.jsx";

const history = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const  store=createStoreWithMiddleware(combinedReducers);

class App extends Component{

   render(){
        return(
            <div>
                <Provider store={store}>
                    <div>
                        <Header/>

                        <Router history={history}>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route  path='/aboutus' component={AboutUs} />
                                <Route path='/library' component={Library} />
                                <Route  path='/contactus' component={ContactUs} />
                                <Route  path='/login' component={Login} />
                                <Route  path='/register' component={Register} />
                                <Route  path='/user' component={User} />
                                <Route  path='/logout' component={Logout} />
                            </Switch>
                        </Router>

                        <Footer/>
                    </div>
                </Provider>
            </div>
        );
   }
}

export default App;

