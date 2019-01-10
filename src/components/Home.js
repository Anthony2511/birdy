import React, {Component} from 'react';
import firebase from 'firebase';
import Header from './Header';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </React.Fragment>
        );

    }

}

export default Home;