'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ratingCtrlStub = {
  index: 'ratingCtrl.index',
  show: 'ratingCtrl.show',
  create: 'ratingCtrl.create',
  update: 'ratingCtrl.update',
  destroy: 'ratingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ratingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './rating.controller': ratingCtrlStub
});

describe('Rating API Router:', function() {

  it('should return an express router instance', function() {
    expect(ratingIndex).to.equal(routerStub);
  });

  describe('GET /api/ratings', function() {

    it('should route to rating.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ratingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/ratings/:id', function() {

    it('should route to rating.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ratingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/ratings', function() {

    it('should route to rating.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ratingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/ratings/:id', function() {

    it('should route to rating.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ratingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ratings/:id', function() {

    it('should route to rating.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ratingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ratings/:id', function() {

    it('should route to rating.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ratingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
