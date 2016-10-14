/**
 * Theatermovie model events
 */

'use strict';

import {EventEmitter} from 'events';
import Theatermovie from './theatermovie.model';
var TheatermovieEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TheatermovieEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Theatermovie.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TheatermovieEvents.emit(event + ':' + doc._id, doc);
    TheatermovieEvents.emit(event, doc);
  }
}

export default TheatermovieEvents;
