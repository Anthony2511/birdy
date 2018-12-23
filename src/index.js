import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class App extends Component {

    render() {
        return (
            <p> Coucou</p>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
