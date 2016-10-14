'use strict';

import mongoose from 'mongoose';
import Movie from '../movie/movie.model.js';
var Schema=mongoose.Schema;
var TheaterSchema = new mongoose.Schema({
   	name:String,
   	location:String,
   	city:String,
   	state:String,
   	slot:[{
   		time:String,
   		movie:{ type: Schema.Types.ObjectId, ref: 'Movie'},
   		dateinfo:[{
            ondate:String,
            seats:Array
         }]
   	}]
  
});

export default mongoose.model('Theater', TheaterSchema,'theaters');
/*{ type: Schema.Types.ObjectId, ref: 'Movie' }

*/