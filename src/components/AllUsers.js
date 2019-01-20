import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class AllUsers extends Component {
    state = {
        users: {}
    }

    componentWillMount() {
        firebase.database().ref('/users/').once('value').then((snapshot) => {
            let users = [];
            snapshot.forEach((item) => {
                users.push(item.val());
            });
            this.setState({users});
        });
    }

    renderUser() {
        const {users} = this.state;
        if (users !== null) {
            const vals = Object.values(users);
            return (
                <ul>
                    {vals.map(users =>
                        <li key={users.email}>
                            {users.email}
                        </li>
                    )}

                    {vals.map(users =>
                        <li key={users.first_name}>
                            {users.first_name}
                        </li>
                    )}
                </ul>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <p>TEST 3</p>
                    {this.renderUser()}
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default AllUsers;