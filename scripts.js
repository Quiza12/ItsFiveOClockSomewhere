getTimezones();

var countryNames = [];
var timeZones = [];
var unixTimes = [];
var times = [];

function getTimezones() {
  var xmlhttp = new XMLHttpRequest();
  var url = 'https://api.timezonedb.com/v2/list-time-zone?key=W9VXG3ZAZ6ZD&format=json';

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var jsonArray = JSON.parse(this.responseText);
          var zonesArray = jsonArray.zones;
          extractCountriesAndTimes(zonesArray);
          convertTimes();
          logValues();
      }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

function extractCountriesAndTimes(responseBody) {
  responseBody.forEach(function(element) {
    countryNames.push(element.countryName);
    timeZones.push(element.zoneName);
    unixTimes.push(element.timestamp);
  });
  console.log(timeZones);
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
  var firstCleanse = timeZone.replace(/(\w+\/)/, '');
  var secondCleanse = firstCleanse.replace(/[_]/g, ' ');
  //var thirdCleanse = secondCleanse.replace('_', ' ');
  return secondCleanse;
}

function logValues() {
  for (var i = 0; i < countryNames.length; i++) {
    if (times[i] == 3) {
      var cleanedTimeZone = cleanTimeZoneValue(timeZones[i]);
      appendToList(cleanedTimeZone + ' - ' + countryNames[i]);
      console.log(cleanedTimeZone + ' - ' + countryNames[i]);
    }
  }
  removeLoaderAddResults();
}

function removeLoaderAddResults() {
  document.getElementsByClassName('glass')[0].style.display = 'none';
  document.getElementsByClassName('beer')[0].style.display = 'none';
  document.getElementsByClassName('handle')[0].style.display = 'none';
  document.getElementsByClassName('foam')[0].style.display = 'none';

  document.getElementsByClassName('results-container')[0].style.display = 'block';
}

function appendToList(timeZone) {
  var li = document.createElement('li');
	li.innerHTML += timeZone;
  document.getElementsByClassName('results-list')[0].appendChild(li);
}

function appendToListOverflow(timeZone) {
  var li = document.createElement('li');
	li.innerHTML += timeZone;
  document.getElementsByClassName('results-list')[0].appendChild(li);
}
