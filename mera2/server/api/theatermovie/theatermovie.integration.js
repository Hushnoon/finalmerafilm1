'use strict';

var app = require('../..');
import request from 'supertest';

var newTheatermovie;

describe('Theatermovie API:', function() {

  describe('GET /api/theatermovies', function() {
    var theatermovies;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatermovies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatermovies = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(theatermovies).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/theatermovies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/theatermovies')
        .send({
          name: 'New Theatermovie',
          info: 'This is the brand new theatermovie!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTheatermovie = res.body;
          done();
        });
    });

    it('should respond with the newly created theatermovie', function() {
      expect(newTheatermovie.name).to.equal('New Theatermovie');
      expect(newTheatermovie.info).to.equal('This is the brand new theatermovie!!!');
    });

  });

  describe('GET /api/theatermovies/:id', function() {
    var theatermovie;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatermovies/' + newTheatermovie._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatermovie = res.body;
          done();
        });
    });

    afterEach(function() {
      theatermovie = {};
    });

    it('should respond with the requested theatermovie', function() {
      expect(theatermovie.name).to.equal('New Theatermovie');
      expect(theatermovie.info).to.equal('This is the brand new theatermovie!!!');
    });

  });

  describe('PUT /api/theatermovies/:id', function() {
    var updatedTheatermovie;

    beforeEach(function(done) {
      request(app)
        .put('/api/theatermovies/' + newTheatermovie._id)
        .send({
          name: 'Updated Theatermovie',
          info: 'This is the updated theatermovie!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTheatermovie = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTheatermovie = {};
    });

    it('should respond with the updated theatermovie', function() {
      expect(updatedTheatermovie.name).to.equal('Updated Theatermovie');
      expect(updatedTheatermovie.info).to.equal('This is the updated theatermovie!!!');
    });

  });

  describe('DELETE /api/theatermovies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/theatermovies/' + newTheatermovie._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when theatermovie does not exist', function(done) {
      request(app)
        .delete('/api/theatermovies/' + newTheatermovie._id)
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
