'use strict';

var app = require('../..');
import request from 'supertest';

var newState;

describe('State API:', function() {

  describe('GET /api/states', function() {
    var states;

    beforeEach(function(done) {
      request(app)
        .get('/api/states')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          states = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(states).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/states', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/states')
        .send({
          name: 'New State',
          info: 'This is the brand new state!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newState = res.body;
          done();
        });
    });

    it('should respond with the newly created state', function() {
      expect(newState.name).to.equal('New State');
      expect(newState.info).to.equal('This is the brand new state!!!');
    });

  });

  describe('GET /api/states/:id', function() {
    var state;

    beforeEach(function(done) {
      request(app)
        .get('/api/states/' + newState._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          state = res.body;
          done();
        });
    });

    afterEach(function() {
      state = {};
    });

    it('should respond with the requested state', function() {
      expect(state.name).to.equal('New State');
      expect(state.info).to.equal('This is the brand new state!!!');
    });

  });

  describe('PUT /api/states/:id', function() {
    var updatedState;

    beforeEach(function(done) {
      request(app)
        .put('/api/states/' + newState._id)
        .send({
          name: 'Updated State',
          info: 'This is the updated state!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedState = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedState = {};
    });

    it('should respond with the updated state', function() {
      expect(updatedState.name).to.equal('Updated State');
      expect(updatedState.info).to.equal('This is the updated state!!!');
    });

  });

  describe('DELETE /api/states/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/states/' + newState._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when state does not exist', function(done) {
      request(app)
        .delete('/api/states/' + newState._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
