
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

//add tile layer to the map
tile.addTo(map);
d3.json(earthquakelink, function(data) {

  function styleInfo(feature) {
    return {
      opacity: 0.8,
      fillOpacity: 0.9,
      fillColor: col(feature.geometry.coordinates[2]),
      color: "#000",
      radius: rad(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
//set radius for map
  function rad(mag) {
    if (mag === 0) {
      return 0.7;
    }
    return mag * 3.2;
  }
//color the map circles according to magnitude passed in; a spectrum of red colors
  function col(mag) {
    switch (true) {
    case (mag > 90):
      return "#3E0000";
    case (mag > 70 && mag <= 90):
      return "#650000";
    case (mag > 50 && mag <= 70):
      return "#8B0000";
    case (mag > 30 && mag <= 50):
      return "#B11B1B";
    case (mag > 10 && mag <= 30):
      return "#D84141";
    default:
      return "#FE7272";
    }
  }
//use layer geojson to create pop ups that tell each earthquake's magnitude, depth and location
L.geoJson(data, {
    pointToLayer: function(circle, loc) {
      return L.circleMarker(loc);
    },
    style: styleInfo,
    onEachFeature: function(earthquake, pop) {
        //for each pop up set the magnitude, depth and earthquake location obtained from geojson data
      pop.bindPopup(
        "Magnitude: "
          + earthquake.properties.mag
          + "<br>Depth: "
          + earthquake.geometry.coordinates[2]
          + "<br>Location: "
          + earthquake.properties.place
      );
    }
  }).addTo(map);
//put a legend in the bottom left of the map
var info = L.control({
    position: "bottomleft"
  });

  // Then add all the details for the legend
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    //use array of number for magnitude and colors to make legend
    var rad = [0, 1, 2, 3, 4, 5];
    var color = [
      "#FE7272",
      "#D84141",
      "#B11B1B",
      "#8B0000",
      "#650000",
      "#3E0000"
    ];
    div.innerHTML += 'Magnitude<br>'
    for (var i = 0; i < rad.length; i++) {
        div.innerHTML +=
        '<i style="background:' + color[i] + '"></i> ' +
        rad[i] + (rad[i + 1] ? '&ndash;' + rad[i + 1] + '<br>' : '+');
    }
    return div;
  };

  //add info to map
  info.addTo(map);

});
