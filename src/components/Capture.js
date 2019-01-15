import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class Capture extends Component {

    render() {
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <p>TEST</p>
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default Capture;