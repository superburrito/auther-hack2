'use strict';

app.controller('UserListCtrl', function ($scope, users, User, $rootScope) {
  if($rootScope.currentUser !== null && $rootScope.currentUser !== ""){
    $scope.users = users;
  }else{
    $scope.users = null;
  }

  $scope.addUser = function () {
    if($rootScope.currentUser.isAdmin){
      console.log("Admin trying to add");
      $scope.userAdd.save()
      .then(function (user) {
        console.log("PRomise is", user);
        $scope.userAdd = new User();
        $scope.users.unshift(user);
      });
    }
  };

  $scope.userSearch = new User();

  $scope.userAdd = new User();
});
