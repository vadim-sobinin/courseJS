"use strict";
const title = prompt("What is the name of your project?");
const screens = prompt("What types of screens need to be developed?", "Simple, Complex, Interactive");
const screenPrice = +prompt("How much will this work cost?($)", "100");
const rollback = 20;
const adaptive = (prompt("Do you need an adaptive site?", "true")) === "true" ? true : false;
const service1 = prompt("(1)What additional type of service is needed?");
const servicePrice1 = +prompt("(1)How much will it cost?");
const service2 = prompt("(2)What additional type of service is needed?");
const servicePrice2 = +prompt("(2)How much will it cost?");
//Functions

const getAllServicePrices = function(servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2;
};

function getFullPrice(screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
}

function getTitle(title) {
  return title.trim().split("").reduce((total, letter, index) => {
    return index === 0 ? total + letter.toUpperCase() : total + letter.toLowerCase(); 
  }, "");
}

function getServicePercentPrices(fullPrice, servicePercentPrice){
  return fullPrice - Math.round((fullPrice * (rollback / 100)));
}

function getRollbackMessage(fullPrice) {
  if (fullPrice >= 500) {
    return "Your discount is 10%";
  } else if (fullPrice >= 250) {
    return "Your discount is 5%";
  } else if (fullPrice >= 0 && fullPrice < 250) {
    return "You have no discount.";
  } else {
    return "Oops... Something went wrong.";
  }
}

function showTypeOf(variable) {
  return typeof variable;
}

// Lesson 4

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

const fullPrice = getFullPrice(screenPrice, allServicePrices);

const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);


console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);