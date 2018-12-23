import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import './static/css/styles.css';
import firebase from 'firebase';
import Header from './components/Header'

export default class App extends Component {

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
            <React.Fragment>
                <Header/>
                <p className="title"> Coucou</p>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
