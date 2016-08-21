/**
 * Created by Iffah Nisrina on 8/20/2016.
 */

var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.signup = function () {
        if ($scope.nname == null || $scope.npassword1==null || $scope.npassword2 == null || $scope.nemail==null) {
            alert("Fill form correctly!");
        } else {
            if ($scope.npassword1 == $scope.npassword2) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/api/signup',
                    data: {
                        newname: $scope.nname,
                        newpassword1: $scope.npassword1,
                        newemail:$scope.nemail,
                        newphonenumber:$scope.phonenumber
                    }
                })
                    .success(function (data, status, headers, config) {
                        if (data) {
                            alert("Sign Up Success!");
                            $http({
                                method : 'POST',
                                url: 'http://localhost:3000/api/checklogin',
                                data: {
                                    name : $scope.nname,
                                    password : $scope.npassword1,
                                    email : $scope.nemail,
                                    phonenumber : $scope.nphone
                                }
                            })
                                .success(function (data, status, headers, config) {
                                    if (data == 'Success'){
                                        $scope.islogin = true;
                                        window.location = "http://localhost:3000/login";
                                    } else {
                                        alert(data);
                                    }
                                })
                                .error(function (data, status, headers, config) {
                                    console.log(status);
                                })
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