// // enable the vessel info popup to be dragged around on the screen
// makeElementDraggable(document.getElementById('vesselPopup'));
// // close the vessel info popup when the X button is clicked
// document.getElementById('closeVesselPopup').addEventListener('click', function() {
//     document.getElementById('vesselPopup').style.display = 'none';
//     document.getElementById('vesselInfo').innerHTML = '';
//     // un-select the vessel since it's no longer being inspected
//     if (window.selectedVessel) {
//         window.selectedVessel.setStyle(undefined);
//         window.selectedVessel = null;
//     }
// });

// function vesselToText(data) {
//     var container = document.createElement('div');
//     // container.style.padding = '10px';
//     var keys = Object.keys(data);
//     for (var i=0; i<keys.length; i++) {
//         var line = document.createElement('div');
//         line.className = 'json-line';
//         var keytext = document.createElement('div');
//         keytext.className = 'json-key';
//         keytext.textContent = keys[i] + ': ' ;
//         var valtext = document.createElement('div');
//         valtext.className = 'json-string';
//         valtext.textContent = data[keys[i]];
//         line.appendChild(keytext);
//         line.appendChild(valtext);
//         container.appendChild(line)
//     }
//     return container;
// }

// // keep track of hovered/selected vessel
// window.selectedVessel = null;
// window.hoveredVessel = null;
// // map click/touch event listener
// window.ol_map.on('click', function(e) {
//     // check each feature at clicked pixel
//     window.ol_map.forEachFeatureAtPixel(e.pixel, function(f) {
//         // // get the type of the selected feature
//         // // check if there is a vessel already selected
//         // if (window.selectedVessel !== null) {
//         //     // remove selected styling for current selection
//         //     window.selectedVessel.setStyle(undefined);
//         // }
//         // set the global variable to the newly selected vessel
//         window.selectedVessel = f;
//         // // style selected vessel as the red Spire logo
//         // // so it's easy to differentiate from the other blue ship dots
//         // f.setStyle(vesselSelectStyle);
//         // turn off hover styling
//         window.hoveredVessel = null;
//         var vessel_data = window.selectedVessel.get('data');
//         console.log('Selected vessel:', vessel_data);
//         document.getElementById('vesselInfo').innerHTML = '';
//         // display the vessel info popup
//         // jsonView.format(vessel_data, '#vesselInfo');
//         document.getElementById('vesselInfo').appendChild(vesselToText(vessel_data));
//         document.getElementById('vesselPopup').style.display = 'block';
//         var left = e.pixel[0];
//         var top = e.pixel[1];
//         if (left < 720) {
//             document.getElementById('vesselPopup').style.left = left + 'px';
//         } else {
//             document.getElementById('vesselPopup').style.left = left - 500 + 'px';
//         }
//         if (top < 300) {
//             document.getElementById('vesselPopup').style.top = top + 'px';
//         } else {
//             document.getElementById('vesselPopup').style.top = top - 300 + 'px';
//         }
//         return true;
//     });
// });

// function removeHoverStyles() {
//     // remove hover styling for currently hovered vessel
//     if (window.hoveredVessel) {
//         window.hoveredVessel.setStyle(undefined);
//         window.hoveredVessel = null;
//     }
// }

// // mouse hover event listener
// window.ol_map.on('pointermove', function(e) {
//     // reset cursor to default
//     document.body.style.cursor = 'default';
//     // // remove hover styling for currently hovered vessel
//     // removeHoverStyles();
//     // check each feature at hovered pixel
//     window.ol_map.forEachFeatureAtPixel(e.pixel, function(f) {
//         // change cursor to indicate some feature is being moused over
//         document.body.style.cursor = 'pointer';
//         // // ensure only one feature is hovered at a time
//         // removeHoverStyles()
//         if (window.selectedVessel != f) {
//             // only set hover style on this vessel
//             // if it is not already currently selected
//             window.hoveredVessel = f;
//             // window.hoveredVessel.setStyle(vesselHoverStyle);
//         }
//     });
// });