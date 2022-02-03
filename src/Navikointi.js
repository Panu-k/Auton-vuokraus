import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    NavLink,
    useParams
  } from "react-router-dom";
import Rekry from './Rekry';

import './tyylit.css';


class Navikointi extends Component {



    render() {
        return (
            <div className="Nav">
                <ul className="Navigointi">
                    <li className="Navi"><a href="">Autot</a></li>
                    <li className="Navi"><a href="">Palvelut</a></li>
                    <li className="Navi"><a href="">Tarjoukset</a></li>
                    <li className="Navi"><a href="">Yrityksille</a></li>
                    <li className="Navi"><a href="">Yheystiedot</a></li>
                </ul>
                <form action="" method="post" className="Login">
                    <label for="uname"><b>Käyttäjänimi</b></label>
                    <input type="text" placeholder="Käyttäjänimi" name="uname" required></input>
                    <label for="psw"><b>Salasana</b></label>
                    <input type="password" placeholder="Salasana" name="psw" required></input>
                    <button type="submit">Kirjaudu</button>
                </form>
                <button><NavLink to={`/Rekry`}></NavLink>Rekisteröidy</button>
            </div>
        )
    }
}

export default Navikointi;