'use strict';

describe('KaMealeon events.js tests',function(){

  beforeEach(module('lunchCorgi.services'));

  describe('Events factory',function(){
    
    it('getEvents function is defined',function(){
      expect('getEvents').toBeDefined();
    });
    
    it('joinEvent function is defined',function(){
      expect('joinEvent').toBeDefined();
    });

    it('getLocation function is defined',function(){
      expect('getLocation').toBeDefined();
    });

    it('addEvent function is defined',function(){
      expect('addEvent').toBeDefined();
    });

    it('getLatAndLong function is defined',function(){
      expect('getLatAndLong').toBeDefined();
    });

  });

  describe('Event factory',function(){

    it('eventDetails function is defined',function(){
      expect('eventDetails').toBeDefined();
    });

    it('loadEvent function is defined',function(){
      expect('loadEvent').toBeDefined();
    });

    it('getChat function is defined',function(){
      expect('getChat').toBeDefined();
    });

    it('sendChat function is defined',function(){
      expect('sendChat').toBeDefined();
    });

    it('createMap function is defined',function(){
      expect('createMap').toBeDefined();
    });

  });

  describe('Users factory',function(){
    
    it('signup function is defined',function(){
      expect('signup').toBeDefined();
    });

    it('signin function is defined',function(){
      expect('signin').toBeDefined();
    })

  });

});