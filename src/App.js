import React, {Component} from 'react';
import config from './config';
import './static/css/styles.css';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import AddCapture from './components/AddCapture';
import Encyclopedie from './components/Encyclopedie';
import Map from './components/Map';
import AllUsers from './components/AllUsers';

class App extends Component {
    constructor() {
        super();
        this.state = ({
            user: null,
        });
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        firebase.initializeApp(config);
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({user});
                    localStorage.setItem('user', user.uid);

                } else {
                    this.setState({user: null});
                    localStorage.removeItem('user');
                }
            }
        )
    }

    render() {
        if (this.state.user === null) {
            return (
                <Switch>
                    <Route path="/" exact component={LoginForm}/>
                    <Route path="/register" component={RegisterForm}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }
        return (
            <div>
                <Switch>
                    <Route path="/register" component={RegisterForm}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/addCapture" component={AddCapture}/>
                    <Route path="/encyclopedie" component={Encyclopedie}/>
                    <Route path="/map" component={Map}/>
                    <Route path="/users" component={AllUsers}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        )
    }
}

export default App;