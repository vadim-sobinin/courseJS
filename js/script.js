"use strict";

const title = document.getElementsByTagName("h1")[0];

const calculateBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");

const extrasPercent = document.querySelectorAll(".other-items.percent");
const extrasNumber = document.querySelectorAll(".other-items.number");

const rollbackRange = document.querySelector(".rollback > .main-controls__range > input[type='range']");
const rollbackRangeNumber = document.querySelector(".rollback > .main-controls__range > span");

const total = Array.from(document.getElementsByClassName("total-input"))[0];
const totalCount = Array.from(document.getElementsByClassName("total-input"))[1];
const totalCountOther = Array.from(document.getElementsByClassName("total-input"))[2];
const fullTotalCount = Array.from(document.getElementsByClassName("total-input"))[3];
const totalCountRollback = Array.from(document.getElementsByClassName("total-input"))[4];

let screens = document.querySelectorAll(".screen");




//Functions

const appData = {
  title: "",
  screens: new Array(),
  screenPrice: 0,
  rollback: 20,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  init: function(){
    
    appData.addTitle();

    calculateBtn.addEventListener('click', appData.start);

    plusBtn.addEventListener('click', appData.addScreenBlock);
  },

  addTitle: function(){
    document.title = title.textContent;
  },

  start: function () {
    
    appData.addScreens();
    appData.addServices();

    appData.addPrices();
    // appData.getServicePercentPrices(
    //   appData.fullPrice,
    //   appData.rollback
    // );
    // appData.logger();
    console.log(appData);
    appData.showResult();
  },

  showResult: function(){
    total.value = appData.screenPrice.price;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    
  },

  addScreens: function(){
    screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen, index){
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent.split(" ")[0];
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
      
    });

  },

  addScreenBlock: function(){
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addServices: function(){
    extrasPercent.forEach(function(item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked){
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    extrasNumber.forEach(function(item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked){
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
    
  },

  addPrices: function(){
    appData.screenPrice = appData.screens.reduce(((total, item) => total + item));

    for (let key in appData.servicesNumber){
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent){
      console.log(appData.screenPrice.price);
      // console.log(appData.servicesPercent[key]);
      appData.servicePricesPercent += appData.screenPrice.price * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice.price + appData.servicePricesPercent + appData.servicePricesNumber;
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
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

appData.init();







