import React, { Component } from 'react';

import {
    BrowserRouter,
    Switch,
    Route,
    NavLink,
    useParams
  } from "react-router-dom";
import App from './App';





class Käyttäjäformi extends Component {

    constructor(props) {
        super(props);
        
       // this.onChange = this.onChange.bind(this);

       /* this.state = {
            salasana: null
        } */
    }

   /* onChange() {
        this.setState({ salasana: this.state.salasana })
    } */

    

    



    render() {


        return (
            <div>
                <form action="" method="post" className="Login">
                    <label for="uname"><b>Käyttäjänimi</b></label>
                    <input type="text" placeholder="Käyttäjänimi" name="uname" required></input>
                    <label for="psw"><b>Salasana</b></label>
                    <input /* value={this.state.salasana} onChange={this.onChange} */ type="password" placeholder="Salasana" name="psw" required></input>
                    <button type="submit">Kirjaudu</button>
                </form>

               <button><NavLink to='/Rekisteroidy'>Rekisteröidy</NavLink></button>

              {/* <App.js salasana={this.state.salasana} /> */}
            </div>

        )

    }
}



export default Käyttäjäformi;