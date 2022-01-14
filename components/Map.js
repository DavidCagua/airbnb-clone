import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
import { LocationMarkerIcon } from "@heroicons/react/solid";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  //Transform the searchresults into { latitude: 52.516272, longitude: 13.377722 }

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/davidcagua/ckydod0rd1tft14qvwp3xkvg6"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className=" cursor-pointer text-white animate-bounce"
              aria-label="push-pin"
            >
              <LocationMarkerIcon className="h-5 text-red-400" />
            </p>
          </Marker>
          {/* Popup when clicked */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
