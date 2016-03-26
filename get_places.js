var fs = require('fs');
var split = require('split');
var csv = require('fast-csv');

var csvStream = csv.createWriteStream({headers: true, quoteColumns: true});
csvStream.pipe(process.stdout);

function splitTSV(line) { return line.split('\t'); }

process.stdin.resume();
process.stdin.pipe(split(splitTSV, null, {trailing: false}))
.on('data', function (r) {
  var me = {};

  //me.geonameid         = r[0]; // integer id of record in geonames database
  //me.name              = r[1]; // name of geographical point (utf8) varchar(200)
  me.asciiname         = r[2]; // name of geographical point in plain ascii characters, varchar(200)
  //me.alternatenames    = r[3]; // alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varcha
  me.latitude          = r[4]; // latitude in decimal degrees (wgs84)
  me.longitude         = r[5]; // longitude in decimal degrees (wgs84)
  me.feature_class     = r[6]; // see http://www.geonames.org/export/codes.html, char(1)
  //me.feature_code      = r[7]; // see http://www.geonames.org/export/codes.html, varchar(10)
  me.country_code      = r[8]; // ISO-3166 2-letter country code, 2 characters
  //me.cc2               = r[9]; // alternate country codes, comma separated, ISO-3166 2-letter country code, 200 characters
  me.admin1_code       = r[10]; // fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(
  //me.admin2_code       = r[11];// code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80) 
  //me.admin3_code       = r[12];// code for third level administrative division, varchar(20)
  //me.admin4_code       = r[13];// code for fourth level administrative division, varchar(20)
  //me.population        = r[14];// bigint (8 byte int) 
  //me.elevation         = r[15];// in meters, integer
  //me.dem               = r[16];// digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, 
  //me.timezone          = r[17];// the timezone id (see file timeZone.txt) varchar(40)
  //me.modification_date = r[18];// date of last modification in yyyy-MM-dd format

  if (me.feature_class === 'P') { // P city, village,...
       delete me.feature_class;
       csvStream.write(me);
  }
})
.on('end', function () {
  csvStream.end();
})
.on('error', function (err) {
  console.error(err);
});
