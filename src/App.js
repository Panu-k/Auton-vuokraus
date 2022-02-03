
import './App.css';
import Etusivu from './Etusivu';
import Autot from './Autot';
import Asiakkaat from './Asiakkaat';
import Yhteystiedot from './Yhteystiedot';
import Keskioikea from './Keskioikea';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  useParams
} from "react-router-dom";
import Rekisteroidy from './Rekisterointi';
import { useEffect, useState } from 'react';
import axios from 'axios';






function App() {

  axios.defaults.withCredentials = true;

  const tarkista = async () => {
    try {
      const resp = await axios.post("http://127.0.0.1:3002/login", {
        Name: customerName,
        Password: customerPassword,
      }).then((response) => {
        window.location.reload()
      })
    } catch (err) {
      // Handle Error Here
      console.error(err);
      alert("Käyttäjä nimi tai salasana väärin")
    }
  }

  const ulos = () => {
    axios.get("http://127.0.0.1:3002/logout").then(window.location.reload())
  }
 

  

  const [customerName, setcustomerName] = useState('')
  const [customerPassword, setcustomerPassword] = useState('')

  const [loginStatus, setloginStatus] = useState(false)
  const [yhteystieto, setYhteystieto] = useState(0)

  useEffect(async () => {
    const ress = await axios.get("http://127.0.0.1:3002/login").then((response) => {
      console.log(response.data);
      if(response.data.loggedIn){
        setloginStatus(true)
      }
      else {
        setloginStatus(false)
      }
    })
  }, [])

  return (

    <BrowserRouter>
      <div className="Nav">
        <ul className="Navigointi">
          <li><NavLink to='/'>Etusivu</NavLink></li>
          <li><NavLink to='/Autot'>Kaikki Autot</NavLink></li>
          {loginStatus ?
            <li><NavLink to='/Omat_tiedot'>Omat tiedot</NavLink></li>
          : <li></li>}
          <li><NavLink to='/Yhteystiedot'>Yhteystiedot</NavLink></li>
         {/*} <li><button onClick={() => setYhteystieto(1)}>Yhteystiedot</button></li> */}
        </ul>
        {/* <Keskioikea yhteystieto={yhteystieto} /> */}
        {loginStatus ?  
          <button onClick={ulos}>Kirjaudu ulos</button>
          :
        <div>
        <form className="Login">
          <label for="uname"><b>Käyttäjänimi</b></label>
          <input type="text" placeholder="Käyttäjänimi" onChange={(e) => {
            setcustomerName(e.target.value)
          }} required></input>
          <label for="psw"><b>Salasana</b></label>
          <input type="password" placeholder="Salasana" onChange={(e) => {
            setcustomerPassword(e.target.value)
          }} required></input>
        </form>
        <button onClick={tarkista}>Kirjaudu</button>
        <button ><NavLink to='/Rekisteroidy'>Rekisteröidy</NavLink></button>
        </div>
        
        }
      </div>

      <Switch>
        <Route exact path='/'>
          <Etusivu />
        </Route>
        <Route path='/Autot' component={Autot} />
        <Route path='/Omat_tiedot' component={Asiakkaat} />
        <Route path='/Yhteystiedot' component={Yhteystiedot} />
        <Route path='/Rekisteroidy' component={Rekisteroidy} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
