'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var theaterCtrlStub = {
  index: 'theaterCtrl.index',
  show: 'theaterCtrl.show',
  create: 'theaterCtrl.create',
  update: 'theaterCtrl.update',
  destroy: 'theaterCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var theaterIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './theater.controller': theaterCtrlStub
});

describe('Theater API Router:', function() {

  it('should return an express router instance', function() {
    expect(theaterIndex).to.equal(routerStub);
  });

  describe('GET /api/theaters', function() {

    it('should route to theater.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'theaterCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/theaters/:id', function() {

    it('should route to theater.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'theaterCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/theaters', function() {

    it('should route to theater.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'theaterCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/theaters/:id', function() {

    it('should route to theater.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'theaterCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/theaters/:id', function() {

    it('should route to theater.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'theaterCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/theaters/:id', function() {

    it('should route to theater.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'theaterCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
