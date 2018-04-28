console.log('\n');
console.log('Where is it five o\'clock? I need to justify this beer.');
console.log('\n');
console.log('Use the following as your excuse, you alcoholic.');
console.log('\n');

var countryNames = [];
var timeZones = [];
var unixTimes = [];
var times = [];

var request = require('request');
request('https://api.timezonedb.com/v2/list-time-zone?key=W9VXG3ZAZ6ZD&format=json', function (error, response, body) {
  var jsonArray = JSON.parse(body);
  var arr = jsonArray.zones;
  extractCountriesAndTimes(arr);
  convertTimes();
  logValues();
  console.log('\n');
});

function extractCountriesAndTimes(responseBody) {
  responseBody.forEach(function(element) {
    countryNames.push(element.countryName);
    timeZones.push(element.zoneName);
    unixTimes.push(element.timestamp);
  });
}

function convertTimes() {
  unixTimes.forEach(function(element) {
    times.push(getTimeFromUnixTime(element));
  });
}

function getTimeFromUnixTime(unixTime) {
  var date = new Date(unixTime*1000);
  var hours = date.getHours();
  return hours;
}

function cleanTimeZoneValue(timeZone) {
  var firstCleanse = timeZone.replace(/(\w+\/)/, "");
  var secondCleanse = firstCleanse.replace('_', " ");
  return secondCleanse;
}

function logValues() {
  for (var i = 0; i < countryNames.length; i++) {
    if (times[i] == 3) {
      console.log(cleanTimeZoneValue(timeZones[i]) + ' - ' + countryNames[i]);
    }
  }
}
