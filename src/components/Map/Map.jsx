import React, { useRef, useState, useEffect } from "react";
import { fetchLocation } from "../../api/index";
import styles from "./Map.module.css";
import mapboxgl from "mapbox-gl";

const Map = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3VyYWpzbHkyMDIwIiwiYSI6ImNrYXBseGtjdjAzcnEyeGw0ZWR5cXhqYnkifQ.DBBAWepmS5Mo92WjLNN8dg";

  const LOCATION = {
    lat: 0,
    lng: 0,
  };
  const CENTER = [LOCATION.lat, LOCATION.lng];
  const DEFAULT_ZOOM = 1;

  const mapContainerRef = useRef(null);
  const [fetchedcountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchLocation());
    };
    fetchAPI();
  }, [setFetchedCountries]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/dark-v10",
      center: CENTER,
      zoom: DEFAULT_ZOOM,
    });
    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    var stores = {
      type: "FeatureCollection",
      features: fetchedcountries.map((c) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [c.countryInfo.long, c.countryInfo.lat],
        },
        properties: {
          country: c.country,
          confiremed: c.cases,
          recovered: c.recovered,
          deaths: c.deaths,
        },
      })),
    };

    stores.features.forEach(function (store, i) {
      store.properties.id = i;
    });

    map.on("load", function () {
      var marker = stores.features.forEach(function (marker) {
        // create a HTML element for each feature

        // make a marker for each feature and add to the map
        new mapboxgl.Marker()
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.country +
                  "</h3><p><strong>Confirmed:</strong>" +
                  marker.properties.confiremed +
                  "</p><p><strong>Recovered:</strong>" +
                  marker.properties.recovered +
                  "</p><p><strong>Deaths:</strong>" +
                  marker.properties.deaths +
                  "</p>"
              )
          )
          .addTo(map);
      });
    });
  });

  return <div className={styles.mapContainer} ref={mapContainerRef} />;
};

export default Map;
