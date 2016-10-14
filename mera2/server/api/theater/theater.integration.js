'use strict';

var app = require('../..');
import request from 'supertest';

var newTheater;

describe('Theater API:', function() {

  describe('GET /api/theaters', function() {
    var theaters;

    beforeEach(function(done) {
      request(app)
        .get('/api/theaters')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theaters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(theaters).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/theaters', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/theaters')
        .send({
          name: 'New Theater',
          info: 'This is the brand new theater!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTheater = res.body;
          done();
        });
    });

    it('should respond with the newly created theater', function() {
      expect(newTheater.name).to.equal('New Theater');
      expect(newTheater.info).to.equal('This is the brand new theater!!!');
    });

  });

  describe('GET /api/theaters/:id', function() {
    var theater;

    beforeEach(function(done) {
      request(app)
        .get('/api/theaters/' + newTheater._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theater = res.body;
          done();
        });
    });

    afterEach(function() {
      theater = {};
    });

    it('should respond with the requested theater', function() {
      expect(theater.name).to.equal('New Theater');
      expect(theater.info).to.equal('This is the brand new theater!!!');
    });

  });

  describe('PUT /api/theaters/:id', function() {
    var updatedTheater;

    beforeEach(function(done) {
      request(app)
        .put('/api/theaters/' + newTheater._id)
        .send({
          name: 'Updated Theater',
          info: 'This is the updated theater!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTheater = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTheater = {};
    });

    it('should respond with the updated theater', function() {
      expect(updatedTheater.name).to.equal('Updated Theater');
      expect(updatedTheater.info).to.equal('This is the updated theater!!!');
    });

  });

  describe('DELETE /api/theaters/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/theaters/' + newTheater._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when theater does not exist', function(done) {
      request(app)
        .delete('/api/theaters/' + newTheater._id)
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
