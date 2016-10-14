'use strict';

import mongoose from 'mongoose';

var BookingSchema = new mongoose.Schema({
  name: String,
  emailid: String,
  contact:String,
  bookingdate:String,
  transactiondate:String,
  transactiontype:String,
  theatername:String,
  moviename:String,
  slot:String,
  seats:Array,
  total:Number 
});

export default mongoose.model('Booking', BookingSchema);
