(function(window, angular){
	window.APPNAME = "luvhate";
	angular.module(window.APPNAME,[
		'mobile-angular-ui',
		'ui.router',
		'common',
		'facebook',
		'login',
		'userProfile',
		'peopleSearch',
		'searchListItem'
	]);

	angular.module(window.APPNAME).config(function($stateProvider, $urlRouterProvider) {
	  //
	  // For any unmatched url, redirect to /state1
	  $urlRouterProvider.otherwise("/home");
	  //
	  // Now set up the states
	  $stateProvider
	  	.state('home', {
	  		url : '/home',
	  		template : '<div ui-view class="router-view"></div>',
	  		controller : 'mainCtrl',
	  		controllerAs : 'vm'
	  	})
	    .state('home.login', {
	      templateUrl: 'js/modules/login/partials/Login.html',
	      controller : 'loginCtrl',
	      controllerAs : 'vm'
	    })
	    .state('home.profile', {
	    	url : '/profile',
	    	templateUrl : 'js/modules/user-profile/partials/UserProfile.html',
	    	controller : 'userProfileCtrl',
	    	controllerAs : 'vm'
	    })
	    .state('home.search', {
	    	templateUrl : 'js/modules/people-search/partials/PeopleSearch.html',
	    	url : '/search',
	    	controller : 'peopleSearchCtrl',
	    	controllerAs : 'vm'
	    });
	});
}(window, angular));