////////////////////
/// Build the Map //
////////////////////

// [minX, minY, maxX, maxY]
var imageExtent = [
  -209.841277370518,
  -73.0804081248023,
  -97.53679007794108,
  -3.25693038289896
];

// set WMS animation index
window.WMS_Animation_Time_Index = 1;

// create OpenLayers map
window.ol_map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
      opacity: 0
    })
  ],
  target: 'map',
  view: new ol.View({
    projection: 'EPSG:4326',
    center: ol.extent.getCenter(imageExtent),
    zoom: 4,
    minZoom: 4,
    maxZoom: 4,
    // constrained map extent
    // https://openlayers.org/en/latest/examples/extent-constrained.html
    extent: imageExtent
  })
});

// create and add WMS layers
window.SpireWMSLayers = [];
for (var i=1; i<=29; i++) {
  var id = String(i)
  var img = 'wms/' + id + '.png';
  // load img to invisible <img> element
  // to ensure it's cached by the browser
  window.SpireWMSLayers[i] = new ol.layer.Image({
    visible: false, // initialize as invisible
    source: new ol.source.ImageStatic({
      url: img,
      projection: 'EPSG:4326',
      imageExtent: imageExtent
    })
  });
  // add invisible WMS layer to map
  window.ol_map.addLayer(window.SpireWMSLayers[i]);
}
// create Vessel layer
window.SpireVesselLayer = new ol.layer.Vector({
  zIndex: 100,
  style: vesselStyle,
  source: new ol.source.Vector({
    features: null
  })
});

// add Vessel layer to map
window.ol_map.addLayer(window.SpireVesselLayer);

document.body.onload = function() {
  // initialize time
  playTime(true);
}
