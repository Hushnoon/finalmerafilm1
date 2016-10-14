'use strict';

describe('Component: TheatermovieComponent', function () {

  // load the controller's module
  beforeEach(module('mera2App'));

  var TheatermovieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TheatermovieComponent = $componentController('theatermovie', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
