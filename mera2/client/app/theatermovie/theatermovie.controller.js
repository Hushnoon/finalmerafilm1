'use strict';

(function(){

class TheatermovieComponent {
  constructor($http, $scope,$rootScope, socket) {
      this.dates = [];
      this.$http = $http;
      this.socket = socket;
      this.selectedDate='';
      this.theaterThings=[];
      this.finalTheaters=[]; 
      this.$rootScope=$rootScope;
      this.selectedRegion=this.$rootScope.selectedRegion;
      $scope.$on('$destroy', function() {
         socket.unsyncUpdates('theater');
         socket.unsyncUpdates('movie');
         //socket.unsyncUpdates('theatermovie');
       });
  } 
  $onInit() {
    console.log(this.selectedRegion);
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
  }
  setDate(dt)
  {
    this.selectedDate=dt;
    console.log(this.selectedDate);
  }
}
angular.module('mera2App')
  .component('theatermovie', {
    templateUrl: 'app/theatermovie/theatermovie.html',
    controller: TheatermovieComponent
  });

})();
