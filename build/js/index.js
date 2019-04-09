"use strict";

var flightTable = document.querySelector('.flightTable');
var template = document.querySelector('template');
var searchFormBtn = document.querySelector('.searchFormBtn');
var departureTab = document.querySelector('.departureTab');
var arrivalTab = document.querySelector('.arrivalTab');
var delayTab = document.querySelector('.delayTab');
var allBtn = document.querySelectorAll('.btn');

var requestData = function requestData(url) {
  return new Promise(function (res, rej) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        res(JSON.parse(xhr.response));
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        rej(console.error(xhr.status));
      }
    };

    xhr.send();
  });
};

var addFlight = function addFlight(data) {
  data.forEach(function (item) {
    var templateClone = template.content.cloneNode(true);
    templateClone.querySelector('.flightTime').textContent = item.time;
    templateClone.querySelector('.flightCity').textContent = item.way;
    templateClone.querySelector('.flightAirline').textContent = item.flight;
    templateClone.querySelector('.flightTerminal').textContent = item.terminal;
    templateClone.querySelector('.flightStatus').textContent = item.status;
    templateClone.querySelector('.arrivalOrDeparture').textContent = item.fly;
    flightTable.appendChild(templateClone);
  });
};

requestData('data/tablo.json').then(addFlight);

var checkForGermination = function checkForGermination(inputString, fieldString) {
  for (var i = 0; i < fieldString.length; i++) {
    if (inputString[i] !== fieldString[i]) {
      return false;
    }
  }

  return true;
};

var findingTheExactValue = function findingTheExactValue(inputString, fieldString) {
  var numberOfLetters = fieldString.split(' ')[1];
  var numberOfDigits = fieldString.split(' ')[0].toLowerCase();
  var inputStrWithoutSpaces = fieldString.toLowerCase().replace(' ', "");
  var allInputLetters = inputString.replace(/(\s)*(\d)+/g, "").toLowerCase();
  var allInputNumbers = inputString.replace(/(\s)*(\D)+/g, "");
  var sourceStringWithoutSpaces = inputString.toLowerCase().replace(' ', "");

  if (allInputLetters.length && allInputNumbers.length) {
    return checkForGermination(inputStrWithoutSpaces, sourceStringWithoutSpaces);
  } else if (allInputLetters.length) {
    return checkForGermination(numberOfDigits, allInputLetters);
  } else {
    return checkForGermination(numberOfLetters, allInputNumbers);
  }
};

searchFormBtn.addEventListener('click', function () {
  var flightAirline = document.querySelectorAll('.flightAirline');
  var flightInfo = document.querySelectorAll('.flightInfo');
  var searchFormField = document.getElementById('searchFormField');
  Array.prototype.slice.call(allBtn).forEach(function (item) {
    item.classList.remove('active');
  });
  Array.prototype.slice.call(flightAirline).forEach(function (item, i) {
    flightInfo[i].classList.remove('hidden');

    if (!findingTheExactValue(searchFormField.value, item.textContent)) {
      flightInfo[i].classList.add('hidden');
    }
  });
});

var valueSearch = function valueSearch(matchingStr) {
  var checkingElem = document.querySelectorAll('.arrivalOrDeparture');
  var flightInfo = document.querySelectorAll('.flightInfo');
  var target = document.querySelector(".".concat(matchingStr));
  Array.prototype.slice.call(allBtn).forEach(function (item) {
    item.classList.remove('active');
  });
  target.classList.add('active');
  Array.prototype.slice.call(checkingElem).forEach(function (item, i) {
    flightInfo[i].classList.remove('hidden');

    if (!matchingStr.match(item.textContent.trim())) {
      flightInfo[i].classList.add('hidden');
    }
  });
};

arrivalTab.addEventListener('click', valueSearch.bind(void 0, 'arrival'));
departureTab.addEventListener('click', valueSearch.bind(void 0, 'departure'));
delayTab.addEventListener('click', valueSearch.bind(void 0, 'expects'));