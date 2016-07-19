import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import serialize from 'form-serialize';

class Add extends React.Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    render() {

        return (
            <div className="container">
            <form ref="form" onSubmit={this.submit} className="form">
                <input type="text" className="input" name="name" placeholder="Lugar"/><br/>
                <input type="text" className="input" name="danger_level" placeholder="Nível de periculosidade"/><br/>
                <input type="text" className="input" name="coordinates" placeholder="Coordenadas"/><br/>
                <button type="submit">Enviar</button>
            </form>
            </div>
        );
    }

    submit(e){
        e.preventDefault();
        
        const { form } = this.refs
        var data = serialize(form)

        axios.post('/api/areas', data)
        .then(response => {
            console.log(response.data);
        }).catch(response => {
            console.log(response.data);
        })
        return false;
    }

}

module.exports = Add;
