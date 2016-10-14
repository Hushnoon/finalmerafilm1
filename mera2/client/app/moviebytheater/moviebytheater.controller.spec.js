'use strict';

describe('Component: MoviebytheaterComponent', function () {

  // load the controller's module
  beforeEach(module('mera2App'));

  var MoviebytheaterComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MoviebytheaterComponent = $componentController('moviebytheater', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
