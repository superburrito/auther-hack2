'use strict';

app.controller('StoryListCtrl', function ($rootScope, $scope, stories, Story, users) {
  if($rootScope.currentUser !== null && $rootScope.currentUser !== ""){
    $scope.stories = stories;
    $scope.users = users;
  }

  $scope.newStory = new Story();
  
  $scope.removeStory = function (story) {
    if($rootScope.currentUser.isAdmin || $rootScope.currentUser == story.author){
      story.destroy()
      .then(function () {
        var idx = $scope.stories.indexOf(story);
        $scope.stories.splice(idx, 1);
      });
    }
  };

  $scope.addStory = function () {
    if($rootScope.currentUser.isAdmin || $rootScope.currentUser == story.author){
      $scope.newStory.save()
      .then(function (created) {
        // created.author = $scope.newStory.author;
        $scope.newStory = new Story();
        $scope.stories.unshift(created);
      });
    }
  };
  
});
