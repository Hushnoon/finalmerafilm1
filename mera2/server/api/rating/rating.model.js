'use strict';

import mongoose from 'mongoose';

var RatingSchema = new mongoose.Schema({
  moviename:String,
  year:String,
  usersrating:[{
  	name:String,
  	email:String,
  	date:String,
  	rate:Number,
  	review:String
  }]
});

export default mongoose.model('Rating', RatingSchema);
 