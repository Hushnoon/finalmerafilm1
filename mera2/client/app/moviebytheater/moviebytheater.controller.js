'use strict';

(function(){

class MoviebytheaterComponent {
  constructor($http, $scope,$rootScope, socket,$routeParams) {
      this.$http = $http;
      this.socket = socket; 
      this.$routeParams = $routeParams;
      this.movieThings=[];
      this.theaterThings=[];
      this.finalTheaters=[];
      this.dates = [];
      this.selectedDate='';
      this.data=[];
      this.ratingThings=[];
      this.$rootScope=$rootScope;
      this.selectedRegion=this.$rootScope.selectedRegion;
      $scope.$on('$destroy', function() {
         socket.unsyncUpdates('theater');
         socket.unsyncUpdates('movie');

       });
  } 
   $onInit() {
    console.log(this.selectedRegion);
    this.$http.get('/api/movies/'+this.$routeParams.id)
        .then(response => {
          this.movieThings = response.data;
          this.socket.syncUpdates('movie', this.movieThings);
                   
      });
    this.$http.get('/api/theaters')
        .then(response => {
          this.finalTheaters = response.data;
          this.socket.syncUpdates('theater', this.theaterThings);
           for(var i=0;i<this.finalTheaters.length;i++)
           {
            if(this.finalTheaters[i].city===this.selectedRegion)
            {
              this.theaterThings.push(this.finalTheaters[i]);
            }
           }       
           console.log(this.theaterThings); 
      });
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
        var ratesum=0;
        for(var j=0;j<this.data.usersrating.length;j++)
        {
          ratesum=ratesum+this.data.usersrating[j].rate;
        }
        this.rate=Math.round(ratesum/this.data.usersrating.length);
      });
      //Logic to create array of next 3
      var i=1;
      var currentDate = new Date();
      this.selectedDate=currentDate.toDateString();
      while (i<=3)
      {  
         // add on array
         this.dates.push({date:currentDate.toDateString()});
         // add one day
         currentDate.setDate(currentDate.getDate()+1);
         i++;
      }
      var currentTime = new Date()
      var hours = currentTime.getHours()
      var minutes = currentTime.getMinutes()

      if (minutes < 10)
      minutes = "0" + minutes

      var suffix = "AM";
      if (hours >= 12) {
      suffix = "PM";
      hours = hours - 12;
      }
      if (hours == 0) {
      hours = 12;
      }

      var currentTimeStr='<b>=' + hours + ':' + minutes + ' '  + suffix + '</b>'

    }
    setDate(dt)
    {
      this.selectedDate=dt;
      console.log(this.selectedDate);
    }
    viewTrailer(movieName)
    {
      this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+movieName+'trailer&key=AIzaSyDhoRwEX4ugfvVkDdhyQobjupOuANN2pyc')
      .then(response => {

        var trailer_id=response.data.items[0].id.videoId;
        console.log('trailer_id'+trailer_id);
        var trailer='https://www.youtube.com/embed/'+trailer_id;
        document.getElementById('player').setAttribute("src",trailer);
        console.log('trailer');
        $("#myModal").modal('show');
      });
      
    }
}

angular.module('mera2App')
  .component('moviebytheater', {
    templateUrl: 'app/moviebytheater/moviebytheater.html',
    controller: MoviebytheaterComponent
  });

})();
