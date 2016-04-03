import React from 'react';
import { Link } from 'react-router';
import inside from 'point-in-polygon';

var data = [
    {
        id: '123',
        name: 'Morro do Chapadão',
        coordinates: [[[ -43.365655, -22.829945 ], [ -43.360205, -22.826108 ], [ -43.363853, -22.824605 ], [ -43.367994, -22.821985 ], [ -43.370075, -22.819602 ], [ -43.370204, -22.82243 ], [ -43.375225, -22.826158  ], [ -43.37338, -22.830796 ], [ -43.371019, -22.830113 ], [ -43.369689, -22.830222 ], [ -43.365655, -22.829945 ]]]
    },
    {
        id: '123',
        name: 'Sulacap',
        coordinates: [[[ -43.383040, -22.887498 ], [ -43.393040, -22.896498 ],[ -43.403040, -22.883498 ]]]
    },
    {
        id: '123',
        name: 'Taquara',
        coordinates: [[[ -43.388206, -23.010105 ], [ -43.378206, -22.990105 ], [ -43.368206, -22.990105 ], [ -43.358206, -23.000105 ]]]
    },
    {
        id: '123',
        name: 'Barra da Tijuca',
        coordinates: [[[ -43.388206, -23.010105 ], [ -43.378206, -22.990105 ], [ -43.368206, -22.990105 ], [ -43.358206, -23.000105 ]]]
    },
    {
        id: '123',
        name: 'Casa',
        coordinates: [[[ -43.451591, -22.855726 ],[ -43.452591, -22.846726 ],[ -43.453591, -22.857726 ],[ -43.452591, -22.856726 ]]]
    },
]

data = data.map((item) => { item.coordinates });

class Observer extends React.Component {

    constructor(){
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount(){
        var self = this;
        navigator.geolocation.watchPosition((e) => {
            self._check([e.coords.latitude, e.coords.longitude]);
        });
    }

    render() {
        console.log('safe', this.state.safe);
        let content;

        if(typeof this.state.safe == 'undefined'){
            console.log('safe');
        }

        return (
            <div className="observer-wrapper">
            {content}
            </div>
        );

    }

    _check(latlng){
        // latlng = [-22.8565655, -43.4529398];
        console.log(latlng);
        console.log(inside(latlng, [[ -22.855726, -43.451591 ],[ -22.846726, -43.452591 ],[ -22.857726, -43.453591 ],[ -22.856726, -43.452591 ]]));
        // var results = leafletPip.pointInLayer([latlng.lng, latlng.lat], featureGroup);
        // this.setState({dangers: results});
    }

}

module.exports = Observer;
