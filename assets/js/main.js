angular.module("b2w", []).controller('b2w-controller',function b2wController($scope){
  $scope.JSONData = '';
  $scope.replacePercentage = function(value){
    return value.replace('%','');
  }
})

$.getJSON('http://www.mocky.io/v2/5a5e38f3330000b0261923a5',function(json_data){
  angular.element("[ng-controller=b2w-controller]").scope().JSONData = json_data["profile"]
  angular.element("[ng-controller=b2w-controller]").scope().$apply();  
});
