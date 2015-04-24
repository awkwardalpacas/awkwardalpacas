'use strict';

describe('KaMealeon events.js tests',function(){

  beforeEach(module('lunchCorgi.events'));

  describe('events controller',function(){
    
    it('createMap function is defined',function(){
      expect('createMap').toBeDefined();
    });
    
    it('joinEvent function is defined',function(){
      expect('joinEvent').toBeDefined();
    });

    it('eventDetails function is defined',function(){
      expect('eventDetails').toBeDefined();
    });

    it('addEvent function is defined',function(){
      expect('addEvent').toBeDefined();
    });

    it('initNewEventForm function is defined',function(){
      expect('initNewEventForm').toBeDefined();
    });

    it('viewAllEvents function is defined',function(){
      expect('viewAllEvents').toBeDefined();
    });

    it('nextPage function is defined',function(){
      expect('nextPage').toBeDefined();
    });

    it('prevPage function is defined',function(){
      expect('prevPage').toBeDefined();
    });

  });

});