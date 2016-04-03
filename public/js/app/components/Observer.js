import React from 'react';
import { Link } from 'react-router';
import inside from 'point-in-polygon';
import when from 'when';
import axios from 'axios';
import _ from 'lodash';
import classnames from 'classnames';

class ObserverButton extends React.Component {
    render(){
        return (
            <div className="button">
                <span className="label">{this.props.label}</span>
            </div>
        )
    }
}

class Observer extends React.Component {

    constructor(){
        super();
        this.state = {
            loading: true,
            dangers: []
        }
    }

    componentDidMount(){
        var self = this;
        // self._check([-22.8565655, -43.4529398]);
        navigator.geolocation.watchPosition((e) => {
            self._check([e.coords.latitude, e.coords.longitude]);
        });
    }

    render() {
        let content = '';
        let safe = (this.state.dangers.length) ? false : true ;
        let label;

        if(this.state.loading){
            console.log('loading');
        }

        console.log(this.state.dangers);

        if(this.state.dangers.length){
            content = this.state.dangers.map((danger, i) => {
                return (<h1 key={i}>{danger.name}</h1>)
            });
        }

        var classes = classnames('observer-wrapper', {
            '-itsafe': (safe && !this.state.loading),
            '-itsdangerous': (!safe && !this.state.loading),
        });

        if(this.state.loading){
            label = 'Aguarde...';
        }else if (safe) {
            label = 'Tá tranquilo';
        }else{
            label = 'Perigo à frente!';
        }

        return (
            <div className={classes}>
                <ObserverButton label={label} />
            </div>
        );

    }

    _check(latlng){
        // latlng = [-22.8565655, -43.4529398];
        var self = this;
        console.log('cheking...');
        axios.get('/api/areas')
        .then(function(response){

            let dangers = response.data.reduce((dangers, area) => {
                if (inside(latlng, JSON.parse(area.coordinates)))
                    dangers.push(area);
                return dangers
            }, [])
            console.log('dangers', dangers);
            self.setState({dangers: dangers, loading: false});
        });
    }

}

module.exports = Observer;
