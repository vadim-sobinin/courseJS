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
const totalNumber = Array.from(document.getElementsByClassName("total-input"))[1];
const totalCountOther = Array.from(document.getElementsByClassName("total-input"))[2];
const fullTotalCount = Array.from(document.getElementsByClassName("total-input"))[3];
const totalCountRollback = Array.from(document.getElementsByClassName("total-input"))[4];

let screens;




//Functions

const appData = {
  title: "",
  screens: new Array(),
  count: 0,
  screenPrice: 0,
  rollback: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  init: function(){
    
    appData.addTitle();
    // appData.checkBlankInputs();
    calculateBtn.addEventListener('click', appData.start);

    rollbackRange.addEventListener('input', appData.rollbackRangeChange);

    plusBtn.addEventListener('click', appData.addScreenBlock);
  },

  addTitle: function(){
    document.title = title.textContent;
  },

  start: function () {
    console.log("Start");
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
    totalCountRollback.value = appData.servicePercentPrice;
    totalNumber.value = appData.count;
    
  },

  addScreens: function(){
    appData.count = 0;

    appData.screens = [];

    screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen, index){
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent.split(" ")[0];

      appData.count++;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
      
    });

  },

  checkBlankInputs: function(){
    calculateBtn.disabled = "false";
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value == "") {
        calculateBtn.disabled = "true";
        console.log("Check select");
      }
      if (isNaN(input.value) || input.value == 0){
        calculateBtn.disabled = "true";
        console.log("Check input");
      }
    });
    
  },

  rollbackRangeChange: function(){
    rollbackRangeNumber.textContent = `${rollbackRange.value}%`;
    appData.rollback = +rollbackRange.value;
    appData.servicePercentPrice = Math.round(appData.fullPrice * ((100 - appData.rollback) / 100));
    totalCountRollback.value = appData.servicePercentPrice;

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
    appData.screenPrice = 0;
    appData.screenPrice = appData.screens.reduce(((total, item) =>  total + item.price), 0);

    for (let key in appData.servicesNumber){
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent){
      console.log(appData.screenPrice.price);
      // console.log(appData.servicesPercent[key]);
      appData.servicePricesPercent += appData.screenPrice.price * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

    appData.servicePercentPrice = Math.round(appData.fullPrice * ((100 - appData.rollback) / 100));

  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
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







