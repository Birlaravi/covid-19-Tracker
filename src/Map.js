import React from "react";
import { MapContainer, TileLayer ,useMap} from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "./Map.css";
import {showDataOnMap} from './useful'
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
function Map({ casesType,countries,center,zoom}) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom="false">
       <ChangeView center={center} zoom={zoom} /> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries,casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
