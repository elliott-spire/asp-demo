// style for a vessel point feature
var vesselStyle = function(feature) {
    return new ol.style.Style({
        zIndex: Infinity,
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            scale: 0.3,
            opacity: 0.4,
            rotation: feature.getProperties()['heading_radians'],
            src: 'img/blue_ship.png'
        })
    });
}

// style for a vessel that has been hovered on
// with the user's  mouse cursor
var vesselHoverStyle = function(feature) {
    return new ol.style.Style({
        zIndex: Infinity,
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            scale: 0.5,
            opacity: 0.7,
            rotation: feature.getProperties()['heading_radians'],
            src: 'img/red_ship.png'
        })
    });
}

// style for a Vessel point feature that has been selected
// and currently has its vessel info displayed in a popup
var vesselSelectStyle = function(feature) {
    return new ol.style.Style({
        zIndex: Infinity,
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            scale: 0.5,
            opacity: 1.0,
            rotation: feature.getProperties()['heading_radians'],
            src: 'img/red_ship.png'
        })
    });
}