import React from 'react';
// import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Route, RouteHandler, Link } from 'react-router';
import mapbox from 'mapbox.js';
import axios from 'axios';
import leafletDraw from 'leaflet-draw';
import leafletPip from 'leaflet-pip';
import classNames from 'classnames';

import MapStatus from './MapStatus';

let map, gps, featureGroup = null;

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            areas: [],
            inPlace: []
        }
        L.mapbox.accessToken = 'pk.eyJ1Ijoiam9hb2FobWFkIiwiYSI6ImZjZmMyMTcwMWU1NWZiZGRiNWY5NGU4NGEyYTFiYTNmIn0.U4_OOvESGl-pX5MpEcQqOQ';
    }

    componentDidMount(){
        var _this = this;

        map = L.mapbox
        .map('map', 'mapbox.streets-basic', { zoomControl: false })
        .setView([-22.928577, -43.456308], 12);

        const revertLatLng = (arr) => {
            if(!Array.isArray(arr) || !arr.length)
            return false;

            return arr.map(item => {
                if(Array.isArray(item[0])){
                    return revertLatLng(item)
                }else{
                    return [item[1], item[0]]
                }
            })
        }

        this.fetchData().then(() => {
            console.log(_this.state.areas);

            var features = _this.state.areas.reduce((items, item) => {
                items.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: item.coordinates,
                    },
                    properties: {
                        _id: item._id,
                        strategy: item.strategy,
                        level: item.level,
                        type: item.type,
                    }
                });
                return items;
            }, []);

            var geojson = {
                type: "FeatureCollection",
                features: features,
            }

            featureGroup = L.geoJson(geojson, {
                style: function (feature) {
                    // max opacity 0.5
                    const opacity = (feature.properties.level / 10) / 2;
                    return {
                        color: 'red',
                        stroke: false,
                        fillOpacity: opacity
                    };
                },
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.type);
                }
            }).addTo(map);

            var drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: featureGroup
                }
            }).addTo(map);


            map.on('draw:created', function(e) {
                featureGroup.addLayer(e.layer);
                var feature = e.layer.toGeoJSON()
                const data = {
                    coordinates: feature.geometry.coordinates,
                    strategy: 'include',
                    level: 10,
                    type: 'criminal',
                }

                axios.post('/api/areas', data)
                .then(function(response){
                    console.log(response);
                    // const state = {}
                    // state.areas = response.data
                    // self.setState(state);
                });


            });


            // TODO: edit drawn polygon
            map.on('draw:edited', function(e) {
                e.layers.eachLayer(function (layer) {
                    console.log(layer);
                    //do whatever you want, most likely save back to db
                });
            });

        });
        gps = L.circleMarker([0,0]).addTo(map);


        navigator.geolocation.watchPosition((e) => {
            // setInterval(function(){
                console.log('watching...');
                let latlng = [e.coords.latitude, e.coords.longitude];
                map.setView(latlng, 16);
                gps.setLatLng(latlng);
                _this.check();
            // }, 1000)
        });

        // map.on('locationfound', function(e) {
        //     // gps.setLatLng([e.latlng.lat, e.latlng.lng]);
        //
        // });


    }

    fetchData(){
        const self = this;
        return axios.get('/api/areas')
        .then(function(response){
            console.log('response', response);
            const state = {}
            state.areas = response.data
            self.setState(state);
        });
    }

    check(){
        if (!featureGroup)
        return

        var latlng = gps.getLatLng();
        var results = leafletPip.pointInLayer([latlng.lng, latlng.lat], featureGroup);
        this.setState({inPlace: results});
    }

    render() {

        const { inPlace } = this.state

        let classes = classNames("map-container",{
            "map-box": true,
            "-notsafe": (inPlace.length > 0),
        });
        // <MapStatus areas={this.state.areas} />

        return (
            <div className={classes}>
                <MapStatus inPlace={inPlace} />
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
