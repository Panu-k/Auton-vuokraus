

import React, { Component } from 'react';
import Audi_A5 from './Auto_kuvat/Audi_A5.jpg';
import Audi_A6 from './Auto_kuvat/Audi_A6.jpg';
import Nissan_Qashqai from './Auto_kuvat/Nissan_Qashqai.png';
import Opel_Corsa from './Auto_kuvat/Opel_Corsa.jpg';
import Tesla_Model3 from './Auto_kuvat/Tesla_Model3.jpg';
import Ford_Fiesta from './Auto_kuvat/Ford_Fiesta.jpg';
import Toyota_Yaris from './Auto_kuvat/Toyota_Yaris.jpg';
import Ford_Focus from './Auto_kuvat/Ford_Focus.jpg';
import Nissan_Juke from './Auto_kuvat/Nissan_Juke.png';
import Opel_Astra from './Auto_kuvat/Opel_Astra.jpg';
import Toyota_Prius from './Auto_kuvat/Toyota_Prius.jpg';
import Toyota_Avensis from './Auto_kuvat/Toyota_Avensis.jpg';
import './tyylit.css';

class Autot extends Component {

    constructor(props) {
        super();

        this.onClickEvent = this.onClickEvent.bind(this);
        this.onChangeEventN = this.onChangeEventN.bind(this);
        this.onChangeEventO = this.onChangeEventO.bind(this);

        this.state = {
            brand: null,
            id: null,
            kuvaid: "",
            autoboxi: null,
            autovali: <h1>VALITSE AUTO</h1>
        }
    }

    onChangeEventN(event) {
        this.setState({ brand: event.target.value })
    }
    onChangeEventO(event) {
        this.setState({ id: event.target.value })
    }

    onClickEvent() {
        this.setState({ fetchedData: undefined })
        this.fetchData();
    }

    componentDidMount() {    //Lifecycle metodi, ajetaan kun dom-puu luotu
        this.fetchData();
    }

    async fetchData() {
        /* let response = await fetch("http://127.0.0.1:3002/car");
         let data = await response.json();
         console.log(data);
         this.setState({fetchedData:data}); */

        let response;
        if (this.state.brand != null && this.state.id != null) {
            response = await fetch('http://127.0.0.1:3002/car?brand=' + this.state.brand + '&' + 'id=' + this.state.id);
           // this.setState({ kuvaid: "Auton kuvan saa painamalla Picture nappia" });
        }
        else if (this.state.brand != null) {
            response = await fetch('http://127.0.0.1:3002/car?brand=' + this.state.brand);
           // this.setState({ kuvaid: "Auton kuvan saa painamalla Picture nappia" });
        }
        else if (this.state.id != null) {
            response = await fetch('http://127.0.0.1:3002/car/' + this.state.id);
           // this.setState({ kuvaid: "Auton kuvan saa painamalla Picture nappia" });
        }
        else {
            response = await fetch('http://127.0.0.1:3002/car');
           // this.setState({ kuvaid: "Auton kuvan saa painamalla Picture nappia" });
        }
        let data = await response.json();
        this.setState({ fetchedData: data })
    };

    poista(id) {
        fetch('http://127.0.0.1:3002/car/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => response.json())
        this.onClickEvent();
    }

    picture(id) {

        var pictures = "Ei toimi";

        if (id == 1) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[0].picture}/> });
            // this.setState({ kuvaid: <img src={Ford_Fiesta} /> });
            this.setState({
                kuvaid: <img src={Ford_Fiesta} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable" >

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[0].id}</td>
                                <td>{this.state.fetchedData[0].brand}</td>
                                <td>{this.state.fetchedData[0].model}</td>
                                <td>{this.state.fetchedData[0].year}</td>
                                <td>{this.state.fetchedData[0].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 2) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[1].picture}/> });
            // this.setState({ kuvaid: <img src={Toyota_Yaris} /> });
            this.setState({
                kuvaid: <img src={Toyota_Yaris} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[1].id}</td>
                                <td>{this.state.fetchedData[1].brand}</td>
                                <td>{this.state.fetchedData[1].model}</td>
                                <td>{this.state.fetchedData[1].year}</td>
                                <td>{this.state.fetchedData[1].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 3) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[2].picture}/> });
            // this.setState({ kuvaid: <img src={Nissan_Qashqai} /> });
            this.setState({
                kuvaid: <img src={Nissan_Qashqai} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[2].id}</td>
                                <td>{this.state.fetchedData[2].brand}</td>
                                <td>{this.state.fetchedData[2].model}</td>
                                <td>{this.state.fetchedData[2].year}</td>
                                <td>{this.state.fetchedData[2].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 4) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[3].picture}/> });
            // this.setState({ kuvaid: <img src={Opel_Corsa} /> });
            this.setState({
                kuvaid: <img src={Opel_Corsa} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[3].id}</td>
                                <td>{this.state.fetchedData[3].brand}</td>
                                <td>{this.state.fetchedData[3].model}</td>
                                <td>{this.state.fetchedData[3].year}</td>
                                <td>{this.state.fetchedData[3].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 5) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[4].picture}/> });
            // this.setState({ kuvaid: <img src={Tesla_Model3} /> });
            this.setState({
                kuvaid: <img src={Tesla_Model3} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[4].id}</td>
                                <td>{this.state.fetchedData[4].brand}</td>
                                <td>{this.state.fetchedData[4].model}</td>
                                <td>{this.state.fetchedData[4].year}</td>
                                <td>{this.state.fetchedData[4].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 6) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[5].picture}/> });
            // this.setState({ kuvaid: <img src={Audi_A5} /> });
            this.setState({
                kuvaid: <img src={Audi_A5} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[5].id}</td>
                                <td>{this.state.fetchedData[5].brand}</td>
                                <td>{this.state.fetchedData[5].model}</td>
                                <td>{this.state.fetchedData[5].year}</td>
                                <td>{this.state.fetchedData[5].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 7) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[6].picture}/> });
            // this.setState({ kuvaid: <img src={Audi_A6} /> });
            this.setState({
                kuvaid: <img src={Audi_A6} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[6].id}</td>
                                <td>{this.state.fetchedData[6].brand}</td>
                                <td>{this.state.fetchedData[6].model}</td>
                                <td>{this.state.fetchedData[6].year}</td>
                                <td>{this.state.fetchedData[6].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 8) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[7].picture}/> });
            // this.setState({ kuvaid: <img src={Ford_Focus} /> });
            this.setState({
                kuvaid: <img src={Ford_Focus} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[7].id}</td>
                                <td>{this.state.fetchedData[7].brand}</td>
                                <td>{this.state.fetchedData[7].model}</td>
                                <td>{this.state.fetchedData[7].year}</td>
                                <td>{this.state.fetchedData[7].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 9) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[8].picture}/> });
            // this.setState({ kuvaid: <img src={Nissan_Juke} /> });
            this.setState({
                kuvaid: <img src={Nissan_Juke} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[8].id}</td>
                                <td>{this.state.fetchedData[8].brand}</td>
                                <td>{this.state.fetchedData[8].model}</td>
                                <td>{this.state.fetchedData[8].year}</td>
                                <td>{this.state.fetchedData[8].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 10) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[9].picture}/> });
            // this.setState({ kuvaid: <img src={Opel_Astra} /> });
            this.setState({
                kuvaid: <img src={Opel_Astra} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[9].id}</td>
                                <td>{this.state.fetchedData[9].brand}</td>
                                <td>{this.state.fetchedData[9].model}</td>
                                <td>{this.state.fetchedData[9].year}</td>
                                <td>{this.state.fetchedData[9].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 11) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[10].picture}/> });
            // this.setState({ kuvaid: <img src={Toyota_Prius} /> });
            this.setState({
                kuvaid: <img src={Toyota_Prius} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[10].id}</td>
                                <td>{this.state.fetchedData[10].brand}</td>
                                <td>{this.state.fetchedData[10].model}</td>
                                <td>{this.state.fetchedData[10].year}</td>
                                <td>{this.state.fetchedData[10].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else if (id == 12) {
            // this.setState({ kuvaid: <img src={this.state.fetchedData[11].picture}/> });
            // this.setState({ kuvaid: <img src={Toyota_Avensis} /> });
            this.setState({
                kuvaid: <img src={Toyota_Avensis} />,
                autovali: <h1>VALITTU AUTO</h1>,
                autoboxi:

                    <table className="autotable">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Transmission</th>
                                {/* <th>Image</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{this.state.fetchedData[11].id}</td>
                                <td>{this.state.fetchedData[11].brand}</td>
                                <td>{this.state.fetchedData[11].model}</td>
                                <td>{this.state.fetchedData[11].year}</td>
                                <td>{this.state.fetchedData[11].transmission}</td>
                            </tr>


                        </tbody>
                    </table>

            })
        }
        else {
            this.setState({ kuvaid: <h2>Auton kuvaa ei valitettavasti löytynyt</h2> });
        }
        return pictures;
    }





    render() { // Tämä on kommentti
        /*  var käsittelijä = "ei näy mitään :(";
            if((this.state.fetchedData)){
            käsittelijä = this.state.fetchedData[0].brand
            }
            return (
                <div>
                    <p>toimii, eikö niin {käsittelijä}?</p> {/* Tämä on kommentti JSX:ssä 
                </div>
            ) */

        // let pictures = "Auton kuvaa ei löytynyt!!";

        /* if (this.state.fetchedData) {
             pictures = <h2>Tähän tulee auton kuva</h2>;
         } */

        if (this.state.fetchedData) {
            if (this.state.fetchedData < 1) {
                return <div>
                    <form>
                        <input onChange={this.onChangeEventN} type="text" placeholder="Brand" ></input>
                        <input onChange={this.onChangeEventO} type="text" placeholder="Id"></input>
                        <button onClick={this.onClickEvent}>Hakusessa</button>
                    </form>Annetuilla hakuehdoilla ei löytynyt dataa</div>
            } else {
                return (
                    <div>
                        <form>
                            {/* <input onChange={this.onChangeEventN} type="text" placeholder="Brand" ></input>
                            <input onChange={this.onChangeEventO} type="text" placeholder="Id"></input> */}
                            <button type="button" className="autohakubutton" onClick={this.onClickEvent}>Hakusettiä</button>
                        </form>
                        <table className="autotable" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>Transmission</th>
                                    <th>Valitse</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.fetchedData.map(car => {
                                    return (
                                        <tr key={car.id}>
                                            <td>{car.id}</td>
                                            <td>{car.brand}</td>
                                            <td>{car.model}</td>
                                            <td>{car.year}</td>
                                            <td>{car.transmission}</td>

                                            {/*  <td><button type="button" onClickCapture={() => this.poista(car.id)}>Poista</button></td> */}
                                            <td><button type="button"  onClickCapture={() => this.picture(car.id)}>Valitse auto</button></td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {this.state.autovali}
                        {this.state.autoboxi}
                        <div className="kuvadiv" >
                        {this.state.kuvaid}
                        </div>
                    </div>

                )
            }
        }

        else {
            return (
                <div>
                    <form>
                        <input onChange={this.onChangeEventN} type="text" placeholder="Brand" />
                        <input onChange={this.onChangeEventO} type="text" placeholder="Id" />
                        <button type="button" onClick={this.onClickEvent}>Hakuduu</button>
                    </form>
                Ladataan...</div>
            )
        }


    }
}


export default Autot;