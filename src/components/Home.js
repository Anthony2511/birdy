import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            users: {
                first_name: ''
            },
            single_captures: {}

        }
    }
    componentWillMount(){
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + userId).on("value", snapshot => {
            this.setState({ users: snapshot.val() })
        })
        this.getAllCaptures()
    }

    logout() {
        firebase.auth().signOut();
    }

    getAllCaptures() {
        const allCaptures = firebase.database().ref('single_captures');
        allCaptures.on('value', snap => {
            this.setState({
                single_captures: snap.val()
            })
        })

    }

    renderUserCapture() {
        const {single_captures} = this.state;
        if (single_captures !== null) {
            const vals = Object.values(single_captures);
            return (
                <React.Fragment>
                    <div className="capture__container">
                        {vals.map((single_capture,key) =>
                            <div key={key} className="capture__bloc">
                                <div className="capture__name">
                                    <div className="capture__common-name">
                                        <span className="capture__title">Nom commun</span>
                                        <span>{single_capture.common_name}</span>
                                    </div>
                                    <div className="capture__bague">
                                        <span className="capture__title">Numéro de bague</span>
                                        <span>{single_capture.bague}</span>
                                    </div>

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
                    <h3 aria-level="3" className="title">Bienvenue {this.state.users.first_name}</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <Link to="/addCapture" className="button__birdcage">Ajouter une capture</Link>
                    <div className="users__container-capture">
                        <h3 aria-level="3" className="subtitle">Liste des captures</h3>
                        {this.renderUserCapture()}
                    </div>
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default Home;