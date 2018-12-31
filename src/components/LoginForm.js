import React, {Component} from 'react';
import Header from './Header';
import Input from './Input';


class LoginForm extends Component {

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
                                name="username"
                                type="text"
                                label="Adresse e-mail"
                                placeholder="jeandupont@gmail.com"/>
                        </div>
                        <div className="form__bloc">
                            <i className="form__input-password"></i>
                            <Input
                                name="password"
                                type="text"
                                label="Mot de passe"
                                placeholder="Entrez votre mot de passe"/>
                        </div>
                        <Input
                            type="submit"
                            value="Se connecter"/>
                        <a href="#" className="form__link">Pas encore inscrit ?</a>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginForm;
