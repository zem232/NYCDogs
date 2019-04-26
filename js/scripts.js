// Zoe Martiniak's basic website


// Loading the map from mapboxgl
mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
container: 'mapContainer',
style: 'mapbox://styles/mapbox/dark-v10',
center: [-73.950348,40.733210],
zoom: 11
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


// the additional sources & layers cannot be loaded until the style of the base map is loaded
map.on('style.load', function() {
  //add a button click listener that will control the map

  $('#park-slope').on('click', function(){
    map.flyTo({
    center: [-73.981, 40.670131],
    zoom: 9});
  });

//setting paint property background
  map.setPaintProperty('water','fill-color','cyan')


  // setting up the geojson as a source in the map
  // used to add visual layers
  map.addSource('zip-codes', {
    type: 'geojson', // other types of sources include: video, vector tile, & others
    data: './Data/Zip_Codes.geojson',
  });


//now need to add the geojson as a layer
// note that layers require id within curly brackets, whereas sources require id just before
map.addLayer({
  id: 'zip-codes-fill',
  type: 'fill',
  source: 'zip-codes',
  before: 'waterway-label',
  paint: {
    'fill-opacity': 0.3,
    'fill-color': {
      type: 'categorical',
      property: 'landuse',
      stops: [
        ['01',
          'steelblue']]
          // try to play around and make a function if possible
    }}
  });

  // e is the event (js knows where cursor is when you move your mouse)
  map.on('mousemove', function (e){
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['zip-codes-fill']
    });
    // get the first feature from the array of returned features
    const zipc = features[0];

    if (zipc) {
    //console.log(lot.properties.address);
    $('#address').text('Zip Code: ' + zipc.properties.ZIPCODE);
    $('#landuse').text(zipc.properties.PO_NAME);
    console.log(zipc.properties.ZIPCODE, typeof zipc.properties.ZIPCODE);
    console.log(DogData.length, typeof DogData[0].zipcode);
    DogData.forEach(function(item) {
      if (item.zipcode === parseInt(zipc.properties.ZIPCODE)) {
        $('#Dogdata').text(', Total Dogs: '+ item.Total);
    }
    });
  };
  });
  })
