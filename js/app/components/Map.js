import React from 'react';
// import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Route, RouteHandler, Link } from 'react-router';
import mapbox from 'mapbox.js';
import leafletDraw from 'leaflet-draw';
import leafletPip from 'leaflet-pip';
import classNames from 'classnames';

import MapStatus from './MapStatus';

// import ReactMixin from 'react-mixin';
// import MapActions from '../actions/MapActions';

let map, gps, featureGroup;

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
        coordinates: [[[ -22.918106, -43.364866 ]]]
    },
]

console.log(data);

var circle_options = {
    color: '#ff0000',      // Stroke color
    opacity: 0.6,         // Stroke opacity
    weight: 0,         // Stroke weight
    fillOpacity: 0.4    // Fill opacity
};

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            dangers: [],
        }
        L.mapbox.accessToken = 'pk.eyJ1Ijoiam9hb2FobWFkIiwiYSI6ImZjZmMyMTcwMWU1NWZiZGRiNWY5NGU4NGEyYTFiYTNmIn0.U4_OOvESGl-pX5MpEcQqOQ';
    }

    componentDidMount(){
        var _this = this;

        map = L.mapbox
        .map('map', 'mapbox.streets-basic', { zoomControl: false })
        .setView([-22.928577, -43.456308], 12);

        var features = data.reduce((items, item) => {
            items.push({
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: item.coordinates,
                },
                properties: {
                    name: item.name
                }
            });
            return items;
        }, []);

        var geojson = {
            type: "FeatureCollection",
            features: features,
        }

        featureGroup = L.geoJson(geojson).addTo(map);

        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: featureGroup
            }
        }).addTo(map);

        map.on('draw:created', function(e) {
            console.log(JSON.stringify(markers));
            featureGroup.addLayer(e.layer);
        });

        gps = L.marker([0,0]).addTo(map);

        map.locate();

        map.on('locationfound', function(e) {
            // gps.setLatLng([e.latlng.lat, e.latlng.lng]);
            // map.setView(e.latlng, 16);
            gps.setLatLng(e.latlng);
            var loop = setInterval(function(){
                _this.check();
            }, 1000);
        });


    }

    check(){
        var latlng = gps.getLatLng();
        var results = leafletPip.pointInLayer([latlng.lng, latlng.lat], featureGroup);
        this.setState({dangers: results});
    }

    render() {
        let dangers = this.state.dangers;

        let classes = classNames("map-container",{
            "map-box": true,
            "-notsafe": (dangers.length > 0),
        });

        return (
            <div className={classes}>
            <MapStatus dangers={this.state.dangers} />
            <div id="map" className="map"></div>
            </div>
        );
    }

    _handleAddMarker(e){
        newMarker = new L.marker(e.latlng).addTo(map);
        // MapActions.addMap(this.state);
    }

    _handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }

    _handleMarker(e){

        var {lat, lng} = e.latlng;
        this.setState({ lat: lat, lng: lng });

        if (!newMarker){
            this._handleAddMarker(e);
        }else{
            newMarker.setLatLng(e.latlng);
        }
    }
}

// ReactMixin(Map.prototype, LinkedStateMixin);

module.exports = Map;
