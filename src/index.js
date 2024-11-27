// src/index.js
import './style.css';
import './homepage.css';
import rainImage from './images/rain.jpg';

const getWeatherData = async function (location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=BPNQZXECDZ5T7Y9JC89JR8GTT&contentType=json`,
      { mode: 'cors' }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('Error in get: ', e);
  }
};

// getWeatherData('canada').then((response) => console.log(response));

const keys = [
  'resolvedAddress',
  'description',
  'days[0].datetime',
  'days[0].tempmax',
  'days[0].tempmin',
  'days[0].temp',
  'days[0].precip'
];

const getRelevantWeatherData = async function (location) {
  try {
    const data = await getWeatherData(location);
    const relevantData = {
      resolvedAddress: data.resolvedAddress,
      description: data.description,
      datetime: data.days[0].datetime,
      tempmax: data.days[0].tempmax,
      tempmin: data.days[0].tempmin,
      temp: data.days[0].temp,
      precip: data.days[0].precip
    };
    return relevantData;
  } catch (e) {
    console.log('Error in relevantData: ', e);
  }
};

const form = document.querySelector('#location-form');
const display = document.querySelector('#weather-display');

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const input = document.querySelector('#location-input');
  const inputValue = input.value;
  console.log(inputValue);
  const relevantData = await getRelevantWeatherData(inputValue);
  console.log(relevantData);
  if (relevantData) {
    display.className = '';
    display.children[0].textContent = relevantData.resolvedAddress;
    display.children[1].textContent = relevantData.description;
    display.children[2].children[1].textContent = relevantData.datetime;
    display.children[3].children[1].textContent = relevantData.tempmax;
    display.children[4].children[1].textContent = relevantData.tempmin;
    display.children[5].children[1].textContent = relevantData.temp;
    display.children[6].children[1].textContent = relevantData.precip;

    input.value = '';

    if (relevantData.precip > 0) {
      console.log('true');
      document.body.style['background-image'] = `url(${rainImage})`;
    } else {
      document.body.style['background-image'] = ``;
    }
  }
});

getRelevantWeatherData('london');
