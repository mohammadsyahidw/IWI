/**
 * Created by Iffah Nisrina on 8/21/2016.
 */
var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.join = function () {
        $http({
            method : 'POST',
            url: 'http://localhost:3000/search',
            data: {
                eventid : $scope.idevent,
                follower : $scope.userid
            }
        })
            .success(function (data, status, headers, config) {
                if (data[0].result==0){
                    $http({
                        method : 'POST',
                        url: 'http://localhost:3000/join',
                        data:{
                            eventid1 : $scope.idevent,
                            follower1 : $scope.userid
                        }
                    })
                        .success(function (data, status, headers, config) {
                            if (data){
                                alert("Join successfully!");
                            } else {
                                alert("Join failed!");
                            }
                        })
                        .error(function (data, status, headers, config) {
                            console.log(status);
                        });
                } else {
                    alert("You already join!");
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}]);