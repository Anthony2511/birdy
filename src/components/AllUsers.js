import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    state = {
        users: {}
    }

    logout() {
        firebase.auth().signOut();
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
                <React.Fragment>
                    <div className="users__container">
                        {vals.map(users =>
                            <div key={users.uid} className="users__bloc">
                                <div className="users__name">
                                    <span className="users__item users__item--bold">
                                        {users.first_name}
                                    </span>
                                    <span className="users__item users__item--bold">
                                        {users.last_name}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Liste des utilisateurs</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    {this.renderUser()}
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default AllUsers;