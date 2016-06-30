#!/usr/bin/env node

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

// var prompt = require('prompt');

// prompt.start();

// prompt.get(['username', 'email'], function (err, result) {
//   if (err) { return onErr(err); }
//   console.log('Command-line input received:');
//   console.log('  Username: ' + result.username);
//   console.log('  Email: ' + result.email);
// });

// function onErr(err) {
//   console.log(err);
//   return 1;
// }


// var fs = require('fs');
var fs = require('fs-extra')
// var fd = fs.openSync('./test.js', 'w');

var ncp = require('ncp').ncp;
 
// ncp.limit = 16;

var exec = require('child_process').exec;
var cmd = 'composer install';

fs.emptyDir('./', function (err) {
  if (!err) console.log('success!')
})

// copyWordPress(function() {
//   copyWordPressTheme(function() {
//     copyWordPressComposer(function() {
//       console.log('yay');

//       exec(cmd, function(error, stdout, stderr) {
//         // command output is in stdout
//         console.log(error, stdout, stderr);
//       });
//     });
//   });
// });

// function copyWordPressComposer(next) {
//   fs.copy(__dirname + '/../wordpress-composer.json', './composer.json', function (err) {
//     if (err) {
//       return console.error(err);
//     } else {
//       next();
//     } 
//   });
// }

// function copyWordPress(next) {
//   ncp(__dirname + '/../wordpress', './public', function (err) {
//     if (err) {
//       return console.error(err);
//     } else {
//       next();
//     }  
//   });
// }

// function copyWordPressTheme(next) {
//   ncp(__dirname + '/../wordpress-theme', './public/wp-content/themes/my-theme/', function (err) {
//     if (err) {
//       return console.error(err);
//     } else {
//       next();
//     }  
//   });
// }

