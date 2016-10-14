'use strict';

(function(){

class MovieshowComponent {
   constructor($http, $scope,$rootScope,socket) {
      this.$http = $http;
      this.socket = socket;
      this.movieThings = [];
      this.stateThings=[];
      this.$rootScope=$rootScope;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('movie');
      });
  }

  $onInit() {
      console.log(this.$rootScope.selectedRegion);
      if(this.$rootScope.selectedRegion===undefined)
      {
        $("#myModal").modal('show');
      }
      this.$http.get('/api/states')
        .then(response => {
          this.stateThings= response.data;
          this.socket.syncUpdates('state',this.stateThings);
        
        });
        this.$http.get('/api/theaters')
        .then(response => {
          this.theaterThings = response.data;
          this.socket.syncUpdates('theater',this.theaterThings);
          if(this.$rootScope.selectedRegion!=undefined)
          {
            console.log('m gone');
             var flag=0;
    for (var i=0;i<this.theaterThings.length;i++)
    {   

      for(var j=0;j<this.theaterThings[i].slot.length;j++)
      {
        flag=0;
        if(this.theaterThings[i].city===this.$rootScope.selectedRegion)
        {
          for(var k=0;k<this.movieThings.length;k++)
          {
            if(this.movieThings[k]._id===this.theaterThings[i].slot[j].movie._id)
            {   
              flag++;  
              break;    
            }         
          }
          if(flag===0)
          {
            this.movieThings.push(this.theaterThings[i].slot[j].movie);
          }
        }
      }
    }
          }
        });
      
    }

  setLocation()
  {
    this.$rootScope.selectedRegion=this.selectedCity;
    $("#myModal").modal('hide');
    this.displayMovie();
  }
  displayMovie()
  {
    var flag=0;
    for (var i=0;i<this.theaterThings.length;i++)
    {   

      for(var j=0;j<this.theaterThings[i].slot.length;j++)
      {
        flag=0;
        if(this.theaterThings[i].city===this.selectedCity)
        {
          for(var k=0;k<this.movieThings.length;k++)
          {
            if(this.movieThings[k]._id===this.theaterThings[i].slot[j].movie._id)
            {   
              flag++;  
              break;    
            }         
          }
          if(flag===0)
          {
            this.movieThings.push(this.theaterThings[i].slot[j].movie);
          }
        }
      }
    }
  }
}

angular.module('mera2App')
  .component('movieshow', {
    templateUrl: 'app/movieshow/movieshow.html',
    	controller: MovieshowComponent
   // controllerAs: Movieshow
  });

})();
