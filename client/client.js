/**
 * Created by Iffah Nisrina on 8/17/2016.
 */
var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {};
    $scope.user.username='';
    $http({
        method : 'POST',
        url: 'http://localhost:3000/api'
    })
        .success(function (data, status, headers, config) {
            if (data){
                $scope.members=data;
            } else {
            }
        })
        .error(function (data, status, headers, config) {
            console.log(status);
        });

    $scope.login = function () {
        $http({
            method : 'POST',
            url: 'http://localhost:3000/login',
            data: {
                name : $scope.namelogin,
                password : $scope.passlogin
            }
        })
            .success(function (data, status, headers, config) {
                if (data[0].result==1){
                    $scope.islogin = true;
                    alert("Login Success!");
                } else {
                    alert("Login Failed!")
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}]);