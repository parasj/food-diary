angular.module('starter.services', [])

.factory('Picture', ['$cordovaCamera', function($cordovaCamera) {
  // Captures images...

  return {
    doCaptureAndUpload: function() {
      console.log("Stubbed method");
      return "http://honestcooking.com/wp-content/uploads/2013/09/2401039199_3509e6ec5c_o.jpg";
    },
    takePicture: function(cb, err) {
      if (typeof Camera === 'object') {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData) {
            cb("data:image/jpeg;base64," + imageData);
        }, function(errVal) {
            if (err) {
              err(errVal);
            }
        });
      }
    }
  }
}])

.factory('Datastore', ["$firebase", function($firebase) {
  var ref = new Firebase("https://foodly.firebaseio.com/");
  var sync = $firebase(ref);

  return {
    getFirebase: function() {
      return sync;
    },

    getFirebaseRef: function() {
      return ref;
    },
    
    getFirebaseObject: function(object) {
      return ref.child(object);
    },

    getUsers: function() {
      var sync = this.getFirebaseObject('Users');
      return sync;
    },

    getUserByID: function(uid) {
      var sync = this.getFirebaseObject('Users/' + uid);
      return sync;
    },

    saveNewEntry: function(uid, imgurl) {
      var sync = $firebase(this.getUserByID(uid).child('entries'));
      var entries = sync.$asArray();

      entries.$add({
        timestamp: Date.now(),
        img: imgurl,
        location: {}
      });

      entries.$save();
    }
  }
}])

.factory('Auth', ['$firebase', function($firebase) {
  var uuid = 'Paras';
  
  return {
    uuid: function() {
      return uuid;
    }
  }
}]);

