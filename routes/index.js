const express = require('express');
const router = express.Router();
const Place = require('../models/place');

/* GET home page. */
router.route('/')
	.get((req, res, next) => {
	  Place.find((error, places) => {
	  	if (error) {
	  		next(error);
	  	} else {
	  		res.render('places/index', { places });
	  	}
	  });
	})
  .post((req, res, next) => {
		let location = {
			type: 'Point',
			coordinates: [req.body.longitude, req.body.latitude]
		};
    const newPlace = {
      name:        				req.body.name,
      description: 				req.body.description,
			kindOfEstablishment:req.body.kindOfEst,
			location:    				location
		};

  	const place = new Place(newPlace);
  	place.save((error) => {
  		if (error) {
  			next(error);
  		} else {
  			res.redirect('/');
  		}
  	});
  });

router.route('/new')
	.get((req, res, next) => {
		res.render('places/new');
	});

router.route('/api')
	.get((req, res) => {
	  Place.find((error, places) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
	  		res.status(200).json(places);
	  	}
	  });
	});


router.route('/api/:place_id')
	.get((req, res) => {
		Place.findById(req.params.place_id, (error, place) => {
			if (error) {
				res.status(500).json({message: error});
			} else {
				res.status(200).json(place);
			}
		});
	});

router.route('/:place_id')
	.get((req, res, next) => {
		Place.findById(req.params.place_id, (error, place) => {
			if (error) {
				next(error);
			} else {
				res.render('places/show', {place});
			}
		});
	})
	.post((req, res, next) => {
		let location = {
			type: 'Point',
			coordinates: [req.body.longitude, req.body.latitude]
		};
		Place.findById(req.params.place_id, (error, place) => {
			if (error) {
				next(error);
			} else {
				place.name =	req.body.name;
        place.description = req.body.description;
				place.kindOfEstablishment = req.body.kindOfEst;
				place.location = location;
				place.save((error) => {
		  		if (error) {
		  			next(error);
		  		} else {
		  			res.redirect('/');
		  		}
		  	});
			}
		});
	});

router.route('/:place_id/edit')
	.get((req, res, next) => {
		Place.findById(req.params.place_id, (error, place) => {
			if (error) {
				next(error);
			} else {
				console.log(place);
				res.render('places/update', { place });
			}
		});
	});

router.route('/:place_id/delete')
	.get((req, res, next) => {
		Place.remove({ _id: req.params.place_id }, function(error, place) {
	    if (error) {
	    	next(error);
	    } else {
	    	res.redirect('/');
	    }
    });
	});



module.exports = router;
