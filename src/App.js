import React, {Component} from 'react';
import config from './config';
import './static/css/styles.css';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
//import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./components/Home";

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
                console.log(user);
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
        return (
            <div>
                {this.state.user ? (<Home/>) : (<LoginForm/>)}
            </div>


        )
    }
}

export default App;