// change WMS layer source
function changeWMSImage(img) {
  window.SpireWMSLayer.setSource(
    new ol.source.ImageStatic({
      url: img,
      projection: 'EPSG:4326',
      imageExtent: imageExtent
    })
  );
}

// change vessel layer source
function changeVessels(index) {
  var geojson = window.VESSELS['vessels' + index];
  var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojson)
  });
  window.SpireVesselLayer.setSource(vectorSource);
}

function iterateForward() {
  var index = window.WMS_Animation_Time_Index;
  // increase current index by 1
  index = index + 1;
  // 29 total WMS images
  if (index > 29) {
    // first image is "1.png"
    index = 1;
  }
  // WMS images are named by index
  changeWMSImage('wms/' + index + '.png');
  changeVessels(index);
  // set global index state
  window.WMS_Animation_Time_Index = index;
}

function iterateBackward() {
  var index = window.WMS_Animation_Time_Index;
  // decrease current index by 1
  index = index - 1;
  // 29 total WMS images
  if (index < 1) {
    // last image is "29.png"
    index = 29;
  }
  // WMS images are named by index
  changeWMSImage('wms/' + index + '.png');
  changeVessels(index);
  // set global index state
  window.WMS_Animation_Time_Index = index;
}

// iterate through WMS images and visible vessels in a loop
var playTime = function(index) {
  pauseTime();
  // var frameRate = 0.2; // 1 frame per 5 seconds
  // var frameRate = 0.5; // 1 frame per 2 seconds
  // var frameRate = 1.0; // 1 frame per second
  var frameRate = 8.0;
  window.WMS_Animation = window.setInterval(function() {
    iterateForward();
  }, 1000 / frameRate);
};

// stop animation
var pauseTime = function() {
  if (window.WMS_Animation !== null) {
    window.clearInterval(window.WMS_Animation);
    window.WMS_Animation = null;
  }
};