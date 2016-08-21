/**
 * Created by Iffah Nisrina on 8/21/2016.
 */
var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.search = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/mytrip',
            data :{
                eventid : $scope.eventid
            }
        })
            .success(function (data, status, headers, config) {

                if (data[0]!=null) {
                    $scope.members = data;
                } else {
                    alert("No one join!")
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}]);