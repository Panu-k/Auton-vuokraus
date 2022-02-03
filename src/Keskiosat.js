//import React, {Component} from 'react';
import React, {useState} from 'react';
import './tyylit.css';
import Keskivasen from './Keskivasen';
import Keskioikea from './Keskioikea';
import asiakasreact from './asiakasreact';


function Keskiosat() {
    
    const [selectedCar, setSelectedCar] = useState('');
        return (
            <div className="Keskiosat" >
                <Keskivasen setSelectedCar = {setSelectedCar} />

                <Keskioikea selectedCar = {selectedCar} /> 
             
               

            </div>
        );
    
}

export default Keskiosat;