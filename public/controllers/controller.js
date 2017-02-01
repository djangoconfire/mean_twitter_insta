'use strict'

angular
	.module('app',[])
	.controller('AppCtrl',function($scope,$http){
		$scope.search=function(){
			var query=$scope.hashtag;
			$http.get('/search/tweets/' + query).then(successCallback)

			function successCallback(response){
				$scope.tweets=response.data

			}
		}
	})