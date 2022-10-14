"use strict";

//Functions

const appData = {
  title: "",
  screens: new Array(),
  screenPrice: 0,
  rollback: 20,
  adaptive: true,
  services: {},
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  start: function () {
    
    appData.asking();

    appData.getAllServicePrices();

    appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    );

    appData.getServicePercentPrices(
      appData.fullPrice,
      appData.rollback
    );

    appData.getTitle();

    appData.logger();
  },

  asking: function () {
    do {
      appData.title = prompt("What is the name of your project?");
    } while (appData.title === null);
    

    appData.screenPrice = +appData.screenPrice;

    appData.adaptive = confirm("Do you need an adaptive site?");

    for (let i = 0; i < 2; i++){
      let name = prompt("What types of screens need to be developed?");
      let price = 0;

      do {
        price = +prompt("How much will this work cost?($)", "100");
        console.log(price);
      } while (!appData.isNumber(price));

      appData.screens.push({id: i, name: name, price: price});
    }
    console.log(appData.screens);
    appData.screenPrice = appData.screens.reduce(((total, item) => total + item.price));
    console.log("screens: " + appData.screenPrice);

    for (let i = 0; i < 2; i++) {
      let price = 0;
      let name  = prompt(
        `(${i+1})What additional type of service is needed?`
      );

      do {
        price = prompt("How much will it cost?");
      } while (!appData.isNumber(price));

      appData.services[name] = price;
    }

  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getAllServicePrices: function () {
    
    for (let key in appData.services){
      appData.allServicePrices += appData.services[key];
    }

  },

  getFullPrice: function (screenPrice, allServicePrices) {
    appData.fullPrice = screenPrice + allServicePrices;
  },

  getTitle: function (title) {
    appData.title = title
      .trim()
      .split("")
      .reduce((total, letter, index) => {
        return index === 0
          ? total + letter.toUpperCase()
          : total + letter.toLowerCase();
      }, "");
  },

  getServicePercentPrices: function (fullPrice, servicePercentPrice) {
    appData.servicePercentPrice =  fullPrice - Math.round(fullPrice * (appData.rollback / 100));
  },

  getRollbackMessage: function (fullPrice) {
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

  showTypeOf: function (variable) {
    return typeof variable;
  },

  logger: function () {
    
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);

    
  },
};


appData.start();






