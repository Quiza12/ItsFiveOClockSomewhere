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
}

function convertTimes() {
  unixTimes.forEach(function(element) {
    times.push(getHoursFromUnixTime(element));
  });
}

function getHoursFromUnixTime(unixTime) {
  var date = new Date(unixTime*1000);
  var hours = date.getHours();
  return hours;
}

function getMinutesFromUnixTime(unixTime) {
  var date = new Date(unixTime*1000);
  var minutes = date.getMinutes().toString();
  if (minutes.charAt(1) == '') {
    minutes = '0' + minutes;
  }
  return minutes;
}

function cleanTimeZoneValue(timeZone) {
  var firstCleanse = timeZone.replace(/(\w+\/)/, '');
  var secondCleanse = firstCleanse.replace(/[_]/g, ' ');
  return secondCleanse;
}

function logValues() {
  var listCount = 0;
  for (var i = 0; i < countryNames.length; i++) {
    if ((times[i] == 3) && (listCount <= 24)) {
      var cleanedTimeZone = cleanTimeZoneValue(timeZones[i]);
      var result = cleanedTimeZone + ' - ' + countryNames[i] + ' - ' + '5:' + getMinutesFromUnixTime(unixTimes[i]) + 'pm';
      appendToList(result);
      listCount++;
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
