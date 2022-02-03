//import React, { Component } from 'react';
import React, { useEffect, useState } from 'react';

import './tyylit.css';

function Alalaita() {

    const [adminpass, setAdminpass] = useState('');

    
 
    
    if ({adminpass} == 666) {
        return (
            <div className="Alalaita" >


                <div className="flexgrid">
                
                    <div className="footercolumn">
                        
                        <table>
                           
                            <tbody>
                                <tr>
                                    <th>ADMIN</th> 
                                  {/* <th><button type="button" onClick={adminpasschange}>ADMINININI</button> </th> */}
                                    <th><input type="text" placeholder="Salasana" onChange={(e) => setAdminpass(e.target.value)} ></input></th>
                                     
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
                                    <td><input type="text" value={adminpass}></input></td>
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
                             {/*  <th><button type="button" onClick={adminpasschange}>ADMINININI</button> </th> */}
                                <th><input type="text" placeholder="Salasana" onChange={(e) => setAdminpass(e.target.value)}></input></th>
                                 
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
                            <tr>
                                <td><input type="text" value={adminpass}></input></td>
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

export default Alalaita;