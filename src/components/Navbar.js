import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <ul className="nav__list">
            <li className="nav__item">
                <Link to="" className="nav__link nav__link--carte">Carte</Link>
            </li>
            <li className="nav__item">
                <Link to="" className="nav__link nav__link--capture">Capture</Link>
            </li>
            <li className="nav__item">
                <Link to="" className="nav__link nav__link--encyclopedie">Encyclopédie</Link>
            </li>
            <li className="nav__item">
                <Link to="" className="nav__link nav__link--users">Utilisateurs</Link>
            </li>
        </ul>
    );
};

export default NavBar;
