'use strict';

describe('Component: MovieshowComponent', function () {

  // load the controller's module
  beforeEach(module('mera2App'));

  var MovieshowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MovieshowComponent = $componentController('movieshow', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
