/**
 * Theater model events
 */

'use strict';

import {EventEmitter} from 'events';
import Theater from './theater.model';
var TheaterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TheaterEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Theater.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TheaterEvents.emit(event + ':' + doc._id, doc);
    TheaterEvents.emit(event, doc);
  }
}

export default TheaterEvents;
