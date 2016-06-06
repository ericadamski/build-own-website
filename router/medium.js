'use strict';

let express = require('express');
let router = express.Router();

let medium = new (require('../public/dist/js/blog.min.js'))('ericadamski');

router.get('/blog', (req, res) =>
  medium.latest()
    .then(html => res.status(200).send(html),
      err => res.status(404).send(err))
);

module.exports = router;
