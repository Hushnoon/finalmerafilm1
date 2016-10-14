/**
 * Rating model events
 */

'use strict';

import {EventEmitter} from 'events';
import Rating from './rating.model';
var RatingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RatingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rating.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RatingEvents.emit(event + ':' + doc._id, doc);
    RatingEvents.emit(event, doc);
  }
}

export default RatingEvents;
