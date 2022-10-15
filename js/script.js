"use strict";

const title = document.getElementsByTagName("h1")[0].innerHTML;
const calculateBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");
const extrasPercent = document.querySelectorAll(".other-items.percent");
const extrasNumber = document.querySelectorAll(".other-items.number");
const rollbackRange = document.querySelector(".rollback > .main-controls__range > input[type='range']");
const rollbackRangeNumber = document.querySelector(".rollback > .main-controls__range > span");
const totalInputs = Array.from(document.getElementsByClassName("total-input"));
let screens = document.querySelectorAll(".screen")
console.log(screens);



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

    appData.addPrices();

    appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    );

    appData.getServicePercentPrices(
      appData.fullPrice,
      appData.rollback
    );

    appData.getTitle(appData.title);

    appData.logger();
  },

  asking: function () {
    do {
      appData.title = prompt("What is the name of your project?");
    } while (!isNaN(appData.title));
    

    appData.screenPrice = +appData.screenPrice;


    for (let i = 0; i < 2; i++){
      let name;
      let price = 0;

      do {
        name = prompt("What types of screens need to be developed?");
      } while (!isNaN(name));
      
      do {
        price = +prompt("How much will this work cost?($)", "100");
      } while (!appData.isNumber(price));

      appData.screens.push({id: i, name: name, price: price});
    }
    

    for (let i = 0; i < 2; i++) {
      let price = 0;
      let name;

      do {
        name  = prompt(
          `(${i+1})What additional type of service is needed?`
        );
      } while (!isNaN(name));

      do {
        price = +prompt("How much will it cost?");
      } while (!appData.isNumber(price));

      appData.services[i] = {name: name, price: price};
    }

    appData.adaptive = confirm("Do you need an adaptive site?");

  },

  addPrices: function(){
    appData.screenPrice = appData.screens.reduce(((total, item) => total.price + item.price));

    for (let key in appData.services){
      appData.allServicePrices += appData.services[key].price;
    }
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },


  getFullPrice: function (screenPrice, allServicePrices) {
    appData.fullPrice = Number(screenPrice) + Number(allServicePrices);
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









