/**
 * Created by Iffah Nisrina on 8/17/2016.
 */
/*
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {};
    $scope.user.username='';
    $http({
        method : 'POST',
        url: 'http://localhost:3000'
    })
        .success(function (data, status, headers, config) {

            if (data){
                $scope.members=data;
                alert(data);
            } else {
            }
        })
        .error(function (data, status, headers, config) {
            console.log(status);
        });
}]);
*/
var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {};
    $scope.user.username='';
    $http({
        method : 'POST',
        url: 'http://localhost:3000'
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
    };
    $scope.signup = function () {
        $http({
            method : 'POST',
            url: 'http://localhost:3000/signup',
            data: {
                newname : $scope.nname,
                newpassword : $scope.npassword
            }
        })
            .success(function (data, status, headers, config) {
                if (data){
                    alert("Sign Up Success!");
                } else {
                    alert("Sign Up Failed!")
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}]);
//
// module.directive('hideTop', function () {
//     return {
//         link : function (scope, element) {
//             scope.$watch("islogin", function () {
//                 if (scope.islogin) {
//                     element.addClass('hide');
//                 }
//             });
//         }
//     };
// });