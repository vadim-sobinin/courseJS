"use strict";
let title;
let screens;
let screenPrice;
const rollback = 20;
let adaptive;
let service1;
let service2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
//Functions

const appData = {
  asking: function () {
    do{
      title = prompt("What is the name of your project?");
    } while (title === null);
    do{
      screens = prompt("What types of screens need to be developed?", "Simple, Complex, Interactive");
    } while (screens === null);
  
    do {
      screenPrice = prompt("How much will this work cost?($)", "100");
    } while (!appData.isNumber(screenPrice));
  
    screenPrice = +screenPrice;
  
    adaptive = (confirm("Do you need an adaptive site?"));
  
  },

  isNumber : function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getAllServicePrices : function () {
    let sum = 0;
    let servcePrice;
  
    for (let i = 0; i < 2; i++) {
  
      if (i === 0) {
        do{
          service1 = prompt("(1)What additional type of service is needed?");
        } while (service1 === null);
      } else if (i === 1) {
        do{
          service2 = prompt("(2)What additional type of service is needed?");
        } while (service2 === null);
      }
  
      do {
        servcePrice = prompt("How much will it cost?");
      } while (!appData.isNumber(servcePrice));
  
      sum += +servcePrice;
    }
  
    return sum;
  },

  getFullPrice: function(screenPrice, allServicePrices) {
    return screenPrice + allServicePrices;
  },

  getTitle: function(title) {
    return title.trim().split("").reduce((total, letter, index) => {
      return index === 0 ? total + letter.toUpperCase() : total + letter.toLowerCase();
    }, "");
  },

  getServicePercentPrices: function(fullPrice, servicePercentPrice) {
    return fullPrice - Math.round((fullPrice * (rollback / 100)));
  },

  getRollbackMessage: function(fullPrice) {
    if (fullPrice >= 500) {
      return "Your discount is 10%";
    } else if (fullPrice >= 250) {
      return "Your discount is 5%";
    } else if (fullPrice >= 0 && fullPrice < 250) {
      return "You have no discount.";
    } else {
      return "Oops... Something went wrong.";
    }
  },

  showTypeOf: function(variable) {
    return typeof variable;
  }, 

  start: function() {
    appData.asking();
    
    allServicePrices = appData.getAllServicePrices();

    fullPrice = appData.getFullPrice(screenPrice, allServicePrices);

    servicePercentPrice = appData.getServicePercentPrices(fullPrice, rollback);

    appData.logger();

  }, 

  logger: function(){
    console.log(appData.showTypeOf(title));
    console.log(appData.showTypeOf(fullPrice));
    console.log(appData.showTypeOf(adaptive));
    console.log(screens.toLowerCase().split(", "));
    console.log(appData.getRollbackMessage(fullPrice));
    console.log(servicePercentPrice);

    for (const key in appData) {
      console.log(appData[key]);
    }
  }

};


appData.start();






