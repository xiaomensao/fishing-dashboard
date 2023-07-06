"use client";

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function Home() {
  const mapRef = useRef(null);

  const locations = [
    {
      name: 'Dewitt Pond',
      lat: 51.2631255,
      lng: -114.1239062
    },
    {
      name: 'Severn Dam Reservoir',
      lat: 51.212058,
      lng: -112.9551723
    },
    {
      name: 'Blood Indian Creek Reservoir',
      lat: 51.2535296,
      lng: -111.2256355
    },
    {
      name: 'Chain Lakes Reservoir', 
      lat: 50.2415624,
      lng: -114.2889392
    }
  ];

  useEffect(() => {
    const loader = new Loader({
      apiKey: '',
      version: "weekly",
    });

    loader.importLibrary('maps').then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat: 51.0443113,
          lng: -114.0656663
        },
        zoom: 8,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
      });

      const contentString = 'test';

      for (const location of locations) {
        const marker = new google.maps.Marker({
          map: map,
          position: {
            lat: location.lat,
            lng: location.lng
          },
        });

        const contentString = `
        <h1>${location.name}</h1>
        <div class="google-weather-place">
          <div class="google-weather-crop">
            <iframe class="google-weather" class="google-weather" src="https://www.google.com/search?igu=1&q=${location.name} weather">
            </iframe>
          </div>
        </div>`;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: 'Uluru',
        });
        infowindow.open({
          anchor: marker,
          map,
        });
      }
    })
    .catch((e) => {
      // do something
    });    
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }} ref={mapRef} />
  )
}
