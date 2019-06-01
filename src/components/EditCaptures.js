import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';
import Input from './Input';

class EditCaptures extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    state = {
        capture: {
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
            key: ''
        },
        captureId: null,
        errors:{},
    }

    logout() {
        firebase.auth().signOut();
    }

    componentDidMount(){
        // store the id of the capture passed on the params
        const captureId = this.props.match.params.captureId
        // Endpoint on the DB

        /********CORRIGER SESSION ID EDIT*******/
        const captureref = firebase.database().ref('single_captures')
        captureref.orderByChild("session_id").equalTo(captureId).on('value', result => {
            // variable to store the capture data
            let singlecapture = {};
            // Loop trough the data array
            result.forEach((thecapture) => {
                // select the data that we want from the endpoint
                const {session_id, common_name, bague, reprise, latin_name, alaire, sex, weight, fat, age, uid} = thecapture.val();
                // fill the object with the data
                singlecapture = {
                    key: thecapture.key,
                    session_id,
                    common_name,
                    bague,
                    reprise,
                    latin_name,
                    alaire,
                    sex,
                    weight,
                    fat,
                    age,
                    uid
                }
            })
            this.setState(prevState => ({
                captureId,
                capture: {
                    ...prevState.capture,
                    key: singlecapture.key,
                    session_id: singlecapture.session_id,
                    common_name: singlecapture.common_name,
                    bague: singlecapture.bague,
                    reprise: singlecapture.reprise,
                    latin_name: singlecapture.latin_name,
                    alaire: singlecapture.alaire,
                    sex: singlecapture.sex,
                    weight: singlecapture.weight,
                    fat: singlecapture.weight,
                    age: singlecapture.age,
                    uid: singlecapture.uid,
                }
            }))
        });
    }

    // Handle add of value
    handleAdd = ({currentTarget: input}) => {
        const errors = {...this.state.errors};


        const capture = {...this.state.capture};
        capture[input.name] = input.value;
        this.setState({capture, errors});
    }
    // Handle update of form
    handleUpdate = e => {
        e.preventDefault();
        // The data for the update
        const {key,session_id, common_name, bague, reprise, latin_name, alaire, sex, weight, fat, age} = this.state.capture;
        // The enrie that we want to update
        let entrie = 'single_captures/' + this.state.captureId
        // The path to the entrie
        const updateref = firebase.database().ref(entrie);

        //Action to update the entrie
        updateref.update({
            key,session_id, common_name, bague, reprise, latin_name, alaire, sex, weight, fat, age
        }).then(() => {
            this.setState({

            });
            setTimeout(() => {
                this.setState({

                })
                // programmatically redirects to mescaptures
                this.props.history.push('/myCaptures');
            }, 1000)
        })
    };

    renderEdit() {
        const {capture, errors} = this.state;
        const {} = this.state.capture;

        if (capture !== null) {
            return (
                <React.Fragment>
                    <form onSubmit={this.handleUpdate} action="" className="edit-form">
                        <div className="form__bloc">
                            <Input
                                value={capture.common_name}
                                onChange={this.handleAdd}
                                id="common_name"
                                name="common_name"
                                type="text"
                                label="Nom commun"/>
                        </div>
                        <div className="form__bloc">
                            <Input
                                value={capture.bague}
                                onChange={this.handleAdd}
                                id="bague"
                                name="bague"
                                type="number"
                                label="Type de bague"/>
                        </div>
                        <div className="form__bloc">
                            <Input
                                value={capture.age}
                                onChange={this.handleAdd}
                                id="age"
                                name="age"
                                type="number"
                                label="&Aacute;ge"/>
                        </div>
                        <div className="form__bloc">
                            <Input
                                value={capture.alaire}
                                onChange={this.handleAdd}
                                id="alaire"
                                name="alaire"
                                type="text"
                                label="Longueur d'alaire"/>
                        </div>
                        <div className="form__bloc">
                            <Input
                                value={capture.latin_name}
                                onChange={this.handleAdd}
                                id="latin_name"
                                name="latin_name"
                                type="text"
                                label="Nom latin"/>
                        </div>
                        <div className="form__bloc">
                            <Input
                                value={capture.sex}
                                onChange={this.handleAdd}
                                id="sex"
                                name="sex"
                                type="text"
                                label="Sexe"/>
                        </div>
                        <div className="form__bloc">
                            <Input
                                value={capture.weight}
                                onChange={this.handleAdd}
                                id="weight"
                                name="weight"
                                type="text"
                                label="Poids"/>
                        </div>
                        <button type="submit" className="button__birdcage">Enregistrer les modifications</button>
                        <Link to="/myCaptures">Annuler l'edition</Link>
                    </form>
                </React.Fragment>
            )} else {
            return <p>No data yet</p>
        }
    }


    render() {
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Éditer ma capture</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    {this.renderEdit()}
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}
export default EditCaptures;