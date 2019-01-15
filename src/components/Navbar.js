import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <ul>
            <li>
                <Link to="">Carte</Link>
            </li>
            <li>
                <Link to="">Captures</Link>
            </li>
            <li>
                <Link to="">Encyclopédie</Link>
            </li>
            <li>
                <Link to="">Utilisateurs</Link>
            </li>
        </ul>
    );
};

export default NavBar;
