var fs = require('fs');
var csv = require('fast-csv');

var formatStream = csv
  .createWriteStream({headers: true, quoteColumns: true})
  .transform(function(obj){
    delete obj.latitude;
    delete obj.longitude;
    return obj;
  });

process.stdin.resume();
csv
  .fromStream(process.stdin, {headers: true})
  .pipe(formatStream)
  .pipe(process.stdout);
