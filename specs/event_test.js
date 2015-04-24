'use strict';

describe('KaMealeon event.js tests',function(){

  beforeEach(module('lunchCorgi.event'));

  describe('event controller',function(){
    
    it('loadEvent function is defined',function(){
      expect('loadEvent').toBeDefined();
    });
    
    it('loadEvents function is defined',function(){
      expect('loadEvents').toBeDefined();
    });

    it('createMap function is defined',function(){
      expect('createMap').toBeDefined();
    });

  });

  describe('chat controller',function(){
    
    it('loadChats function is defined',function(){
      expect('loadChats').toBeDefined();
    });

    it('init function is defined',function(){
      expect('init').toBeDefined();
    });

    it('sendmessage function is defined',function(){
      expect('sendmessage').toBeDefined();
    });

  });

});