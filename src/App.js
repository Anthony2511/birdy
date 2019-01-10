import React, {Component} from 'react';
import config from './config';
import './static/css/styles.css';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";

class App extends Component {

    state = {
        users: null
    }

    componentDidMount() {
        firebase.initializeApp(config);

        const birdy = firebase.database().ref('users');
        birdy.on('value', snap => {
            this.setState({
                users: snap.val()
            })
        });
    }

    render() {
        return (
            <div>
                <LoginForm/>
                <div className="content">
                    <Switch>
                        <Route path="/register" component={RegisterForm}/>
                    </Switch>
                </div>
            </div>


        )
    }
}

export default App;