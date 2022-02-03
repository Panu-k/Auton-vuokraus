/*

import React, { Component } from 'react';
import './tyylit.css';

class Keskivasen extends Component {

    constructor(props) {
        super(props);
        this.showmore = this.showmore.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            allcars: [],
            carid: 0

        };
    }

    componentDidMount() {

        let url = "http://127.0.0.1:3002/Newcars";
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({ allcars: data })
                console.log(this.state.allcars);

            })

    }

    showmore(param) {
        var id = param.id;
        this.setState({
            carid: id
        })
        setSelectedCar(carid);
        
    }

    renderdata() {
        return this.state.allcars.map((Car) => {
            const { id, brand, model, year, transmission, aircondition, color } = Car
            return (
                <div className="leftsidecolumn">
                        <div className="carwrapper">
                            <div className="carimage">
                                <img src="logo512.png"></img>
                            </div>
                            <div className="car1info">
                                <h3>{brand + " " + model}</h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Vuosimalli</th>
                                            <th>Vaihteisto</th>
                                        </tr>
                                        <tr>
                                            <th>{year}</th>
                                            <th>{transmission}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={() => this.showmore({ id })}>Lue lisää</button>
                            </div>
                        </div>
                    </div>
                    
            )
        })

    }


    render() {

        return (
            <div className="Keskivasen" >

                <h5>Uusimmat autot</h5>
                <div className="leftsidecontainer">
                {this.renderdata()}
                </div>
            </div>
        )


    }
}

export default function Keskivasen({setSelectedCar})

*/

import React, { useState, useEffect } from "react";

export default function Keskivasen({setSelectedCar}) {
    const [data, setData] = useState([]);

    const showmore=(param) => {
        var id = param.id;
        setSelectedCar(id);
        console.log(id);
    }

    const renderdata = () => {
        return data.map((auto) => {
            const { id, brand, model, year, transmission, aircondition, picture, price } = auto
            return (
                <div className="leftsidecolumn" key={id}>
                        <div className="carwrapper">
                            <div className="carimage">
                                <img src={picture} alt="Autokuva"></img>
                            </div>
                            <div className="car1info">
                                <h3>{brand + " " + model}</h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Vuosimalli</th>
                                            <th>Vaihteisto</th>
                                            <th>Hinta</th>
                                        </tr>
                                        <tr>
                                            <th>{year}</th>
                                            <th>{transmission}</th>
                                            <th>{price + "€/päivä"}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={() => showmore({ id })}>Lue lisää</button>
                            </div>
                        </div>
                    </div>
            )
        })
    }

    useEffect(() => {
        fetch("http://127.0.0.1:3002/Newcars")
          .then(response => response.json())
          .then(data => setData(data));
    }, []); // << super important array
     

    return(
        <div className="Keskivasen">
            <h5>Uusimmat autot</h5>
            <div className="leftsidecontainer">
                {renderdata()}
            </div>
        </div>
    )


}