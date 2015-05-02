(function(window, angular){
	angular.module('peopleSearch').controller('peopleSearchCtrl', peopleSearchCtrl);

	peopleSearchCtrl.$inject = ['$scope', 'peopleSearchFactory', 'friendSearchFactory'];

	function peopleSearchCtrl($scope, peopleSearchFactory, friendSearchFactory){
		var vm = this;
		function init(){
			vm.peopleList = [];
			vm.showLoadMoreButton = false;
			vm.friendList = [];
			vm.friendListLoaded = false;
			initMethods();
		};

		function initMethods(){
			vm.searhclicked = searhclicked;
			vm.loadMoreClicked = loadMoreClicked;
			vm.getFriendList = getFriendList;
			vm.loadMoreFriendClicked = loadMoreFriendClicked;
		};
		init();

		function searhclicked(searchText){
			if(searchText && searchText.trim().length > 0){
				peopleSearchFactory.search(searchText,'user').then(function(list){
					peopleSearchSuccess(list, true);
				}, peopleSearchError);
			}
		};

		function peopleSearchSuccess(list, emptyList){
			console.log("searchSuccess",list);
			if(list.length > 0){
				vm.showLoadMoreButton = true;
			}else{
				vm.showLoadMoreButton = false;
			}
			if(emptyList){
				vm.peopleList = [];
			}
			var oldList = vm.peopleList;
			var newList = oldList.concat(list);
			vm.peopleList = newList;
		};

		function peopleSearchError(){
			console.error("searchError");
		};

		function loadMoreClicked(){
			peopleSearchFactory.nextSearch().then(function(list){
					peopleSearchSuccess(list, false);
				}, peopleSearchError);
		};

		function getFriendList(){
			if(!vm.friendListLoaded){
				friendSearchFactory.search().then(friendSearchSuccess, friendSearchError);	
			}		
		};

		function friendSearchSuccess(list){
			if(list.length > 0){
				vm.showFriendLoadMoreButton = true;
			}else{
				vm.showFriendLoadMoreButton = false;
			}
			var oldList = vm.friendList;
			var newList = oldList.concat(list);
			vm.friendList = newList;
			vm.friendListLoaded = true;
		};

		function friendSearchError(response){
			console.log("friendSearchError",response);
		};

		function loadMoreFriendClicked(){
			friendSearchFactory.nextSearch().then(friendSearchSuccess, friendSearchError);
		}
	}
}(window, angular));