/**
 * Created by Iffah Nisrina on 8/20/2016.
 */

var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.signup = function () {
        if ($scope.nname == null || $scope.npassword1==null || $scope.npassword2 == null || $scope.email==null) {
            alert("Blank form must be filled!");
        } else {
            if ($scope.npassword1 == $scope.npassword2) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/signup',
                    data: {
                        newname: $scope.nname,
                        newpassword1: $scope.npassword1
                    }
                })
                    .success(function (data, status, headers, config) {
                        if (data) {
                            //  if ($scope.npassword1 == $scope.npassword2) {
                            alert("Sign Up Success!");
                            //   } else {
                            //    alert("Confirm");
                            // }
                        } else {
                            alert("Sign Up Failed!")
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log(status);
                    });
            } else {
                alert("Confirm Password must be the same!")
            }
        }
    }
}]);