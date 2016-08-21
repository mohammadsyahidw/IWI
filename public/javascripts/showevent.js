/**
 * Created by ajou on 21/08/2016.
 */

var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    //askasjkasn
    $scope.user = {};
    $scope.user.username='';
    $http({
        method : 'POST',
        url: 'http://localhost:3000/api/myTrip'
    })
        .success(function (data, status, headers, config) {

            if (data){
                $scope.members=data;
                // console.log(data.message);
            } else {
            }
        })
        .error(function (data, status, headers, config) {
            console.log(status);
        });

    $scope.login = function () {
        $http({
            method : 'GET',
            url: 'http://localhost:3000/'
        })
            .success(function (data, status, headers, config) {

                window.location = "http://localhost:3000/";
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    };
    $scope.join = function () {
        $http({
            method : 'POST',
            url: 'http://localhost:3000/api/join'
        })
            .success(function (data, status, headers, config) {

                window.location = "http://localhost:3000/";
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

}]);