// var prompt = require('prompt');
var fs = require('fs-extra');
var exec = require('child_process').exec;

var themeSlug = 'charliejackson';
var themePHPslug = 'charliejackson';
var themeJSslug = '';
var themeName = 'Charlie Jackson';
var wordPressDirRename = './public';
var mysqlHost = 'localhost';
var databaseUser = 'root';
var databasePassword = '';
var database = 'wordpress';

var config = {
  mysql: {
    local: {
      database: 'wordpress',
      username: 'root',
      password: '',
      host: 'localhost'
    },
    staging: {
      database: 'wordpress',
      username: 'root',
      password: '',
      host: 'localhost'
    },
    live: {
      database: 'wordpress',
      username: 'root',
      password: '',
      host: 'localhost'
    }
  },
  env: 'local',
  dev: true,
  unique: {
    auth: {
      key: '',
      salt: ''
    },
    secureAuth: {
      key: '',
      salt: ''
    },
    loggedIn: {
      key: '',
      salt: ''
    },
    nonce: {
      key: '',
      salt: ''
    }
  },
  activeTheme: themeSlug
};

var processes = [];

function addProcess(project) {
  processes.push(project);
}

function deleteProcess(project) {
  var index = processes.indexOf(project);

  if (index > -1) {
    processes.splice(index, 1);
  }
}

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

function copyFiles(next) {
  var project = 'copyFiles';
  addProcess(project);

  fs.copy(__dirname + '/../../wordpress-headless', './', function (err) {
    deleteProcess(project);

    if (err) {
      return console.error(err);
    } else {
      next();
    } 
  });
}

function runComposer(next) {
  var project = 'runComposer';
  addProcess(project);
  var cmd = 'composer install';

  exec(cmd, function(error, stdout, stderr) {
    deleteProcess(project);
    next();
  });
}

function renameWordpressDir(next) {
  var project = 'renameWordpressDir';
  addProcess(project);

  fs.rename('./wordpress', wordPressDirRename, function(err) {
    deleteProcess(project);

    if (err) {
      console.log(err);
    } else {
      next();
    }
  });
}

function updateThemeFiles(next) {
  var project = 'updateThemeFiles';
  addProcess(project);

  deleteProcess(project);
  next();
}

function renameMoveTheme(next) {
  var project = 'renameMoveTheme';
  addProcess(project);

  fs.rename('./theme', wordPressDirRename + '/wp-content/themes/' + themeSlug, function(err) {
    deleteProcess(project);

    if (err) {
      console.log(err);
    } else {
      // Rename theme bits and pieces    
      next();
    }
  });
}

function deleteThemes(next) {
  var project = 'deleteThemes';
  addProcess(project);

  fs.emptyDir(wordPressDirRename + '/wp-content/themes', function (err) {
    deleteProcess(project);

    if (err) {
      console.log(err);
    } else {
      next();
    }
  });
}

function deletePlugins(next) {
  var project = 'deletePlugins';
  addProcess(project);

  fs.emptyDir(wordPressDirRename + '/wp-content/plugins', function (err) {
    deleteProcess(project);

    if (err) {
      console.log(err);
    } else {
      next();
    }
  });
}

var https = require("https");

function processWordpressConfig(next) {
  var project = 'processWordpressConfig';
  addProcess(project);

  var newConfigFileName = wordPressDirRename + '/wp-config.php';

  fs.rename('./wp-config.php', newConfigFileName, function(err) {
    

    if (err) {
      return console.log(err);
    }

    fs.readFile(newConfigFileName, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      var result;

      https.get('https://api.wordpress.org/secret-key/1.1/salt/', (res) => {
        // console.log('statusCode: ', res.statusCode);
        // console.log('headers: ', res.headers);

        res.on('data', (d) => {
          // process.stdout.write(d);
          // result = result.replace('{{salt}}', d);

          fs.writeFile('./config.json', JSON.stringify(config, null, 4), 'utf8', function (err) {
            deleteProcess(project);

            if (err) {
              return console.log(err);
            }

            next();
          });
        });
      }).on('error', (e) => {
        console.error(e);
      });
    });
  });
}

function installHeadlessTheme(next) {
  var project = 'installHeadlessTheme';
  addProcess(project);
  var cmd = 'git submodule add -b develop https://github.com/cajacko/headless.git ./public/wp-content/themes/headless';

  exec(cmd, function(error, stdout, stderr) {
    deleteProcess(project);  
    next();
  });
}

module.exports = function() {
  copyFiles(function() {
    updateThemeFiles(function() {
    });

    runComposer(function() {
      renameWordpressDir(function() {
        deleteThemes(function() {
          installHeadlessTheme(function() {
          });

          renameMoveTheme(function() {
          });
        });

        deletePlugins(function() {
        });

        processWordpressConfig(function() {

        });
      });
    });
  });
};
