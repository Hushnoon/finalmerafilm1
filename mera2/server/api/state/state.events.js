/**
 * State model events
 */

'use strict';

import {EventEmitter} from 'events';
import State from './state.model';
var StateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StateEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  State.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StateEvents.emit(event + ':' + doc._id, doc);
    StateEvents.emit(event, doc);
  }
}

export default StateEvents;
