import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class MyCaptures extends Component {

    state = {
        single_captures: {},
        uid: firebase.auth().currentUser.uid
    }

    componentDidMount() {
        const userId = this.state.uid;
        const allcaptures = {...this.state.single_captures}
        // Get the capture sessions
        const capture_sessions = firebase.database().ref('capture_sessions');
        const single_captures = firebase.database().ref('single_captures');

        // Retrives the single captures
        capture_sessions.orderByChild("uid").equalTo(userId).on('child_added', (capture) => {
            const userSessionId = capture.key;

            single_captures.orderByChild("session_id").equalTo(userSessionId).on('child_added', (usercapture) => {
                usercapture.val();
                allcaptures[capture.key] = usercapture.val();
                this.setState({single_captures: allcaptures});
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
                        {vals.map((single_capture, key) =>
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
                                    <div className="users__container-capture">
                                        <Link to="/editCaptures" className="button__capture">Modifier</Link>
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
                    <h3 aria-level="3" className="title">Mes captures</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    {this.renderUserCapture()}
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default MyCaptures;