var express = require('express'); //imports express.
var router = express.Router();
var mongoose = require('mongoose'); //imports mongoose.
var botleModel = mongoose.model('botle'); //defines 'Comment.js' as a mongoose model.
var User = mongoose.model('UserModel');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'Hashbrowns',
  userProperty: 'payload'
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// // EDIT Botle
// router.post('/:blog', function(req, res, next) {
// 	blogModel.update({_id : req.blog._id}, req.body, {multi: false}, function callback(err, numAffected) {
// 		if(err) return next(err);
// 		else if (numAffected.nModified > 1) res.status(400).send("TOO MANY TODOS UPDATED!!!!");
// 		else if (numAffected.nModified !== 1) res.status(400).send("No todos updated");
// 		else res.status(200).send("Good to go!");
// 	});
// });
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//ADD Botle
router.post('/send', function(req, res, next) { //this line activates when a post request is made to the 'post/apiCall/Comment' url.
  console.log('hey inside .post for botle routes')
  console.log(req.body)
  var createdBotle = new botleModel(req.body); // this line creates a variable 'createdComment' which is equal to the Schema configured request body;
  //Also uses the model 'Comment' to compare the Schema to the req.body and make matches the data configuration in the model.
  createdBotle.dateCreated = new Date(); //this line take the newly configured req.body and gives it a property of dateCreated which is equal to new Date().
  //Also, new Date() is a built in method that uses the current date and assign it to the createdComment object.
  // createdBotle.save(function(err, botle) {
  // if (err) return next(err);

  // createdBotle.user = req.payload.id;
  // botleModel.save({}, function(err, botle) {
  //
  // });
  createdBotle.save(function(err, bottle) {
    console.log(bottle);
    res.send();
  })


});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// GET ALL Botles (PUBLIC)
router.get('/', function(req, res, next) { //this line is a func. that runs when a get request is made at '/the/apiCall/Comment'.
  botleModel.find({}).exec(function(err, botles) { //this line says to connect to mongo, find all({}) data in the collection, and then execute the function.
    if (err) return next(err);
    console.log("executing");
    res.send(botles); //this line says to send the response with 'dbcomments' data received from mongodb to THE CLIENT.
  });
});
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// DEFINE 'USER' PARAMETER
router.param('user', function(req, res, next, id) { //this line says to find the parameter with the name of 'comment'
  botleModel.find({
    _id: id
  }).exec(function(err, botles) { //this line says to use the 'Comment' model and find the collection, and then execute the next function.
    if (err) return next(err);
    req.botles = botles[0]; //this line places the 'comment' parameter on the request and makes it equal to 'comments' at the index of 1...????
    next(); //this line says to go to the parameter 'comment' with the newly configured data to use.
  });
});
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------//

router.get('/getbotle', function(req, res, next) {
  botleModel.find({
    dateDeleted: null
  }).exec(function(err, botles) {
    if (err) return next(err);
    console.log('hi');
    res.send(botles);
  });
});

//=============================================================
// GET Botle BY SIGNED IN USER ID
router.get('/botle', auth, function(req, res, next) {
  // console.log(req.payload.id);
  botleModel.find({
    // user: req.payload.id,
    // dateDeleted: null
  }).exec(function(err, botle) {
    // console.log(botle);
    if (err) return next(err);
    console.log(botle);

    res.send(botle);
  });
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//DEFINES 'Botle' PARAMETER
router.param('botle', function(req, res, next, id) {
  botleModel.find({
    _id: id
  }).populate('botle.user', 'username').exec(function(err, botle) {
    if (err) return next(err);
    req.botle = botle[0];
    next();
  });
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//DELETE Botle
router.post('/delete/:botle', function(req, res, next) {
  // console.log(req.body);
  botleModel.update({
    _id: req.botle._id
  }, {
    dateDeleted: new Date()
  }, function(err, numberAffected) { //this line uses the mongoose command .update to log the date deleted in mongodb.
    if (err) return next(err);
    if (numberAffected.nModified > 1) res.status(400).send(
      'No More Botles To Delete'); //this line says that if the obj. collection of documents and the
    //number of modified documents within equals more than one, then return an error to the CLIENT SIDE. (numberAffected & nModified are mongoose commands)
    else if (numberAffected.nModified !== 1) res.status(400).send(
      'Nothing has been deleted'); //this line says that if the obj. collection of documents and the
    //number of modified documents within does not equal one, then return an error to the CLIENT SIDE. (numberAffected & nModified are mongoose commands)
    else res.send('Botle Deleted'); //this line says if no errors, send 'Comment Deleted' to the CLIENT SIDE.
  });
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//GETS A SINGLE Botle FOR COMMENT FUNCTION
router.get('/api/Botle/:botle', function(req, res, next) {
  res.send(req.botle);
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//POST COMMENT
router.post('/api/Botle/:botle/comment', auth, function(req, res, next) {
  console.log("reached the route");
  var newComment = req.body;
  newComment.dateCreated = new Date();
  console.log(req.payload);
  newComment.user = req.payload.id;
  botleModel.update({
    _id: req.botle._id
  }, {
    $push: {
      comments: newComment
    }
  }, function(err, numberAffected) {
    if (err) return next(err);
    botleModel.findOne({
      _id: req.botle._id
    }, function(err, botle) {
      if (err) return next(err);
      var comment = botle.comments[botle.comments.length - 1];
      res.send({
        _id: comment._id,
        dateCreated: comment.dateCreated
      });
    });
  });
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
module.exports = router;
