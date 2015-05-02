(function(window, angular){
	angular.module('searchListItem').directive('searchListItem', searchListItem);

	searchListItem.$inject = [];

	function searchListItem(){
		return {
			restrict : 'E',
			scope : {
				profile : '=',
			},
			templateUrl : 'js/modules/search-list-item/partials/SearchListItem.html',
			controller : 'searchListItemCtrl',
			controllerAs : 'vm',
			link : function(scope, element, attrs, ctrl){
				ctrl.profile = scope.profile;
			}
		}
	}
}(window, angular));