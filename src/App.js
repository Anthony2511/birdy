import React, {Component} from 'react';
import config from './config';
import './static/css/styles.css';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import Capture from './components/Capture';
import Encyclopedie from './components/Encyclopedie';
import Map from './components/Map';
import Users from './components/Users';

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
                    <Route path="/addCapture" component={Capture}/>
                    <Route path="/encyclopedie" component={Encyclopedie}/>
                    <Route path="/map" component={Map}/>
                    <Route path="/users" component={Users}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        )
    }
}

export default App;