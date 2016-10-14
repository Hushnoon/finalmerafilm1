'use strict';

(function(){

class PaymentComponent {
  constructor($http,$scope,$rootScope,socket,$routeParams,$window,$location) { 
      this.$http = $http;
      this.socket = socket;
      this.$routeParams = $routeParams;
      this.bookingThings=[];
      this.finalThings=[];
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('movie');
      });
  }
  $onInit() {
  	 this.$http.get('/api/bookings/')
        .then(response => {
          this.bookingThings= response.data;
          this.socket.syncUpdates('booking',this.bookingThings);
	        for(var i=0;i<this.bookingThings.length;i++)
	        {
	        	if(this.bookingThings[i].emailid===this.$routeParams.eid&&this.bookingThings[i].bookingdate===this.$routeParams.date)
	        	{
	        		this.finalThings=this.bookingThings[i];	
	        	}
	        }
        });
  }
}

angular.module('mera2App')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent
  });

})();
