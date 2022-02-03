import React, { useState, useEffect } from "react";
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isWithinInterval } from "date-fns";

export default function Autot() {
    const [data, setData] = useState([]);
    const [SelectedCar2, setSelectedCar2] = useState("");
    const [autot, setAuto] = useState([]);
    const [reactnoutopaiva, setReactnoutopaiva] = useState("");
    const [reactpalautuspaiva, setReactpalautuspaiva] = useState("");
    const [showText, setShowText] = useState(false);
    const [kalenteriteksti, setKalenteriteksi] = useState("Valitse noutopäivä");
    const [asiakasid, setAsiakasid] = useState("");
    const [sahkoposti, setSahkoposti] = useState("");
    const [loginStatus, setloginStatus] = useState(false);
    const [asiakasnimi, setAsiakasnimi] = useState("");
    const [autonvaratutpaivat, Setautonvaratutpaivat] = useState([]);
    const [autonhinta, setAutonhinta] = useState("");
    const [paivienmaara, setPaivienmaara] = useState("");

    const disabledRanges = [

    ];

    var temppaivasplit;
    var tempnoutopaiva = "";
    var temppalautuspaiva = "";
    var temppaiva = "";
    var tempkuukausi = "";
    var tempvuosi = "";
    var muokattupaivamaara = "";
    var datenoutopaivamaara;

    var temppalautussplit;
    var temppaivapalautus;
    var tempkuukausipalautus;
    var tempvuosipalautus;
    var muokattupaivamaarapalautus;
    var datepalautuspaivamaara;

    let index = 0;
    let noutopaiva = "";
    let palautuspaiva = "";
    let kalentericlick = 0;

    let noutopaivadate = "";
    let palautuspaivadate = "";
    let muutettunoutopaiva = "";
    let muutettupalautuspaiva = "";
    let muutanoutopaivasplit = "";
    let muutapalautuspaivasplit = "";

    var Difference_In_Days = "";
    var hintayhteensa = "";


    useEffect(() => {
        fetch("http://127.0.0.1:3002/Car")
            .then(response => response.json())
            .then(data => setData(data));
    }, []); // << super important array 

    useEffect(async () => { // Hakee klikatun auton tiedot
        if (SelectedCar2 === "") {
            /* fetch("http://127.0.0.1:3002/Car")
             .then(response => response.json())
             .then(data => setData(data)); */
        }
        else {
            console.log(SelectedCar2.id);
            const url = "http://127.0.0.1:3002/car/" + SelectedCar2.id
            console.log(url);
            const ress = await axios.get(url).then((response) => {
                console.log(response.data);
                setAuto(response.data);
                setKalenteriteksi("Valitse noutopäivä");
                setAutonhinta(response.data[0].price);
            })
        }

    }, [SelectedCar2])

    useEffect(() => { // Hakee klikatun auton varatut päivät "autonvaratutpaivat"-taulukkoon
        if (SelectedCar2 === "") {
        }
        else {
            let url = "http://127.0.0.1:3002/cardates/" + SelectedCar2;
            fetch(url)
                .then(response => response.json())
                .then(autonvaratutpaivat => Setautonvaratutpaivat(autonvaratutpaivat))
        }
    }, [SelectedCar2]);

    useEffect(async () => { // Hakee tiedon, onko käyttäjä kirjautunut sisään
        const ress = await axios.get("http://127.0.0.1:3002/login").then((response) => {
            //console.log(response.data);
            if (response.data.loggedIn) {
                //console.log(response.data.user);
                setAsiakasid(response.data.user[0].id)
                setAsiakasnimi(response.data.user[0].Name)
                setSahkoposti(response.data.user[0].Email)
                setloginStatus(true)
            }
            else {
                setloginStatus(false)
            }
        })
    }, [])

    function varatutpaivat() { //käy läpi autonvaratutpaivat-taulukon, ottaa päivän, kuukauden ja vuoden omiin muuttujiin
        // ja tekee niistä Date-päivämäärän, jota kalenteri käyttää. Lopuksi lisätään päivät
        // disabledRanges taulukkoon.
        if (SelectedCar2 === "") {

        }
        else {
            if (autonvaratutpaivat.length > 0) {
                autonvaratutpaivat.map((paiva) => {
                    const { From_DT_Time, Ret_DT_Time } = paiva
                    tempnoutopaiva = From_DT_Time;
                    temppaivasplit = tempnoutopaiva.split(".")
                    temppaiva = temppaivasplit[0];
                    tempkuukausi = temppaivasplit[1];
                    tempvuosi = temppaivasplit[2];

                    muokattupaivamaara = tempvuosi + "-" + tempkuukausi + "-" + temppaiva + " 00:00:00";

                    datenoutopaivamaara = new Date(muokattupaivamaara);

                    temppalautuspaiva = Ret_DT_Time;
                    temppalautussplit = temppalautuspaiva.split(".");
                    temppaivapalautus = temppalautussplit[0];
                    tempkuukausipalautus = temppalautussplit[1];
                    tempvuosipalautus = temppalautussplit[2];

                    muokattupaivamaarapalautus = tempvuosipalautus + "-" + tempkuukausipalautus + "-" + temppaivapalautus + " 00:00:00"

                    datepalautuspaivamaara = new Date(muokattupaivamaarapalautus);

                    disabledRanges.push([
                        datenoutopaivamaara, datepalautuspaivamaara
                    ]);
                }
                )
            }
        }
    }

    function onChange(nextvalue) { // Kun kalenterista valitaan päivät, laitetaan päivät muuttujiin
        // ja muutetaan muotoon dd.mm.yyyy
        index = 0;
        //console.log(nextvalue);

        nextvalue.map((mapItem) => {
            if (index < 1) {
                noutopaiva = mapItem;
            }
            if (index === 1) {
                palautuspaiva = mapItem;
            }
            index++;
        });

        var tempnoutopaiva = noutopaiva,
            month = '' + (tempnoutopaiva.getMonth() + 1),
            day = '' + tempnoutopaiva.getDate(),
            year = tempnoutopaiva.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        noutopaiva = [day, month, year].join('.');
        setReactnoutopaiva(noutopaiva);

        var temppalautuspaiva = palautuspaiva,
            month = '' + (temppalautuspaiva.getMonth() + 1),
            day = '' + temppalautuspaiva.getDate(),
            year = temppalautuspaiva.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        palautuspaiva = [day, month, year].join('.');
        setReactpalautuspaiva(palautuspaiva);

        laskevalittujenpaivienmmaara();
    }

    function laskevalittujenpaivienmmaara() {

        muutapalautuspaivasplit = palautuspaiva.split(".");
        muutanoutopaivasplit = noutopaiva.split(".");

        var muutanoutopaiva = muutanoutopaivasplit[0];
        var muutanoutokuukausi = muutanoutopaivasplit[1];
        var muutanoutovuosi = muutanoutopaivasplit[2];

        var muutapalautuspaiva = muutapalautuspaivasplit[0];
        var muutapalautuskuukausi = muutapalautuspaivasplit[1];
        var muutapalautusvuosi = muutapalautuspaivasplit[2];

        muutettunoutopaiva = muutanoutokuukausi + "/" + muutanoutopaiva + "/" + muutanoutovuosi;
        noutopaivadate = new Date(muutettunoutopaiva);

        muutettupalautuspaiva = muutapalautuskuukausi + "/" + muutapalautuspaiva + "/" + muutapalautusvuosi;
        palautuspaivadate = new Date(muutettupalautuspaiva);

        var Difference_In_Time = palautuspaivadate.getTime() - noutopaivadate.getTime();
        Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        Difference_In_Days = Difference_In_Days + 1;
        console.log(Difference_In_Days);
        setPaivienmaara(Difference_In_Days);

    }

    function tileDisabled({ date, view }) {
        // Disable tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of disabled dates
            return isWithinRanges(date, disabledRanges);
        }
    }

    function isWithinRange(date, range) {
        return isWithinInterval(date, { start: range[0], end: range[1] });                          //Poistetaan päivät käytöstä
    }

    function isWithinRanges(date, ranges) {
        return ranges.some(range => isWithinRange(date, range));
    }

    function muutateksti() {
        kalentericlick++;
        if (kalentericlick % 2 === 0) {
            setKalenteriteksi("Valitse noutopäivä")
        }
        else {
            setKalenteriteksi("Valitse palautuspäivä")
        }
    }

    async function vahvistavaraus() { //Tehdään varaus tietokantaan
        console.log(autonhinta);
        console.log(paivienmaara);
        hintayhteensa = (autonhinta * paivienmaara);

        await axios.post('http://127.0.0.1:3002/booking', {
            reactnoutopaiva: reactnoutopaiva, reactpalautuspaiva: reactpalautuspaiva, asiakasid: asiakasid, SelectedCar2: SelectedCar2, hintayhteensa: hintayhteensa
        }).then(() => {
            alert("Varaus vahvistettu ja lasku lähetetty sähköpostiin");
        })

        await axios.post('http://127.0.0.1:3002/email', {
            sahkoposti: sahkoposti, asiakasnimi: asiakasnimi
        }).then(() => {
            console.log("sähköposti lähetetty");
        })

    }


    const renderdata = () => {

        if (SelectedCar2 === "") {
            return data.map((auto) => {
                const { id, brand, model, year, transmission, aircondition, picture, price } = auto
                return (
                    <div className="leftsidecolumn" key={id}>
                        <div className="carwrapper">
                            <div className="carimage">
                                <img src={picture} alt="Autokuva"></img>
                            </div>
                            <div className="car1info">

                                <table>
                                    <tbody>
                                        <tr>

                                            <th>Merkki</th>
                                            <th>Malli</th>
                                            <th>Vuosimalli</th>
                                            <th>Vaihteisto</th>
                                            <th>Hinta</th>
                                        </tr>
                                        <tr>

                                            <th>{brand}</th>
                                            <th>{model}</th>
                                            <th>{year}</th>
                                            <th>{transmission}</th>
                                            <th>{price + "€/päivä"}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={() => setSelectedCar2({ id })}>Lue lisää</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            console.log(SelectedCar2);
            return autot.map((autoo) => {
                const { id, brand, model, year, transmission, aircondition, picture, price } = autoo
                return (
                    <div className="leftsidecolumn" key={id}>
                        <div className="carwrapper">
                            <button onClick={() => setSelectedCar2("")}>Palaa listaan</button>
                            <div className="carimage">
                                <img src={picture} alt="Autokuva"></img>
                               
                            </div>
                            <div className="car1info">

                                <table>
                                    <tbody>
                                        <tr>

                                            <th>Merkki</th>
                                            <th>Malli</th>
                                            <th>Vuosimalli</th>
                                            <th>Vaihteisto</th>
                                            <th>Hinta</th>
                                        </tr>
                                        <tr>

                                            <th>{brand}</th>
                                            <th>{model}</th>
                                            <th>{year}</th>
                                            <th>{transmission}</th>
                                            <th>{price + "€/päivä"}</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="item2">{kalenteriteksti}

                                    <div className="varaus">
                                        <Calendar className="noutopaiva"
                                            onChange={onChange}
                                            minDate={new Date}
                                            selectRange={true}
                                            onClickDay={muutateksti}
                                            tileDisabled={tileDisabled}
                                        />

                                    </div>
                                    <button onClick={() => setShowText(!showText)}>Varaa</button>
                                </div>


                                {/* <button onClick={() => setSelectedCar2({ id })}>Lue lisää</button> */}
                            </div>
                        </div>
                    </div>
                )
            })

        }

    }

    return (
        <div className="Keskivasen">
            <h1>Kaikki autot</h1>
            <div className="leftsidecontainer">
                {renderdata()}
                {varatutpaivat()}
                <div className="varauswrapper">
                    {showText && <div className="varauscontainer">
                        {loginStatus ?
                            <div>
                                <form>
                                    <label>Nimi: </label>
                                    <input type="text" name="asiakasid" value={asiakasnimi} required></input>
                                    <label> Sähköposti: </label>
                                    <input type="email" name="sahkoposti" value={sahkoposti} onChange={(e) => {
                                        setSahkoposti(e.target.value)
                                    }} required></input>
                                    <br></br>
                                    <label>Noutopäivä: </label>
                                    <label>{reactnoutopaiva}</label>
                                    <label>Palautuspäivä: </label>
                                    <label>{reactpalautuspaiva}</label>
                                    <br></br>
                                    <label> Yhteensä: {autonhinta * paivienmaara}€ </label>
                                </form>
                                <button onClick={vahvistavaraus}>Vahvista varaus</button>
                            </div>

                            :
                            <div>
                                <p>Kirjaudu sisään tehdäksesi varauksen</p>
                            </div>

                        }

                    </div>}

                </div>
            </div>
        </div>
    )


}