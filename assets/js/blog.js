let q = require('q');
let path = require('path');
let fs = require('fs');
let needle = require('needle');
let _ = require('underscore');


const URL = 'https://medium.com/@';

let blogTemplate = _.template(
  fs.readFileSync(
    path.join(__dirname, '..', '..', '..', 'views', 'blog.html')).toString());

module.exports = class {
  constructor(username) {
    this.username = username;
  }

  latest () {
    let deferred = q.defer();

    needle.get(`${URL}${this.username}/latest`, (err, resp) => {
      if (err) return deferred.reject(err);

      let env = require('jsdom').env;
      let html = resp.body;

      env(html, (err, window) => {
        if (err) deferred.reject(err);
        let $ = require('jquery')(window);

        $('.postMeta-previewFooterActions').remove();

        deferred.resolve(blogTemplate({
            posts: _.keys($('.postItem'))
              .filter(n => !isNaN(parseInt(n)))
              .map(n => `
                <div class="medium-post">
                  ${$($('.postItem')[n]).html()}
                </div>`)
              .reduce((x, y) => x + y)
          }));
      });
    });

    return deferred.promise;
  }
};
