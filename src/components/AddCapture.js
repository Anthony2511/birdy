import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import Input from './Input';
import {Link} from 'react-router-dom';
import Toolip from './Toolip';

class AddCapture extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    state = {
        newSession: {
            started: false,
            method: '',
            place: {
                lat: '',
                lng: ''
            },
            uid: firebase.auth().currentUser.uid
        },
        newBird: {
            session_id: '',
            common_name: '',
            bague: '',
            reprise: false,
            latin_name: '',
            alaire: '',
            sex: '',
            weight: '',
            fat: '',
            age: '',
        },
        capture_sessions: {},
        themessage: {
            show: false,
            text: ''
        }
    };

    logout() {
        firebase.auth().signOut();
    }

    componentDidMount() {
        const bird = firebase.database().ref('single_captures');
        bird.on('value', snap => {
            this.setState({
                single_captures: snap.val()
            })
        })
        this.storePosition()
    }

    ifIsSite = () => {
        const capture_sessions = firebase.database().ref('capture_sessions');

        capture_sessions.on('value', snap => {
            this.setState({
                capture: snap.val()
            })
        })
    }
    storePosition = () => {
        const newSession = {...this.state.newSession};

        navigator.geolocation.getCurrentPosition(position => {
            newSession.place.lat = this.roundToTwo(position.coords.latitude)
            newSession.place.lng = this.roundToTwo(position.coords.longitude)
        })

        this.setState({newSession})
    }

    roundToTwo = (num) => {
        return +(Math.round(num + "e+2") + "e-2");
    }

    handleSubmit = e => {
        e.preventDefault();
        const {common_name, bague, reprise, latin_name, alaire, sex, weight, fat, age, session_id} = this.state.newBird;
        const bird = firebase.database().ref('single_captures');
        bird.push({
            common_name, bague, reprise, latin_name, alaire, sex, weight, fat, age, session_id
        }).then(() => {
            const newBird = {...this.state.newBird};
            newBird.common_name = ''
            newBird.bague = ''
            newBird.reprise = ''
            newBird.latin_name = ''
            newBird.alaire = ''
            newBird.sex = 'M'
            newBird.weight = ''
            newBird.fat = ''
            newBird.age = ''
            this.setState({newBird}, () => {
                setTimeout(() => {
                    this.setState({
                        themessage:{
                            show: true,
                            text: 'La capture a bien été ajoutée'
                        }
                    })
                }, 1000)
            })

        })
    };


    handleAdd = ({currentTarget: input}) => {
        const newBird = {...this.state.newBird};
        newBird[input.name] = input.value;
        this.setState({newBird});
    }

    handleStartCapture = e => {
        e.preventDefault();
        const {place, method, uid} = this.state.newSession;
        console.log(place)
        const captureTime = Date.now();
        const session = firebase.database().ref('capture_sessions/' + captureTime);
        session.set({
            place, method, uid
        })
        session.once('value').then(snapshot => {
            const newBird = {...this.state.newBird};
            const newSession = {...this.state.newSession};
            newBird.session_id = snapshot.key;
            newSession.started = true;
            this.setState({newSession});
            this.setState({newBird});
        })
    };

    handleAddCapture = ({currentTarget: input}) => {
        const newSession = {...this.state.newSession};
        newSession[input.name] = input.value;
        this.setState({newSession});
    }

    newSessionCapture() {
        const {started, method} = this.state.newSession;
        const {newBird, themessage} = this.state;
        if (started !== true) {
            return (
                <div>
                    <form action="" onSubmit={this.handleStartCapture}>
                        <div className="form__bloc">
                            <Input
                                value={method}
                                onChange={this.handleAddCapture}
                                id="method"
                                name="method"
                                type="text"
                                label="Méthode de capture"
                                placeholder="Nid"/>
                        </div>
                        <button type="submit"
                                className="button__form">
                            Commencer la session
                        </button>
                    </form>
                </div>
            )
        } else {
            return (
                <form action="" onSubmit={this.handleSubmit}>
                    <div className="form__bloc">
                        <Input
                            value={newBird.common_name}
                            onChange={this.handleAdd}
                            id="common_name"
                            name="common_name"
                            type="text"
                            label="Nom commun"
                            placeholder="ex: Arthur"/>
                    </div>
                    <div className="form__bloc">
                        <Input
                            value={newBird.bague}
                            onChange={this.handleAdd}
                            id="bague"
                            name="bague"
                            type="number"
                            label="Type de bague"
                            placeholder="ex: 125 276 587"/>
                    </div>
                    {/*<div className="form__bloc">
                        <Input
                            value={newBird.reprise}
                            onChange={this.handleAdd}
                            id="inputReprise"
                            name="reprise"
                            type="boolean"
                            label="Est-ce une reprise ?"/>
                    </div>*/}
                    <div className="form__bloc">
                        <Input
                            value={newBird.age}
                            onChange={this.handleAdd}
                            id="age"
                            name="age"
                            type="number"
                            label="&Aacute;ge"
                            placeholder="ex: 7"/>
                    </div>
                    <div className="form__bloc">
                        <Input
                            value={newBird.alaire}
                            onChange={this.handleAdd}
                            id="alaire"
                            name="alaire"
                            type="text"
                            label="Longueur d'alaire"
                            placeholder="ex: 15cm"/>
                    </div>
                    <div className="form__bloc">
                        <Input
                            value={newBird.latin_name}
                            onChange={this.handleAdd}
                            id="latin_name"
                            name="latin_name"
                            type="text"
                            label="Nom latin"
                            placeholder="ex: Lorem ipsum"/>
                    </div>
                    <div className="form__bloc">
                        <Input
                            value={newBird.sex}
                            onChange={this.handleAdd}
                            id="sex"
                            name="sex"
                            type="text"
                            label="Sexe"
                            placeholder="M ou F"/>
                    </div>
                    <div className="form__bloc">
                        <Input
                            value={newBird.weight}
                            onChange={this.handleAdd}
                            id="weight"
                            name="weight"
                            type="text"
                            label="Poids"
                            placeholder="ex: 6.5kg"/>
                    </div>
                    <button type="submit"
                            className="button__form">
                        Ajouter la capture
                    </button>
                    {themessage.show && <Toolip message={themessage.text} />}
                </form>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Ajouter une capture</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <div className="form__container">
                        {this.newSessionCapture()}
                    </div>
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default AddCapture;