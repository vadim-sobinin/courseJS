"use strict";
let title = "Sites";
let screens = "Simple, Complex, Interactive";
let screenPrice = 100;
let rollback = 20;
let fullPrice = 120;
let adaptive = true;

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
  return fullPrice - servicePercentPrice;
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

// Lesson 3

title = prompt("What is the name of your project?");
screens = prompt("What types of screens need to be developed?", "Simple, Complex, Interactive");
screenPrice = +prompt("How much will this work cost?($)", "100");
adaptive = (prompt("Do you need an adaptive site?", "true")) === "true" ? true : false; 
// console.log(adaptive);
const service1 = prompt("(1)What additional type of service is needed?");
const servicePrice1 = +prompt("(1)How much will it cost?");
const service2 = prompt("(2)What additional type of service is needed?");
const servicePrice2 = +prompt("(2)How much will it cost?");

fullPrice = screenPrice + servicePrice1 + servicePrice2;
// console.log("Full price: " + fullPrice);

let servicePercentPrice = Math.round((fullPrice * (rollback / 100)));
console.log(servicePercentPrice);


// Lesson 4

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

fullPrice = getFullPrice(screenPrice, allServicePrices);

servicePercentPrice = getServicePercentPrices(fullPrice, servicePercentPrice);


console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);