const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

router.get('/', function (req, res, next) {
    res.render('locations');
});


//get all breweries by name

router.get('/breweries', function (req, res, next) {
 
  const options = {
    params: {
      key: apiKey,
      name: req.query.name || '',
      p: req.query.page || 1
    },
    withCredentials: true
  };

  axios.get(`${apiUrl}/breweries`, options).then(function (response) {
    // res.send(response.data);
    var body = response.data;
    res.json(body);
    // console.log(body)
    // res.render('locations', {body: body})
  })
});


//Search beers by id
router.get('/brewery/:id', function (req, res, next) {
  const options = {
    params: {
      key: apiKey
    },
    withCredentials: true
  }
  axios.get(`${apiUrl}/brewery/${req.params.id}`, options).then(function (response) {
      // res.send(response.data);
      // var body = response.data;
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      res.status(404).send();
    });
});

//get all breweries by location

router.get('/locations', function (req, res, next) {
 
  const options = {
    params: {
      key: apiKey,
      name: req.query.name || '',
      p: req.query.page || 1
    },
    withCredentials: true
  };

  axios.get(`${apiUrl}/locations`, options).then(function (response) {
    // res.send(response.data);
    // var body = response.data;
    res.json(response.data);
    console.log(response.data);
    // res.render('locations', {body: body})
  })
});





// Search brewery by id and location
router.get('/brewery/:id/locations', function (req, res, next) {
  const options = {
    params: {
      key: apiKey,
      breweryId: req.params.breweryId
    },
      withCredentials: true
  }

  axios.get(`${apiUrl}/brewery/${req.params.id}/locations`, options)
  .then(function (response) {
      // res.send(response.data);
      console.log(response);
      console.log(req.params.id);
      res.json(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(404).send();
    });
});

module.exports = router;