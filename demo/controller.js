/*
 * Controller Demo Fast Use Leaflet
 */
var app = angular.module('app', []);

app.controller('controllerData', function($scope, fastUseLeaflet) {

  var init = function () {

    var paris = [48.8611,2.3428];

    $scope.objMAP = new fastUseLeaflet(paris,12);
  }
  //Launch fastUseLeaflet after load page html
  init();

});
