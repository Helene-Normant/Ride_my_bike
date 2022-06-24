

var options = {
  // Asking accuracy in geolocalisation
  enableHighAccuracy: true,
  // Time in milliseconds to use error function.
  timeout: 5000,
  //Is a positive long value indicating the maximum age in milliseconds of a possible cached position
  //that is acceptable to return. If set to 0, it means that the device cannot use a cached position and
  //must attempt to retrieve the real current position.
  maximumAge: 0
};

// this function returns the number of available bikes at a given station
async function getABike(latitude, longitude) {
  try {
    let response = await fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=3&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=${latitude}%2C+${longitude}%2C500`)
    // connecting ourselves to the Paris City Hall API.
    let result = await response.json()
    return result // return promise
  } catch (err) {
    console.log(err);
  }
}

// Transform promise of GetABike in object.
function transformPromise(latitude, longitude) {
  getABike(latitude, longitude)
    .then(function (result) {
      initGauges(result)
      map(result, latitude, longitude)
    })
}

function success(pos) {
  //A callback function that takes a GeolocationPosition object as its sole input parameter.
  //Save localisation
  var crd = pos.coords;
  let latitude = crd.latitude;
  let longitude = crd.longitude
  // Use getABike function with latitude and longitude in arguments
  transformPromise(latitude, longitude);
  //transformPromise(48.852962091034826, 2.3645445692675127);
}

function error(err) {
  //An optional callback function that takes a GeolocationPositionError object as its sole input parameter.
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}



/* BEGING gauge fonction */
function initGauges(resultPromise) {
  document.getElementById("name_station1").innerHTML = resultPromise.records[0].fields.name
  document.getElementById("name_station2").innerHTML = resultPromise.records[1].fields.name
  document.getElementById("name_station3").innerHTML = resultPromise.records[2].fields.name
  var g = new JustGage({
    id: "gauge",
    value: resultPromise.records[0].fields.ebike,// = avaible electric bike
    min: 0,
    max: resultPromise.records[0].fields.capacity, // = capacity
    donut: true,
    label: "Electric",
    levelColors: ["#75cff0"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g2 = new JustGage({
    id: "gauge2",
    value: resultPromise.records[0].fields.mechanical,//= avaible mechanical bike
    min: 0,
    max: resultPromise.records[0].fields.capacity,
    donut: true,
    label: "Mechanical",
    levelColors: ["#b6e49e"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g3 = new JustGage({
    id: "gauge3",
    value: resultPromise.records[0].fields.numdocksavailable, // free dock
    min: 0,
    max: resultPromise.records[0].fields.capacity,// total dock
    donut: true,
    label: "Dock",
    levelColors: ["#ead2da"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var gEtage2 = new JustGage({
    id: "gauge-etg2",
    value: resultPromise.records[1].fields.ebike,
    min: 0,
    max: resultPromise.records[1].fields.capacity,
    donut: true,
    label: "Electric",
    levelColors: ["#75cff0"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g2Etage2 = new JustGage({
    id: "gauge2-etg2",
    value: resultPromise.records[1].fields.mechanical,
    min: 0,
    max: resultPromise.records[1].fields.capacity,
    donut: true,
    label: "Mechanical",
    levelColors: ["#b6e49e"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g3Etage2 = new JustGage({
    id: "gauge3-etg2",
    value: resultPromise.records[1].fields.numdocksavailable,
    min: 0,
    max: resultPromise.records[1].fields.capacity,
    donut: true,
    label: "Dock",
    levelColors: ["#ead2da"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });
  var gEtage3 = new JustGage({
    id: "gauge-etg3",
    value: resultPromise.records[2].fields.ebike,
    min: 0,
    max: resultPromise.records[2].fields.capacity,
    donut: true,
    label: "Electric",
    levelColors: ["#75cff0"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g2Etage3 = new JustGage({
    id: "gauge2-etg3",
    value: resultPromise.records[2].fields.mechanical,
    min: 0,
    max: resultPromise.records[2].fields.capacity,
    donut: true,
    label: "Mechanical",
    levelColors: ["#b6e49e"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

  var g3Etage3 = new JustGage({
    id: "gauge3-etg3",
    value: resultPromise.records[2].fields.numdocksavailable,
    min: 0,
    max: resultPromise.records[2].fields.capacity,
    donut: true,
    label: "Dock",
    levelColors: ["#ead2da"],
    shadowOpacity: 0.5,
    gaugeWidthScale: 0.8,
    relativeGaugeSize: true,
    title: ""
  });

}
/* END gauge fonction */

//MAP BEGING//
function map(result, latitude, longitude) {
  //Create Map
  mapboxgl.accessToken = 'pk.eyJ1Ijoib3NsYW5uZSIsImEiOiJja3NweXQ5eDQwN3N1MnBucTRpczY1dXAyIn0.OsggNoy1h_GzZk5ndqunKQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 13 // starting zoom
  })

  //Create Position marker
  // add markers to maps
  // create a HTML element for each feature
  const el1 = document.createElement('div');
  el1.className = 'marker1';

  // make a marker for each feature and add to the map
  const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([longitude, latitude])
    .setPopup(new mapboxgl.Popup({ anchor: 'top', offset: 15 })
      .setHTML(`<span><strong>You are here !</span></strong>`))
    .addTo(map);


  //Create Markers Station
  for (let i = 0; i <= 2; i++) {
    let latitudeStation = result.records[i].fields.coordonnees_geo[0]
    let longitudeStation = result.records[i].fields.coordonnees_geo[1]
    const el = document.createElement('div');
    el.id = 'marker';
    // Create a Marker and add it to the map.
    const maker = new mapboxgl.Marker()
      .setLngLat([longitudeStation, latitudeStation])
      .setPopup(new mapboxgl.Popup({ anchor: 'top', offset: 15 })
        .setHTML(`<span><strong>${result.records[i].fields.name}</span></strong><br>
        <span><strong>Distance:</strong> ${Math.floor(result.records[i].fields.dist)} meters</span><br>`))
      .addTo(map);
  }
}
//MAP END//



function main() {
  //Ask the user for their geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);

}


