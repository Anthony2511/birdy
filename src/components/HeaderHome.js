import React, {Component} from "react";

export class HeaderHome extends Component {
    constructor() {
        super();
        this.state = ({
            user: '',
        });
    }

    render() {
        return (
            <header className="header">
                <h2 aria-level="2" className="header__title">Birdy</h2>
            </header>
        )

    }
}

export default HeaderHome;