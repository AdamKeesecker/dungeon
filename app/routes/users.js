'use strict';

var Mongo = require('mongodb');
var users = global.nss.db.collection('users');
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.create = (req, res)=>{
  User.create(user=>{
    req.session.userId = user._id.toString();
    res.send({user:user});
  });
};

exports.find = (req, res)=>{
  var id = Mongo.ObjectID(req.session.userId);
  users.findOne({_id: id}, (err, user)=>{
    res.send({user:user});
  });
};
