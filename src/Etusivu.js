import logo from './logo.svg';
import './App.css';
import Otsikko from './Otsikko';
import Alalaita from './Alalaita';
import Keskiosat from './Keskiosat';




import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  useParams
} from "react-router-dom";

function Etusivu() {

    return (
      <BrowserRouter>
  
        <div className="App">
          <Otsikko />
          <Keskiosat />
          <Alalaita />
  
        </div>
      </BrowserRouter>
    );
  }
  
  export default Etusivu;