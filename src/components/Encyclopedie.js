import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class Encyclopedie extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    state = {
        birds: {}
    }

    logout() {
        firebase.auth().signOut();
    }

    componentWillMount() {
        firebase.database().ref('/birds/').once('value').then((snapshot) => {
            let birds = [];
            snapshot.forEach((item) => {
                birds.push(item.val());
            });
            this.setState({birds});
        });
    }

    renderBirds() {
        const {birds} = this.state;
        if (birds !== null) {
            const vals = Object.values(birds);
            return (
                <React.Fragment>
                    <div className="birds__container">
                        {vals.map((birds, key) =>
                            <div key={key} className="birds__bloc">
                                <Link to={`/encyclopedie/${key}`}>
                                    <div className="birds__bloc-info">
                                        <div className="birds__infos">
                                            <div className="birds__flex">
                                                <div className="birds__champ">
                                                    <span className="birds__title">Nom commun</span>
                                                    <span className="birds__text">{birds.common_name}</span>
                                                </div>
                                                <div className="birds__champ">
                                                    <span className="birds__title">Famille</span>
                                                    <span className="birds__text">{birds.family}</span>
                                                </div>
                                                <div className="birds__champ">
                                                    <span className="birds__title">Habitat</span>
                                                    <span className="birds__text">{birds.habitat}</span>
                                                </div>
                                            </div>
                                            <img src={birds.picture} className="birds__img" alt=""/>
                                        </div>
                                        <audio src={birds.song} controls className="birds__audio"></audio>
                                        <div className="birds__container-infos">
                                            <div className="birds__latin">
                                                <span className="birds__title">Nom latin</span>
                                                <p className="birds__text">
                                                    {birds.latin_name}
                                                </p>
                                            </div>
                                            <div className="birds__description">
                                                <span className="birds__title">Description</span>
                                                <p className="birds__text">
                                                    {birds.description}
                                                </p>
                                            </div>
                                            <div className="birds__size">
                                                <div>
                                                    <span className="birds__title">Taille min</span>
                                                    <span className="birds__text">{birds.min_size}</span>
                                                </div>
                                                <div>
                                                    <span className="birds__title">Taille max</span>
                                                    <span className="birds__text">{birds.max_size}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Link>
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
                    <h3 aria-level="3" className="title">Liste des oiseaux</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    {this.renderBirds()}
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default Encyclopedie;