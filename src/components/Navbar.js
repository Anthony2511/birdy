import React from "react";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <ul className="nav__list">
            <li className="nav__item">
                <NavLink to="/map" className="nav__link nav__link--carte" activeClassName="active">Carte</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/addCapture" className="nav__link nav__link--capture" activeClassName="active">Capture</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/encyclopedie" className="nav__link nav__link--encyclopedie" activeClassName="active">Encyclopédie</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/users" className="nav__link nav__link--users" activeClassName="active">Utilisateurs</NavLink>
            </li>
        </ul>
    );
};

export default NavBar;
