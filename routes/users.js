var express = require('express');
var router = express.Router();
var Ninja = require('../models/ninja');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ninjasp', function(req, res, next) {
  Ninja.geoNear(
    {type: 'Point',coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    {maxDistance: 100000,spherical: true}
  ).then(ninjas=>res.send(ninjas)).catch(next);
});

router.get('/ninjas', function(req, res, next){
    /* Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    }); */
    Ninja.near(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
});

router.get('/ninja', function(req, res, next) {
  Ninja.find({}).then(ninja=>res.send(ninja)).catch(next);
});

router.post('/ninja', function(req, res, next) {
  Ninja.create(req.body).then(ninja=>res.send(ninja)).catch(next);
});

router.delete('/ninja/:id', function(req, res, next) {
  Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja)=>res.send(ninja));
});

router.put('/ninja/:id', function(req, res, next) {
  Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then(()=>{
    Ninja.findOne({_id: req.params.id}).then(ninja=>res.send(ninja));
  });
});

module.exports = router;
