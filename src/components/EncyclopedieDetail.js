import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class EncyclopedieDetail extends Component {

    state= {
        bird: null
    }

    componentWillMount() {
        const birdId = this.props.match.params.id;
        firebase.database().ref('/birds/' + birdId).once('value').then((snapshot) => {
            let bird = snapshot.val();
            console.log(snapshot.val);
            this.setState({bird});
        });
    }

    render() {
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Nom de l'oiseau</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <p>Test 2</p>
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default EncyclopedieDetail;