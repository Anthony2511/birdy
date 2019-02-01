import React, {Component} from 'react';
import Header from './Header';
import Input from './Input';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import Joi from 'joi-browser';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    login = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    schema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().required()
    }

    validate = () => {
        const result = Joi.validate(this.state, this.schema, {abortEarly: false})
        return result
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
                                placeholder="jeandupont@gmail.com"
                                />
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
                                className="form__input">
                            Se connecter
                        </button>
                        <Link to="/register" className="form__link">Pas encore inscrit ?</Link>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default LoginForm;
