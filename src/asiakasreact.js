import React, { Component } from 'react';

class asiakasreact extends Component {
    constructor(props) {
        super();

        this.onClickEvent = this.onClickEvent.bind(this);
        this.onChangeEventN = this.onChangeEventN.bind(this);
        this.onChangeEventO = this.onChangeEventO.bind(this);

        this.state = {
            nimi: null,
            osoite: null
        }
    }

    onChangeEventN(event) {
        this.setState({ nimi: event.target.value })
    }
    onChangeEventO(event) {
        this.setState({ osoite: event.target.value })
    }

    onClickEvent() {
        this.setState({ persons: undefined })
        this.getData();
    }


    async getData() {
        let response;
        if (this.state.nimi != null && this.state.osoite != null) {
            response = await fetch('http://localhost:3004/henkilot?nimi_like=' + this.state.nimi + '&osoite_like=' + this.state.osoite);
        }
        else if (this.state.nimi != null) {
            response = await fetch('http://localhost:3004/henkilot?nimi_like=' + this.state.nimi);
        }
        else if (this.state.osoite != null) {
            response = await fetch('http://localhost:3004/henkilot?osoite_like=' + this.state.osoite);
        }
        else {
            response = await fetch('http://127.0.0.1:3002/Customer');
        }
        let data = await response.json();
        this.setState({ persons: data })
    };

    poista(id) {
        fetch('http://localhost:3004/henkilot/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => response.json())
        this.onClickEvent();
    }

    render() {
       /* if (this.state.persons) {
            if (this.state.persons < 1) {
                return <div><form>
                    <input onChange={this.onChangeEventN} type="text" placeholder="Nimi..." ></input>
                    <input onChange={this.onChangeEventO} type="text" placeholder="Osoite..."></input>
                    <button onClick={this.onClickEvent}>Hae</button>
                </form>Annetuilla hakuehdoilla ei löytynyt dataa</div>
            } else { */
                return (
                    <div>
                        <form>
                            <input onChange={this.onChangeEventN} type="text" placeholder="Nimi..." ></input>
                            <input onChange={this.onChangeEventO} type="text" placeholder="Osoite..."></input>
                            <button type="button" onClick={this.onClickEvent}>Hae</button>
                        </form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nimi</th>
                                    <th>Osoite</th>
                                    <th>Postinumero</th>
                                    <th>Postitoimipaikka</th>
                                    <th>Puhelinnro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.persons.map(person => {
                                    return (
                                        <tr key={person.id}>
                                            <td>{person.nimi}</td>
                                            <td>{person.osoite}</td>
                                            <td>{person.postinumero}</td>
                                            <td>{person.postitoimipaikka}</td>
                                            <td>{person.puhelinnro}</td>
                                            <td><button type="button" onClickCapture={() => this.poista(person.id)}>Poista</button></td>
                                            <td><a href={'/PersonData/' + person.id}>Yhteystiedot</a></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )
            }
       /* } else {
            return (
                <div>
                    <form>
                        <input onChange={this.onChangeEventN} type="text" placeholder="Nimi..." />
                        <input onChange={this.onChangeEventO} type="text" placeholder="Osoite..." />
                        <button type="button" onClick={this.onClickEvent}>Hae</button>
                    </form>
              Ladataan...</div>
            )
        } 
    } */
}

export default asiakasreact;