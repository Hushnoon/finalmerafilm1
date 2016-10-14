/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/theaters              ->  index
 * POST    /api/theaters              ->  create
 * GET     /api/theaters/:id          ->  show
 * PUT     /api/theaters/:id          ->  update
 * DELETE  /api/theaters/:id          ->  destroy
 */

'use strict';
 
import _ from 'lodash';
import Theater from './theater.model';
import Movie from '../movie/movie.model.js';
import mongoose from 'mongoose';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Theaters
export function index(req, res) {
    return Theater.find().populate('slot.movie').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Theater from the DB
export function show(req, res) {
  return Theater.findById(req.params.id).populate('slot.movie').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function create(req, res) {
   console.log(req.body.slot.dateinfo);
   return Theater.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Theater in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Theater.findById(req.params.id).exec() 
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//Update Seats
export function updateSeats(req, res) {
  console.log("updateseats");
 return Theater.find({_id:req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(function(res){
        res.slot.id(req.params.sid);
        console.log(res);
        //res.save();
      })
    .catch(handleError(res));
}
// Deletes a Theater from the DB
export function destroy(req, res) {
  return Theater.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function destroySlot(req, res) {
  //console.log("destroySlot called");
  //console.log(req.params.sid);
  return Theater.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(function(res){
        res.slot.id(req.params.sid).remove();
        //console.log(res);
        res.save();
      })
    .catch(handleError(res));
}