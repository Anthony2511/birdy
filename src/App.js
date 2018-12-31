import React, {Component} from 'react';
import config from './config';
import './static/css/styles.css';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

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
            <LoginForm/>
        )
    }
}

export default App;