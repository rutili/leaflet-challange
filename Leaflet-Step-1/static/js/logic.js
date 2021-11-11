// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var map = L.map("map", {
    center: [0, -40],
    zoom: 4
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(map);
  
  d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson').then(({features})=>{
      console.log(features[100]);

      features.forEach(feature => {
          var lat = feature.geometry.coordinates[1];
          var lng = feature.geometry.coordinates[0];
          var depth = feature.geometry.coordinates[2];
          var place = feature.properties.place;
          var mag = feature.properties.mag;
          var popup = `<h3>${place}</h3><h3>Magnitude: ${mag}</h3>`
          var color = depth>90 ? 'red' : depth>70 ? 'orange' : depth>50 ? 'peach' : depth>30 ? 'yellow' : depth>10 ? 'lime' : 'green';
          L.circle([lat,lng],{'radius':mag*30000, 'fillColor':color, 'color':'black','weight':1, 'fillOpacity':.65}).bindPopup(popup).addTo(map)
      });
  })

var legend = L.control({position:'bottomright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div','info legend');
    div.innerHTML += '<span style="background:red;color:white;padding:5px;font-size:28px;border:2px solid black"><10</span>';
    div.innerHTML += '<span style="background:orange;color:white;padding:5px;font-size:28px;border:2px solid black">11-30</span>';
    div.innerHTML += '<span style="background:violet;color:white;padding:5px;font-size:28px;border:2px solid black">31-50</span>';
    div.innerHTML += '<span style="background:brown;color:white;padding:5px;font-size:28px;border:2px solid black">51-70</span>';
    div.innerHTML += '<span style="background:lime;color:white;padding:5px;font-size:28px;border:2px solid black">71-90</span>';
    div.innerHTML += '<span style="background:green;color:white;padding:5px;font-size:28px;border:2px solid black">>90</span>';

    return div;
};

legend.addTo(map);