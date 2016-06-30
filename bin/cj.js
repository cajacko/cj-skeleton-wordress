#!/usr/bin/env node

var wordpressHeadless = require(__dirname + '/../actions/install/wordpress-headless');

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

wordpressHeadless();