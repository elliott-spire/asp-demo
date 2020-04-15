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

// stop WMS image iteration
var stopWMS = function() {
  if (window.WMS_Animation !== null) {
    window.clearInterval(window.WMS_Animation);
    window.WMS_Animation = null;
  }
};

// iterate through WMS images in a loop
var playWMS = function(index) {
  stopWMS();
  // var frameRate = 0.2; // 1 frame per 5 seconds
  // var frameRate = 0.5; // 1 frame per 2 seconds
  // var frameRate = 1.0; // 1 frame per second
  var frameRate = 2.0;
  window.WMS_Animation = window.setInterval(function() {
    var index = window.WMS_Animation_Time_Index;
    // WMS images are named by index
    changeWMSImage('wms/' + index + '.png');
    changeVessels(index);
    // 29 total WMS images
    if (index >= 29) {
      // first image is "1.png"
      window.WMS_Animation_Time_Index = 1;
    } else {
      // iterate through WMS index range 1 at a time
      window.WMS_Animation_Time_Index = index + 1
    }
  }, 1000 / frameRate);
};