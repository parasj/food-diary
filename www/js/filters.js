angular.module('starter.filters', [])

.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})

.filter('moment', function() {
  return function(time) {
    return moment(time, "x").fromNow();
  };
})

.filter('timeToMealCategory', function() {
  return function(time) {
    var now = moment(time, "x");
    var timestr = "Snack";

    var time = parseInt(now.format("H"));
    
    if (time > 5 && time < 11) {
      timestr = "Breakfast";
    } else if (time < 15) {
      timestr = "Lunch";
    } else if (time < 18) {
      var timestr = "Snack";
    } else if (time < 23) {
      var timestr = "Dinner";
    } else {
      var timestr = "Snack";
    }

    return timestr;
  };
});