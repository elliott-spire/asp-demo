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

// create WMS layer
window.SpireWMSLayer = new ol.layer.Image();
// create Vessel layer
window.SpireVesselLayer = new ol.layer.Vector({
  zIndex: 100,
  style: vesselStyle,
  source: new ol.source.Vector({
    features: null
  })
});
// set WMS animation index
window.WMS_Animation_Time_Index = 1;

// create OpenLayers map
window.ol_map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
      opacity: 0
    }),
    // add WMS layer
    window.SpireWMSLayer,
    window.SpireVesselLayer
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

changeWMSImage('wms/1.png');
changeVessels(1);
