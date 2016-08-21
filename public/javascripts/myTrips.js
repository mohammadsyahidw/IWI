/**
 * Created by Iffah Nisrina on 8/21/2016.
 */
var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/mytrip'
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
        $scope.show = function (idtrip)     {
            window.location = "http://localhost:3000/show/"+idtrip;

        }
    $scope.addTrip = function () {
        $http({
            method : 'GET',
            url: 'http://localhost:3000/addTrip'
        })
            .success(function (data, status, headers, config) {

                window.location = "http://localhost:3000/addTrip";
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    };
    $scope.myTrip = function () {
        $http({
            method : 'GET',
            url: 'http://localhost:3000/api/myTrip'
        })
            .success(function (data, status, headers, config) {
                alert(data);
                window.location = "http://localhost:3000/myTrips";
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    };
    $scope.addTrip = function () {
        $http({
            method : 'GET',
            url: 'http://localhost:3000/addTrip'
        })
            .success(function (data, status, headers, config) {

                window.location = "http://localhost:3000/addTrip";
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    };

}]);