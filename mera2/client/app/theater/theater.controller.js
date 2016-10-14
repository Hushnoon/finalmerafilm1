'use strict';

(  function(){

class TheaterComponent {
  constructor($http, $scope, socket) {
      this.$http = $http; 
      this.socket = socket;
      this.movieThings=[]; 
      this.theaterThings=[];
      this.update=true;
      this.stateThings=[];
      this.cityThings=[];
      this.showData=false;
      $scope.$on('$destroy', function() {
         socket.unsyncUpdates('state');
         socket.unsyncUpdates('theater');
         //socket.unsyncUpdates('movie');
        
       });
  }
  $onInit() {
    this.$http.get('/api/states')
        .then(response => {
          this.stateThings= response.data;
          this.socket.syncUpdates('state',this.stateThings);
        
        });
    this.$http.get('/api/theaters')
        .then(response => {
          this.theaterThings = response.data;
          this.socket.syncUpdates('theater',this.theaterThings);
        
        });
     this.$http.get('/api/movies')
        .then(response => {
          this.movieThings = response.data;
          this.socket.syncUpdates('movie', this.movieThings);
        });
      
    }
    //Omdb code
    getData() 
    {
      this.$http.get('http://www.omdbapi.com/?t='+this.Title+'&y='+this.Year+'&plot=short&r=json')
     .then(response => {
      this.movieData = response.data;
      if(this.movieData.Response==="True")
      {
        this.showData=true;
      }
      else
      {
        this.showData=false;
        $.alert.open('Movie not found');
      }
      console.log(this.movieData);
      });
      
    } 
    //delete movie code
    deleteThing(movie) {
      console.log("i callled:deleteThing")
      this.$http.delete('/api/movies/' + movie._id);
    }
    //movie add code
    addMovie() {
     if (this.movieData) {
       this.$http.post('/api/movies',
         JSON.stringify(this.movieData)
       );
       this.showData=false;
      
     }
    }

    //Add new theater
    addTheater() {
      console.log('Started');
      var dates = [];

      // define the interval of your dates 
      var currentDate = new Date(this.stdt);
      var endDate = new Date(this.enddt);
      console.log(currentDate); 
      // create a loop between the interval
      while (currentDate <= endDate)
      {  
         // add on array
         dates.push({ondate:currentDate.toDateString(),seats:null});
         // add one day
         currentDate.setDate(currentDate.getDate()+1);
      }
      console.log(dates);
     
      var slot1={time:this.slot,movie:this.selectedMovie,dateinfo:dates}; 
      var data= {
        name:this.name,
        location:this.location,
        city:this.selectedCity,
        state:this.selectedState.state,
        slot:slot1
      };
     
      this.$http.post('/api/theaters',angular.toJson(data));
      this.$http.get('/api/theaters')
        .then(response => {
          this.theaterThings = response.data;
          this.socket.syncUpdates('theater',this.theaterThings);
        
        });

  }

  //Assign movies to show timings
  addMovieSlot()
  {
    var dates = [];
    var flag=0;
    // define the interval of your dates
    var currentDate = new Date(this.stdt1);
    var endDate = new Date(this.enddt1);
    console.log(currentDate);
    // create a loop between the interval
    while (currentDate <= endDate)
    {  
       // add on array
       dates.push({ondate:currentDate.toDateString(),seats:null});
       // add one day
       currentDate.setDate(currentDate.getDate()+1);
    }
    var slot2={time:this.slot1,movie:this.selectedMovie1,dateinfo:dates}; 
    for(var i=0;i<this.selectedTheater1.slot.length;i++)
    {
      if(this.slot1===this.selectedTheater1.slot[i].time)
      {
        flag++;
        break;
      }
      //console.log(this.selectedTheater1.slot[i].time);X
    }
    if(flag==0)
    {
      this.selectedTheater1.slot.push(slot2);
      this.$http.put('/api/theaters/'+this.selectedTheater1._id,this.selectedTheater1);
      this.$http.get('/api/theaters')
        .then(response => {
          this.theaterThings = response.data;
          this.socket.syncUpdates('theater',this.theaterThings);
        
        });
      this.$http.get('/api/movies')
        .then(response => {
          this.movieThings = response.data;
          this.socket.syncUpdates('movie', this.movieThings);
        });
    }
    else
    {
      $.alert.open('The slot is occupied');
    }
  }

  //Delete a particular movie slot from theater collection
  deleteMovie(t,s)
  {
   this.$http.delete('/api/theaters/'+t+'/slot/'+s);
   this.$http.get('/api/theaters')
        .then(response => {
          this.theaterThings = response.data;
          this.socket.syncUpdates('theater',this.theaterThings);
        
        });
  }
  //Delete a theater
  deleteTheater(t)
  {
    this.$http.delete('/api/theaters/'+t._id);
  }

  setStartDate()
  {  
    this.stdt=new Date(this.selectedMovie.Released);
  }
  setStartDate1()
  {
    this.stdt1=new Date(this.selectedMovie1.Released);
  } 

}

angular.module('mera2App')
  .component('theater', {
    templateUrl: 'app/theater/theater.html',
    controller: TheaterComponent
  });

})();