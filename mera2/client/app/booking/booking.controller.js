'use strict'; 

(function(){

class BookingComponent {
 constructor($http,$scope,$rootScope,socket,$routeParams,$window,$location) { 
      this.$http = $http;
      this.socket = socket;
      this.$routeParams = $routeParams;
      this.movieThings = []; 
      this.theaterThings = [];
      this.$window=$window;
      this.$location = $location;
      this.$rootScope=$rootScope;
      this.seats=[];
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('movie');
      });
  }
  $onInit() {
    var letters=['A','B','C','D','E','F','G','H','I'];
    var str='<tr><td colspan=2><center style="color:Green">ROYAL CLASS Rs.300</center></td></tr>';
    var seatno=0;
    var className='';
    var clickbody='';
    this.$http.get('/api/theaters/'+this.$routeParams.tid)
      .then(response => {
        this.theaterThings = response.data;
          this.socket.syncUpdates('theater', this.theaterThings);
          for(var i=0;i<this.theaterThings.slot.length;i++)
          {
            if(this.theaterThings.slot[i]._id==this.$routeParams.sid)
            {
              this.movieThings= this.theaterThings.slot[i].movie;
              for (var j=0; j<this.theaterThings.slot[i].dateinfo.length; j++) {
                console.log('date1');
                if(this.theaterThings.slot[i].dateinfo[j].ondate===this.$routeParams.showdt)
                {
                  console.log('date2');
                  this.seats=this.theaterThings.slot[i].dateinfo[j].seats;
                }
              } 
              console.log(this.seats);
            }
          }  
          for(var r=0;r<letters.length;r++)
          {

            str+='<center><tr class="seat"><td>'+letters[r]+'</td><td><ul class="list-inline">';
            for(var i=1;i<=14;i++)
            {
              seatno++;
              //console.log(seatno);
              console.log(seatno+''+$.inArray(seatno,this.seats));
              if($.inArray(seatno,this.seats)!=-1)
              {
                className='booked';
                clickbody='return false;';
              }
              else
              {
                className='available';
                clickbody='bookSeat('+seatno+')';
              }
              console.log(className);
              if(i<10)
              {
                 str+='<li><a id="'+seatno+'" class="'+className+'" onclick="'+clickbody+'">&nbsp;'+i+'&nbsp;</a></li>';
              }
              else
              {
                 str+='<li><a id="'+seatno+'" class="'+className+'" onclick="'+clickbody+'">'+i+'</a></li>';
              }
             
                if(i===4||i===10)
                {
                  str+='<li>&nbsp;&nbsp;&nbsp;</li>'; 
                }
            }
            str+='</ul></td></tr><center>';
            if(r===2)
            {
              str+='<tr><td colspan=2 style="color:Green"><center>EXECUTIVE Rs.150</center></td></tr>';
            }//
          } 
          $('#seatplan').html(str);     
        });
 
 
  //console.log(str);
   
 } 
 
  book(type)
  {
    console.log(this.name);
    console.log(this.email1);
    console.log(this.contact);
    if(this.name!=undefined&&this.email1!=undefined&&this.contact!=undefined&&this.$window.selectedSeats.length!=0)
    {
      if(this.$window.selectedSeats.length===0)
      {
        $.alert.open('Select your seats!!!');
      }
      else
      {
        for(var i=0;i<this.theaterThings.slot.length;i++)
        {
          if(this.theaterThings.slot[i]._id==this.$routeParams.sid)
          {
            this.movieThings= this.theaterThings.slot[i].movie;
            for (var j=0; j<this.theaterThings.slot[i].dateinfo.length; j++) {
              console.log('date1');
              if(this.theaterThings.slot[i].dateinfo[j].ondate===this.$routeParams.showdt)
              {
                console.log('date2');
                if(this.theaterThings.slot[i].dateinfo[j].seats===null)
                  this.theaterThings.slot[i].dateinfo[j].seats=this.$window.selectedSeats;
                else
                  this.theaterThings.slot[i].dateinfo[j].seats.push(this.$window.selectedSeats);
                console.log(this.theaterThings.slot[i].dateinfo[j].seats);
              }

            } 
          }
        }
        var bookingdata={ 
          name:this.name,
          emailid: this.email,
          contact:this.contact,
          bookingdate:this.$routeParams.showdt,
          transactiondate:new Date().toDateString(),
          transactiontype:type,
          theatername:this.theaterThings.name,
          moviename:this.movieThings.Title,
          slot:this.$routeParams.showtime,
          seats:this.$window.selectedSeats,
          total:this.$window.total 
        }
        console.log(bookingdata.seats);
        this.$http.put('/api/theaters/'+this.$routeParams.tid,this.theaterThings);
        this.$http.post('/api/bookings',angular.toJson(bookingdata))
        .then(() => {
            this.$location.path('/success/this.email/this.$routeParams.showdt');
        });
      }
    }
    else
    {
      $.alert.open('Data is incompelete!!!Try again');
    }    
  }
}

angular.module('mera2App')
  .component('booking', {
    templateUrl: 'app/booking/booking.html',
    controller: BookingComponent
  });

})();
