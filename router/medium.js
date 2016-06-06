'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');

let medium = require('medium-sdk');
let needle = require('needle');
let _ = require('underscore');

const TOKEN = '2b52329cf02ffd0f509e4cfcb2d397387175fa571e172049651a15817a1a0affc';

let client = new medium.MediumClient({
  clientId: 'b8edd2dfb982',
  clientSecret: 'cc408c1033152cdcd977adc05193f1e7acdad5bb',
});

// client.setAccessToken(TOKEN);
// client.getUser((err, user) => {
//   needle.get(`${user.url}/latest`, (err, resp) => {
//     let env = require('jsdom').env;
//     let html = resp.body;
//
//     env(html, (err, window) => {
//       let $ = require('jquery')(window);
//       console.log(_.keys($('article'))
//         .filter(n => !isNaN(parseInt(n)))
//         .map(n => $($('article')[n]).html()));
//     });
//   });
// });

let blogTemplate = _.template(fs.readFileSync(path.join(__dirname, '..', 'views', 'blog.html')).toString());

router.get('/blog', (req, res) => {
  client.setAccessToken(TOKEN);
  client.getUser((err, user) => {
    needle.get(`${user.url}/latest`, (err, resp) => {
      let env = require('jsdom').env;
      let html = resp.body;

      env(html, (err, window) => {
        let $ = require('jquery')(window);
        console.log($('html').html());
        res.send(
          blogTemplate({
            posts: _.keys($('.postItem'))
              .filter(n => !isNaN(parseInt(n)))
              .map(n => $($('.postItem')[n]).html())
              .reduce((x, y) => x + y)
          }));
      });
    });
  });
});

module.exports = router;
