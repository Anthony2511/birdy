import React, {Component} from 'react';
import Header from './Header';
import Input from './Input';
import firebase from 'firebase';
import {Link} from 'react-router-dom';


class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    register = e => {
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
                    <h3 aria-level="3" className="title">Inscription</h3>
                    <form action="" className="form">
                        <div className="form__bloc">
                            <i className="form__input-username"></i>
                            <Input
                                value={this.state.first_name}
                                onChange={this.handleChange}
                                id="inputFirstName"
                                name="first_name"
                                type="text"
                                label="Prénom"
                                placeholder="Jean"/>
                        </div>
                        <div className="form__bloc">
                            <i className="form__input-username"></i>
                            <Input
                                value={this.state.last_name}
                                onChange={this.handleChange}
                                id="inputLastName"
                                name="last_name"
                                type="text"
                                label="Nom"
                                placeholder="Dupont"/>
                        </div>
                        <div className="form__bloc">
                            <i className="form__input-envelope"></i>
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
                                onClick={this.register}
                                className="form__input">
                            S'inscrire
                        </button>
                        <Link to="/" className="form__link">Déjà un compte ?</Link>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default RegisterForm;
