'use strict';

describe('Component: TheaterComponent', function () {

  // load the controller's module
  beforeEach(module('mera2App'));

  var TheaterComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TheaterComponent = $componentController('theater', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
