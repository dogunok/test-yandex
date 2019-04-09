const flightTable = document.querySelector('.flightTable');
const template = document.querySelector('template');
const searchFormBtn = document.querySelector('.searchFormBtn');
const departureTab = document.querySelector('.departureTab');
const arrivalTab = document.querySelector('.arrivalTab');
const delayTab = document.querySelector('.delayTab');
const allBtn = document.querySelectorAll('.btn');


const requestData = (url)=>{
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4 && xhr.status === 200){
                res(JSON.parse(xhr.response))
            } else if(xhr.readyState === 4 && xhr.status !== 200){
                rej(console.error(xhr.status))
            }
        }
        xhr.send();
    })
}

const addFlight = data => {
    data.forEach(item => {
        let templateClone = template.content.cloneNode(true) 
        templateClone.querySelector('.flightTime').textContent = item.time
        templateClone.querySelector('.flightCity').textContent = item.way
        templateClone.querySelector('.flightAirline').textContent = item.flight
        templateClone.querySelector('.flightTerminal').textContent = item.terminal
        templateClone.querySelector('.flightStatus').textContent = item.status
        templateClone.querySelector('.arrivalOrDeparture').textContent = item.fly
        flightTable.appendChild(templateClone)  
    });
}

requestData('data/tablo.json').then(addFlight)

const checkForGermination = (inputString, fieldString) => {
    for(let i = 0; i < fieldString.length; i++){
        if(inputString[i] !== fieldString[i]){
            return false
        }
    }
    return true
}

const findingTheExactValue = (inputString, fieldString) => {
    const numberOfLetters = fieldString.split(' ')[1];
    const numberOfDigits = fieldString.split(' ')[0].toLowerCase();
    const inputStrWithoutSpaces  = fieldString.toLowerCase().replace(' ', "")
    const allInputLetters = inputString.replace(/(\s)*(\d)+/g, "").toLowerCase();
    const allInputNumbers = inputString.replace(/(\s)*(\D)+/g, "");
    const sourceStringWithoutSpaces = inputString.toLowerCase().replace(' ', "");

     if(allInputLetters.length && allInputNumbers.length){
        return checkForGermination(inputStrWithoutSpaces, sourceStringWithoutSpaces)
     }else if(allInputLetters.length){
        return checkForGermination(numberOfDigits, allInputLetters)
    } else {
        return checkForGermination(numberOfLetters, allInputNumbers)
    }  
}

searchFormBtn.addEventListener('click', () => {
    const flightAirline = document.querySelectorAll('.flightAirline');
    const flightInfo = document.querySelectorAll('.flightInfo');
    const searchFormField = document.getElementById('searchFormField');
    
    Array.prototype.slice.call(allBtn).forEach(item => {
        item.classList.remove('active')
    })

    Array.prototype.slice.call(flightAirline).forEach((item, i) => {
        flightInfo[i].classList.remove('hidden');
        if(!findingTheExactValue(searchFormField.value, item.textContent)){
            flightInfo[i].classList.add('hidden');
        }
    })
})

const valueSearch = matchingStr => {
    const checkingElem = document.querySelectorAll('.arrivalOrDeparture');
    const flightInfo = document.querySelectorAll('.flightInfo');
    const target = document.querySelector(`.${matchingStr}`);

    Array.prototype.slice.call(allBtn).forEach(item => {
        item.classList.remove('active')
    })
    target.classList.add('active')
    Array.prototype.slice.call(checkingElem).forEach((item, i) => {
        flightInfo[i].classList.remove('hidden');
        if(!matchingStr.match(item.textContent.trim())){
            flightInfo[i].classList.add('hidden');
        }
    })
}

arrivalTab.addEventListener('click', valueSearch.bind(this,  'arrival'));
departureTab.addEventListener('click', valueSearch.bind(this, 'departure'));
delayTab.addEventListener('click', valueSearch.bind(this, 'expects'));