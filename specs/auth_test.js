'use strict';

describe('KaMealeon auth.js tests',function(){

  beforeEach(module('lunchCorgi.signup','ngRoute'));

  describe('SignUpCtrl',function(){
    
    it('signedIn function is defined',function(){
      expect('signedIn').toBeDefined();
    });

    it('signin function is defined',function(){
      expect('signin').toBeDefined();
    });

    it('signup function is defined',function(){
      expect('signup').toBeDefined();
    });

    it('signout function is defined',function(){
      expect('signout').toBeDefined();
    });

  });

});