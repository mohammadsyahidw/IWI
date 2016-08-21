/**
 * Created by Iffah Nisrina on 8/17/2016.
 */
var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

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

    $scope.submit = function (usernumber) {
        $http({
            method : 'POST',
            url: 'http://localhost:3000/api/submit',
            data: {
                creatorid : usernumber,
                destination : $scope.destination,
                description : $scope.description,
                date : $scope.date
            }
        })
            .success(function (data, status, headers, config) {
                if (data){
                    alert("Event added!");
                    window.location = "http://localhost:3000";
                } else {
                    alert("Adding event failed!")
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}]);