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
      // console.log(appData.title);
      //   console.log(!appData.areAllLetters(appData.title));
      //   console.log(!isNaN(appData.title));
    } while (!isNaN(appData.title) || !appData.areAllLetters(appData.title));
    

    appData.screenPrice = +appData.screenPrice;


    for (let i = 0; i < 2; i++){
      let name;
      let price = 0;

      do {
        name = prompt("What types of screens need to be developed?");
        // console.log(name);
        // console.log(!appData.areAllLetters(name));
        // console.log(!isNaN(name));

      } while (!isNaN(name) || !appData.areAllLetters(name));
      
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
        // console.log(name);
        // console.log(!appData.areAllLetters(name));
        // console.log(!isNaN(name));
      } while (!isNaN(name) || !appData.areAllLetters(name));

      do {
        price = +prompt("How much will it cost?");
      } while (!appData.isNumber(price));

      appData.services[i] = {name: name, price: price};
    }

    appData.adaptive = confirm("Do you need an adaptive site?");

  },

  areAllLetters: function(word){
    let res = 0;
    word.split("").forEach(char => {
      // console.log(char);
      // console.log(char.charCodeAt(0));
      if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 122 || char.charCodeAt(0) >= 1040 && char.charCodeAt(0) <= 1103){
        res++;
      }
    });
    if (res === word.length){
      // console.log("All symbols are letters");
      return true;
    } else {
      // console.log("There are non letter symbol");
      return false;
    }
    
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


appData.start();






