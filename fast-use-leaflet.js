/*
 * Fast Use Leaflet - OpenStreetMap
 */

 app.factory('fastUseLeaflet', function($window){


   return function fastUseLeaflet(coord, zoom){

     //Find Path for images
     var scriptSource = document.getElementById('fastUseLeaflet').src;
     scriptSource = scriptSource.replace("fast-use-leaflet.js","");
     scriptSource = scriptSource + "images/";

     this.FULL = 1;
     //   this.CENTER = "center";
     //   this.START = "start";
     //   this.END = "end";
     this.ORIGIN = coord;
     this.ORIGIN_ZOOM = zoom;

     var  map = L.map('map').setView(coord, zoom);

     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
     }).addTo(map);

     var LeafIcon = L.Icon.extend({
       options: {
         shadowUrl: scriptSource+'leaf-shadow.png',
         iconSize:     [38, 95],
         shadowSize:   [50, 64],
         iconAnchor:   [22, 94],
         shadowAnchor: [4, 62],
         popupAnchor:  [-3, -76]
       }
     });

     var greenIcon = new LeafIcon({iconUrl: scriptSource+'leaf-green.png'});
     var redIcon = new LeafIcon({iconUrl: scriptSource+'leaf-red.png'});

     var startPoint;
     var endPoint;

     //Création d'un point de départ / Create start point
     this.createStartPoint = function(startLat, startLon){
       return  L.marker([startLat, startLon], {icon: greenIcon}).addTo(map).bindPopup("Start point." );
     }

     //Création d'un point d'arrivé / Create end point
     this.createEndPoint = function(startLat, startLon){
       return  L.marker([startLat, startLon], {icon: redIcon}).addTo(map).bindPopup("End point.");
     }

     //Change le point de départ
     //Si inexistant, le crée
     this.changeStartPoint = function(startLat, startLon){
       if(startPoint != undefined){
         startPoint.setLatLng(L.latLng(startLat, startLon));
       } else {
         startPoint = this.createStartPoint(startLat, startLon );
       }
     };

     //Change le point d'arrivé
     //Si inexistant, le crée
     this.changeEndPoint = function(endLat, endLon){
       if(endPoint != undefined){
         endPoint.setLatLng(L.latLng(endLat, endLon));
       } else {
         endPoint = this.createEndPoint(endLat, endLon );
       }
     };

     //Mise à jour de la map / Update view map, center -> start point
     this.updateMap = function(zoom){
       if(startPoint != undefined || endPoint != undefined){
         map.setView([startPoint.getLatLng().lat, startPoint.getLatLng().lng], zoom+0.01);
       }
     }

     //Réinitialisation de la carte / Reset Map
     this.resetMap = function(zoom){
       if(zoom == undefined){
         try{
           map.removeLayer(startPoint);
           startPoint = undefined;
           map.removeLayer(endPoint);
           endPoint = undefined;
         } catch(e){

         }
         map.setView(this.ORIGIN,this.ORIGIN_ZOOM+0.01);
       }else {
         try{
           map.removeLayer(startPoint);
           startPoint = undefined;
           map.removeLayer(endPoint);
           endPoint = undefined;
         } catch(e){

         }
         map.setView(this.ORIGIN,zoom+0.01);
       }
     }

     this.changeViewMap = function(startLat,startLng,endLat,endLng,zoom){
       try {
         this.changeStartPoint(startLat,startLng);
         this.changeEndPoint(endLat,endLng);
         this.updateMap(zoom);
       } catch (e) {
         //Routes is not defined correctly
         //Les coordonnées ne sont pas valides
         console.log("Les coordonnées ne sont pas valides");
       }
     }
   };

 });
