import React, {Component} from 'react';
import Header from './Header';


class RegisterForm extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Inscription</h3>
                </div>
            </React.Fragment>
        )
    }
}

export default RegisterForm;
