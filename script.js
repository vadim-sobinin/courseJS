"use strict";
let title;
let screens;
let screenPrice;
const rollback = 20;
let adaptive;
let service1;
let service2;
//Functions

const asking = function() {
  title = prompt("What is the name of your project?");
  screens = prompt("What types of screens need to be developed?", "Simple, Complex, Interactive");
  
  do{
    screenPrice = prompt("How much will this work cost?($)", "100");
  } while(!isNumber(screenPrice));
  
  screenPrice = +screenPrice;
  
  adaptive = (confirm("Do you need an adaptive site?"));

};

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const getAllServicePrices = function() {
  let sum = 0;
  let servcePrice;

  for (let i = 0; i < 2; i++) {

    if (i === 0){
      service1 = prompt("(1)What additional type of service is needed?"); 
    } else if (i === 1) {
      service2 = prompt("(2)What additional type of service is needed?");
    }

    do{
      servcePrice = prompt("How much will it cost?");
    } while(!isNumber(servcePrice));

    sum += +servcePrice;
  }
  
  return sum;
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

asking();
const allServicePrices = getAllServicePrices();

const fullPrice = getFullPrice(screenPrice, allServicePrices);

const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);


console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
