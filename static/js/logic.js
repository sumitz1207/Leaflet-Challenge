
//star with tile layer using mapbox dark map from openstreetmap
var tile = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 15,
      zoomOffset: -1,
      id: "mapbox/dark-v10",
      accessToken: API_KEY
    }
  );

//link to the earthquake all month geojson file
var earthquakelink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

//create map variable with center and zoom variables
var map = L.map("map", {
  center: [33.14, -96],
  zoom: 3
});