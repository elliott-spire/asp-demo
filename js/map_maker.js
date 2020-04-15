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
      source: new ol.source.OSM()
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
    maxZoom: 5,
    // constrained map extent
    // https://openlayers.org/en/latest/examples/extent-constrained.html
    extent: imageExtent
  })
});

// change vessel layer source
function changeVessels(index) {
  var geojson = window.VESSELS['vessels' + index];
  var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojson)
  });
  window.SpireVesselLayer.setSource(vectorSource);
}

// keep track of hovered/selected vessel
window.selectedVessel = null;
window.hoveredVessel = null;
// map click/touch event listener
window.ol_map.on('click', function(e) {
    // check each feature at clicked pixel
    window.ol_map.forEachFeatureAtPixel(e.pixel, function(f) {
        // get the type of the selected feature
        // check if there is a vessel already selected
        if (window.selectedVessel !== null) {
            // remove selected styling for current selection
            window.selectedVessel.setStyle(undefined);
        }
        // set the global variable to the newly selected vessel
        window.selectedVessel = f;
        // style selected vessel as the red Spire logo
        // so it's easy to differentiate from the other blue ship dots
        f.setStyle(vesselSelectStyle);
        // turn off hover styling
        window.hoveredVessel = null;
        var vessel_data = window.selectedVessel.getProperties();
        console.log('Selected vessel:', vessel_data);
        document.getElementById('vesselInfo').innerHTML = '';
        // display the vessel info popup
        jsonView.format(vessel_data, '#vesselInfo');
        document.getElementById('vesselPopup').style.display = 'block';
        
        return true;
    });
});

function removeHoverStyles() {
    // remove hover styling for currently hovered vessel
    if (window.hoveredVessel) {
        window.hoveredVessel.setStyle(undefined);
        window.hoveredVessel = null;
    }
}

// mouse hover event listener
window.ol_map.on('pointermove', function(e) {
    // reset cursor to default
    document.body.style.cursor = 'default';
    // remove hover styling for currently hovered vessel
    removeHoverStyles();
    // check each feature at hovered pixel
    window.ol_map.forEachFeatureAtPixel(e.pixel, function(f) {
        // change cursor to indicate some feature is being moused over
        document.body.style.cursor = 'pointer';
        // ensure only one feature is hovered at a time
        removeHoverStyles()
        if (window.selectedVessel != f) {
            // only set hover style on this vessel
            // if it is not already currently selected
            window.hoveredVessel = f;
            window.hoveredVessel.setStyle(vesselHoverStyle);
            console.log(f.getProperties())
        }
    });
});

changeWMSImage('wms/1.png');
changeVessels(1);

// enable the vessel info popup to be dragged around on the screen
makeElementDraggable(document.getElementById('vesselPopup'));
// close the vessel info popup when the X button is clicked
document.getElementById('closeVesselPopup').addEventListener('click', function() {
    document.getElementById('vesselPopup').style.display = 'none';
    document.getElementById('vesselInfo').innerHTML = '';
    // un-select the vessel since it's no longer being inspected
    if (window.selectedVessel) {
        window.selectedVessel.setStyle(undefined);
        window.selectedVessel = null;
    }
});
