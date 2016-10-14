'use strict';

import mongoose from 'mongoose';
import Movie from '../movie/movie.model.js';
import Theater from '../theater/theater.model.js';
var Schema=mongoose.Schema;

var TheatermovieSchema = new mongoose.Schema({
	//_id :Schema.ObjectId,
    slot :String,
    theaterid:{ type: Schema.Types.ObjectId, ref: 'Theater' },
    movieid :{ type: Schema.Types.ObjectId, ref: 'Movie' },
    Live:String
});
export default mongoose.model('Theatermovie', TheatermovieSchema,'TheaterMovieMaps');
