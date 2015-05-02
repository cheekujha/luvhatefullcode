(function(window, angular){
	angular.module('searchListItem').controller('searchListItemCtrl', searchListItemCtrl);

	searchListItemCtrl.$inject = ['$scope'];

	function searchListItemCtrl($scope){
		var vm = this;
		function init(){
			initMethods();
		}

		function initMethods(){

		}

		init();
	}
}(window, angular));