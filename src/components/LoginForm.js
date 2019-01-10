import React, {Component} from 'react';
import Header from './Header';
import Input from './Input';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => {
            console.log(u)
        })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Connexion</h3>
                    <form action="" className="form">
                        <div className="form__bloc">
                            <i className="form__input-username"></i>
                            <Input
                                value={this.state.email}
                                onChange={this.handleChange}
                                id="inputEmail"
                                name="email"
                                type="email"
                                label="Adresse e-mail"
                                placeholder="jeandupont@gmail.com"/>
                        </div>
                        <div className="form__bloc">
                            <i className="form__input-password"></i>
                            <Input
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password"
                                id="inputPassword"
                                type="password"
                                label="Mot de passe"
                                placeholder="Entrez votre mot de passe"/>
                        </div>
                        <button type="submit"
                                onClick={this.login}
                                className="">
                            Se connecter
                        </button>
                        <button onClick={this.signup}
                                className="form__link">
                            Pas encore inscrit ?
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginForm;
