

import React, { Component } from 'react';
import './tyylit.css';
import axios from 'axios';

class Asiakkaat extends Component {

    constructor(props) {
        super();

        this.onClickEvent = this.onClickEvent.bind(this);
        this.onChangeEventN = this.onChangeEventN.bind(this);
        this.onChangeEventO = this.onChangeEventO.bind(this);

        this.state = {
            name: null,
            id: null,
            isLoggedin: false,
            admin: false,
            loggedCustomerId: "",
            fetchedBooking: []
        }
    }

    onChangeEventN(event) {
        this.setState({ name: event.target.value })
    }
    onChangeEventO(event) {
        this.setState({ id: event.target.value })
    }

    onClickEvent() {
        this.setState({ fetchedData: undefined })
        this.fetchData();
    }

    async componentDidMount() {    //Lifecycle metodi, ajetaan kun dom-puu luotu
         await this.login()
         this.fetchData();    
    }

    async fetchData() {
        /* let response = await fetch("http://127.0.0.1:3002/car");
         let data = await response.json();
         console.log(data);
         this.setState({fetchedData:data}); */

        /*
       let response;
       if (this.state.name != null && this.state.id != null) {
           response = await fetch('http://127.0.0.1:3002/customer?name=' + this.state.name + '&' + 'id=' + this.state.id);

       }
       if (this.state.name != null) {
           response = await fetch('http://127.0.0.1:3002/customer?name=' + this.state.name);
       }
       else if (this.state.id != null) {
           response = await fetch('http://127.0.0.1:3002/customer/' + this.state.id);
       }
       else {
           response = await fetch('http://127.0.0.1:3002/customer');
       }
       let data = await response.json();
       this.setState({ fetchedData: data })
       */

      if(this.state.isLoggedin == true){
        let response;
        console.log(this.state.loggedCustomerId);
        response = await fetch('http://127.0.0.1:3002/customer/' + this.state.loggedCustomerId);
        let data = await response.json();
        console.log(data);
        console.log(this.state.loggedCustomerId);
        this.setState({ fetchedData: data });

        let respon;
        respon = await fetch('http://127.0.0.1:3002/booking?id=' + this.state.loggedCustomerId);
        data = await respon.json();
        console.log(data);
        this.setState({ fetchedBooking: data });
      }
        
    };

    async login() {
        let loginresponse;
        loginresponse = await axios.get("http://127.0.0.1:3002/login").then((response) => {
            console.log(response.data);
            if (response.data.loggedIn) {
                this.setState({ isLoggedin: true });
                this.setState({ loggedCustomerId: response.data.user[0].id })
                if (response.data.user[0].Name == "Admin") {
                    this.setState({ admin: true });
                    console.log("admini sisällä");
                }
            }
            else {
                this.setState({ isLoggedin: false });
            }
        })
    };

    poista(id) {
        fetch('http://127.0.0.1:3002/customer/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => response.json())
        this.onClickEvent();
    }

    render() { // Tämä on kommentti

        if (this.state.isLoggedin == true) {
            if (this.state.fetchedData) {
                if (this.state.fetchedData < 1) {
                    <h2>ei tullut dataa</h2>
                }
                else {
                    return (
                        <div>
                            <div>
                            <table className="asiakastable" >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Zipcode</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.fetchedData.map(customer => {
                                        return (
                                            <tr key={customer.id}>
                                                <td>{customer.id}</td>
                                                <td>{customer.name}</td>
                                                <td>{customer.city}</td>
                                                <td>{customer.zipcode}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.password}</td>
                                                {/*  <td><button type="button" onClickCapture={() => this.poista(customer.id)}>Poista</button></td>
                                        <td><a>Tähän muokkaus buttoni</a></td>*/  }
                                            </tr>



                                        );
                                    })}
                                </tbody>
                            </table>
                            </div>
                            <div>
                                <h3>Varaukset</h3>
                                <table className="asiakastable">
                                <thead>
                                    <tr>
                                        <th>Hinta</th>
                                        <th>Auton id</th>
                                        <th>Varauksen alkamis päivä</th>
                                        <th>Palautus päivä</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.fetchedBooking.map(booking => {
                                        return (
                                            <tr key={booking.id}>
                                                <td>{booking.price}</td>
                                                <td>{booking.autot_id}</td>
                                                <td>{booking.from_dt_time}</td>
                                                <td>{booking.ret_dt_time}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                </table>
                            </div>
                        </div>

                    )
                }

            }
            else {
                return (
                    <h2>tietoja ei haettu</h2>
                )
            }
        }
        else {
            return (
                <h2>Kirjaudu ensin sisään nähdäksesi omat tietosi</h2>
            )
        }
















        /*  var käsittelijä = "ei näy mitään :(";
            if((this.state.fetchedData)){
            käsittelijä = this.state.fetchedData[0].brand
            }
            return (
                <div>
                    <p>toimii, eikö niin {käsittelijä}?</p> {/* Tämä on kommentti JSX:ssä 
                </div>
            ) */
        /*
    if (this.state.isLoggedin == true) {
        if (this.state.admin == true) {
            if (this.state.fetchedData) {
                if (this.state.fetchedData < 1) {
                    return <div><form>
                        <input onChange={this.onChangeEventN} type="text" placeholder="Nimi" ></input>
                        <input onChange={this.onChangeEventO} type="text" placeholder="Id"></input>
                        <button onClick={this.onClickEvent}>Hakusessa</button>
                    </form>Annetuilla hakuehdoilla ei löytynyt dataa</div>
                } else {
                    return (
                        <div>
                            <form>
                                <input onChange={this.onChangeEventN} type="text" placeholder="Nimi" ></input>
                                <input onChange={this.onChangeEventO} type="text" placeholder="Id"></input>
                                <button type="button" onClick={this.onClickEvent}>Hakusettiä</button>
                            </form>
                            <table className="asiakastable" >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Zipcode</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.fetchedData.map(customer => {
                                        return (
                                            <tr key={customer.id}>
                                                <td>{customer.id}</td>
                                                <td>{customer.name}</td>
                                                <td>{customer.city}</td>
                                                <td>{customer.zipcode}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.password}</td>
                                                {/*  <td><button type="button" onClickCapture={() => this.poista(customer.id)}>Poista</button></td>
                                                <td><a>Tähän muokkaus buttoni</a></td>  }
                                            </tr>



                                        );
                                    })}
                                </tbody>
                            </table>


                        </div>


                    )
                }
            }
            else {
                return (
                    <div>
                        <form>
                            <input onChange={this.onChangeEventN} type="text" placeholder="Nimi" />
                            <input onChange={this.onChangeEventO} type="text" placeholder="Id" />
                            <button type="button" onClick={this.onClickEvent}>Hakuduu</button>
                        </form>
                    Ladataan...</div>
                )
            }
        }
        else {
            
            return (
                <h2>tänne käyttäjän omat tiedot</h2>
            )
        }



    }
    else {
        return <h2>Kirjaudu ensin sisään nähdäksesi tietosi</h2>
    }
    */
    }

}


export default Asiakkaat;