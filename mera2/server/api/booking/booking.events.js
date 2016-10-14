/**
 * Booking model events
 */

'use strict';

import {EventEmitter} from 'events';
import Booking from './booking.model';
var BookingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Booking.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BookingEvents.emit(event + ':' + doc._id, doc);
    BookingEvents.emit(event, doc);
  }
}

export default BookingEvents;
