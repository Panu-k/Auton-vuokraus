import React, { Component } from 'react';
//import React, { useEffect, useState } from 'react';

import './tyylit.css';

class Alalaita extends Component {

    constructor(props) {
        super();

        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.state = {
            adminpass: "Salasana"
        }
    }

    onChangeEvent(event) {
        this.setState({ adminpass: event.target.value })
    }


    render() {

        if (this.state.adminpass == "admini") {
            return (
                <div className="Alalaita" >


                    <div className="flexgrid">

                        <div className="footercolumn">

                            <table>

                                <tbody>
                                    <tr>
                                        <th>ADMIN</th>
                                        {/* <th><button type="button" onClick={adminpasschange}>ADMINININI</button> </th> 
                                        <th><input type="text" placeholder="Salasana" onChange={(e) => setAdminpass(e.target.value)} ></input></th> */}
                                        <input onChange={this.onChangeEvent} type="text" placeholder="Salasana" ></input>

                                    </tr>

                                    <tr>

                                        <td><a href="http://127.0.0.1:5500/Yhteystesti/autonode.html" target="_blank">Selaa kaikkia autoja</a></td>
                                        <td><a href="http://127.0.0.1:5500/Yhteystesti/asiakasnode.html" target="_blank">Selaa kaikkia asiakkaita</a></td>


                                    </tr>

                                </tbody>

                            </table>
                        </div>
                        <div className="footercolumn">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Tietoa meistä</th>
                                    </tr>
                                    <tr>
                                        <td>Yleistä yrityksestä</td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.adminpass}></input></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="footercolumn">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Asiakastuki</th>
                                    </tr>
                                    <tr>
                                        <td>Usein kysyttyä</td>
                                    </tr>
                                    <tr>
                                        <td>Yhteystiedot</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="footercolumn">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Seuraa meitä</th>
                                    </tr>
                                    <tr>
                                        <td>Instagram</td>
                                    </tr>
                                    <tr>
                                        <td>Facebook</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (

                <div className="Alalaita" >


                    <div className="flexgrid">

                        <div className="footercolumn">

                            <table>

                                <tbody>
                                    <tr>
                                        <th>ADMIN</th>
                                        {/*  <th><button type="button" onClick={adminpasschange}>ADMINININI</button> </th> 
                                        <th><input type="text" placeholder="Salasana" onChange={(e) => setAdminpass(e.target.value)}></input></th> */}
                                        <input onChange={this.onChangeEvent} type="text" placeholder="Salasana" ></input>

                                    </tr>

                                    <tr>

                                        <td hidden><a href="http://127.0.0.1:5500/Yhteystesti/autonode.html" target="_blank">Selaa kaikkia autoja</a></td>
                                        <td hidden><a href="http://127.0.0.1:5500/Yhteystesti/asiakasnode.html" target="_blank">Selaa kaikkia asiakkaita</a></td>


                                    </tr>

                                </tbody>

                            </table>
                        </div>
                        <div className="footercolumn">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Tietoa meistä</th>
                                    </tr>
                                    <tr>
                                        <td>Yleistä yrityksestä</td>
                                    </tr>
                                    

                                </tbody>
                            </table>
                        </div>
                        <div className="footercolumn">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Asiakastuki</th>
                                    </tr>
                                    <tr>
                                        <td>Usein kysyttyä</td>
                                    </tr>
                                    <tr>
                                        <td>Yhteystiedot</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="footercolumn">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Seuraa meitä</th>
                                    </tr>
                                    <tr>
                                        <td>Instagram</td>
                                    </tr>
                                    <tr>
                                        <td>Facebook</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }


    }
}

export default Alalaita;