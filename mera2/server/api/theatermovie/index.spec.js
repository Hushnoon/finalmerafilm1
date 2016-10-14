'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var theatermovieCtrlStub = {
  index: 'theatermovieCtrl.index',
  show: 'theatermovieCtrl.show',
  create: 'theatermovieCtrl.create',
  update: 'theatermovieCtrl.update',
  destroy: 'theatermovieCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var theatermovieIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './theatermovie.controller': theatermovieCtrlStub
});

describe('Theatermovie API Router:', function() {

  it('should return an express router instance', function() {
    expect(theatermovieIndex).to.equal(routerStub);
  });

  describe('GET /api/theatermovies', function() {

    it('should route to theatermovie.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'theatermovieCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/theatermovies/:id', function() {

    it('should route to theatermovie.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'theatermovieCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/theatermovies', function() {

    it('should route to theatermovie.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'theatermovieCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/theatermovies/:id', function() {

    it('should route to theatermovie.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'theatermovieCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/theatermovies/:id', function() {

    it('should route to theatermovie.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'theatermovieCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/theatermovies/:id', function() {

    it('should route to theatermovie.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'theatermovieCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
