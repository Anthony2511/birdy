import React, {Component} from 'react';
import Header from './Header';
import Input from './Input';


class LoginForm extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div>
                    <form action="">
                        <Input
                            name="username"
                            type="text"
                            label="Adresse e-mail"
                            placeholder="jeandupont@gmail.com"/>
                    </form>
                </div>
                <p className="title"> Coucou</p>
            </React.Fragment>
        )
    }
}

export default LoginForm;
