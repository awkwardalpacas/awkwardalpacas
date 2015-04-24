'use strict';

describe('KaMealeon event.js tests',function(){
  describe('event controller',function(){
    it('event function exists',inject(function($controller){
      var eventCtrl = $controller('eventController');
      expect(eventCtrl).toBeDefined();
      
    }));
  });
});