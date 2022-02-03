import React, { useState } from 'react';
import './tyylit.css';
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

// asenna Axios
// npm i axios



function Rekry() {

    let history = useHistory();

    const [customerName, setcustomerName] = useState('')
    const [customerPassword, setcustomerPassword] = useState('')
    const [customerCity, setcustomerCity] = useState('')
    const [customerZipcode, setcustomerZipcode] = useState('')
    const [customerEmail, setcustomerEmail] = useState('')

    const submitForm = () => {
        Axios.post('http://127.0.0.1:3002/Customer', {
            customerName: customerName, customerPassword: customerPassword, customerCity: customerCity,
            customerZipcode: customerZipcode, customerEmail: customerEmail
        }).then(() => {
            history.push('/')
        })
    }


    return (
        <div className="Rekry" >
            <form action="" className="sing_up">
                <label for="customerName"><b>Käyttäjänimi</b></label>
                <input type="text" placeholder="Käyttäjänimi" name="customerName" onChange={(e) => {
                    setcustomerName(e.target.value)
                }} required />

                <label for="psw"><b>Salasana</b></label>
                <input type="password" placeholder="Salasana" name="customerPassword" onChange={(e) => {
                    setcustomerPassword(e.target.value)
                }} required />

                <label for="city"><b>Kaupunki</b></label>
                <input type="text" placeholder="Kaupunki" name="customerCity" onChange={(e) => {
                    setcustomerCity(e.target.value)
                }} required />

                <label for="zipcode"><b>Postinumero</b></label>
                <input type="text" placeholder="Postinumero" name="customerZipcode" onChange={(e) => {
                    setcustomerZipcode(e.target.value)
                }} required />

                <label for="email"><b>Sähköposti</b></label>
                <input type="text" placeholder="Sähköposti" name="customerEmail" onChange={(e) => {
                    setcustomerEmail(e.target.value)
                }} required />
            </form>
            <button onClick={submitForm} >Luo tili</button>
        </div>
    )
}

export default Rekry;
