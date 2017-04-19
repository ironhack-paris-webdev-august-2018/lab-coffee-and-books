const express = require('express');
const router = express.Router();
const Place = require('../models/place');

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



module.exports = router;
