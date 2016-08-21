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
               // console.log(data.message);
            } else {
            }
        })
        .error(function (data, status, headers, config) {
            console.log(status);
        });

    $scope.login = function () {
        $http({
            method : 'POST',
            url: 'http://localhost:3000/login1',
            data: {
                name : $scope.namelogin,
                password : $scope.passlogin
            }
        })
            .success(function (data, status, headers, config) {
                if (data == 'Success'){
                    $scope.islogin = true;
                } else {
                  //  alert(data);
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}]);

function addRowHandlers() {
    var table = document.getElementById("tableShowTrip");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler =
            function(row)
            {
                return function() {
                    var cell = row.getElementsByTagName("td")[0];
                    var id = cell.innerHTML;
                    alert("id:" + id);
                };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}
window.onload = addRowHandlers();