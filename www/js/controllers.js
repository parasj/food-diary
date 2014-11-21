angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$firebase', '$cordovaCamera', 'Picture', 'Datastore', 'Auth', function($scope, $firebase, $cordovaCamera, Picture, Datastore, Auth) {
	var ref = Datastore.getUserByID(Auth.uuid());
	var userObj = $firebase(ref).$asObject();

	userObj.$bindTo($scope, "User");

	$scope.cameraButtonClicked = function() {
		console.log("button clicked");
		Picture.takePicture(function(data) {
			Datastore.saveNewEntry(Auth.uuid(), data);
		});
	};
}])

.controller('HomeCtrl', ['$scope', 'Datastore', 'Auth', '$firebase', function($scope, Datastore, Auth, $firebase) {
	var ref = Datastore.getUserByID(Auth.uuid());
	var userObj = $firebase(ref).$asObject();

	userObj.$bindTo($scope, "User");
}]);