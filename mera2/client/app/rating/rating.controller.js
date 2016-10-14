'use strict';

(function(){

class RatingComponent {
  constructor($http, $scope, socket,$routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.socket = socket;
    this.ratingThings=[];
    this.data=[];
    this.rate=0;
    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('rating');
    });
  }
  $onInit() {
  	this.$http.get('/api/ratings/')
      .then(response => {
        this.ratingThings = response.data;
        this.socket.syncUpdates('rating', this.ratingThings);
        for(var i=0; i<this.ratingThings.length;i++)
        {
        	if(this.ratingThings[i].moviename===this.$routeParams.title&&this.ratingThings[i].year===this.$routeParams.year)
        	{
        		this.data=this.ratingThings[i];
        	}
        }
        console.log(this.data);
      });
  }
  rate1(v)
  {
  	this.rate=v;
  }
  add()
  {
  	var users={
  		name:this.name,
	  	email:this.email,
	  	date:new Date().toDateString(),
	  	rate:this.rate,
	  	review:this.review
  	}
  	console.log(this.data);
  	if(this.data.length===0)
  	{
  		var data={
  			moviename:this.$routeParams.title,
  			year:this.$routeParams.year,
  			usersrating:users	
  		}
  		console.log('if::data::'+ data);
  		this.$http.post('/api/ratings/',angular.toJson(data));
  	}
  	else
  	{

  		this.data.usersrating.push(users);
  		this.$http.put('/api/ratings/'+this.data._id,angular.toJson(this.data));
  	}
  	this.name=this.email=this.review="";
  }
}

angular.module('mera2App')
  .component('rating', {
    templateUrl: 'app/rating/rating.html',
    controller: RatingComponent
  });

})();
 