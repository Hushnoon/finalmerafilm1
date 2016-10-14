'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bookingCtrlStub = {
  index: 'bookingCtrl.index',
  show: 'bookingCtrl.show',
  create: 'bookingCtrl.create',
  update: 'bookingCtrl.update',
  destroy: 'bookingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bookingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './booking.controller': bookingCtrlStub
});

describe('Booking API Router:', function() {

  it('should return an express router instance', function() {
    expect(bookingIndex).to.equal(routerStub);
  });

  describe('GET /api/bookings', function() {

    it('should route to booking.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'bookingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/bookings/:id', function() {

    it('should route to booking.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'bookingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/bookings', function() {

    it('should route to booking.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'bookingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/bookings/:id', function() {

    it('should route to booking.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'bookingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bookings/:id', function() {

    it('should route to booking.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'bookingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bookings/:id', function() {

    it('should route to booking.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'bookingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
