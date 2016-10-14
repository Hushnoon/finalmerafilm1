'use strict';

import mongoose from 'mongoose';

var StateSchema = new mongoose.Schema({
  state:String,
  city:Array
});

export default mongoose.model('State', StateSchema,'States');

