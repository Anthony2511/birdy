import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';
import MarkerClusterer from '@google/markerclustererplus';

class MapCapture extends Component {
    state = {
        lat: 50.59,
        lng: 5.88,
        zoom: 15,
        zones: []
    }

    componentDidMount() {
        window.initMap = this.initMap
        this.getAllCaptures()
    }

    loadScript = (url) => {
        var index = window.document.getElementsByTagName("script")[0]
        var script = window.document.createElement("script")
        script.src = url
        script.async = true
        script.defer = true
        index.parentNode.insertBefore(script, index)
    }

    getAllCaptures = () => {
        // Get the capture sessions
        const capture_sessions = firebase.database().ref('capture_sessions');

        capture_sessions.on('value', snapshot => {
            this.setState({
                zones: snapshot.val()
            }, this.renderMap())
        })
    }
    renderMap = () => {
        this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCtVjlZvNttjUR0eDFKN0P5MH_m4JtEsig&callback=initMap")
    }

    initMap = () => {
        const {zones} = this.state

        const allcaptures = Object.values(zones);
        //genere map
        var map = new window.google.maps.Map(
            document.getElementById('map'), {
                center: {lat: this.state.lat, lng: this.state.lng},
                zoom: 10
            })

        //loop generate marker
        var markers = allcaptures.map(result => {
            var marker = new window.google.maps.Marker({
                position: {lat: result.place.lat, lng: result.place.lng},
                map: map
            })
            return marker
        })

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
          {imagePath: '/map-images/m'})

        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
    }

    render() {
        //const position = [this.state.lat, this.state.lng]
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Carte des captures</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <div className="birdy-map" id="map"></div>
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }
}


export default MapCapture;