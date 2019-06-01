import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class MyCaptures extends Component {

    state = {
        single_captures: null,
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
            const vals = Object.keys(single_captures);
            return (
                <React.Fragment>
                    <div className="capture__container">
                        {vals.map((key) =>
                            <div key={key} className="capture__bloc">
                                <div className="button__edit">
                                    <Link to={'/editCaptures/' + key} key={key} className="button__link-edit"><span className="hidden">Modifier</span></Link>
                                </div>
                                <div className="capture__name">
                                    <div className="capture__common-name">
                                        <span className="capture__title">Nom commun</span>
                                        <span className="capture__title-infos">{single_captures[key].common_name}</span>
                                    </div>
                                    <div className="capture__bague">
                                        <span className="capture__title">Numéro de bague</span>
                                        <span className="capture__title-infos">{single_captures[key].bague}</span>
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