'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');


  app.get('/', dbg, home.index);
  app.post('/create', dbg, users.create);
  app.get('/find', dbg, users.find);
  console.log('Routes Loaded');
  fn();
}
