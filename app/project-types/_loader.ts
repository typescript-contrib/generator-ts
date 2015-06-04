/// <reference path="../../typings/tsd.d.ts" />

import path = require('path');
import fs = require("fs");

// var normalizedPath = require("path").join(__dirname, "routes");

fs.readdirSync(__dirname).forEach(function(file) {
    if(file.match(/\.js$/) && !file.match(/loader\.js$/)) {
        require(path.join(__dirname, file));
    }
});
