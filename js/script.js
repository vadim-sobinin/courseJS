"use strict";

const title = document.getElementsByTagName("h1")[0];

const calculateBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");

const extrasPercent = document.querySelectorAll(".other-items.percent");
const extrasNumber = document.querySelectorAll(".other-items.number");

const rollbackRange = document.querySelector(
  ".rollback > .main-controls__range > input[type='range']"
);
const rollbackRangeNumber = document.querySelector(
  ".rollback > .main-controls__range > span"
);

const total = Array.from(document.getElementsByClassName("total-input"))[0];
const totalNumber = Array.from(
  document.getElementsByClassName("total-input")
)[1];
const totalCountOther = Array.from(
  document.getElementsByClassName("total-input")
)[2];
const fullTotalCount = Array.from(
  document.getElementsByClassName("total-input")
)[3];
const totalCountRollback = Array.from(
  document.getElementsByClassName("total-input")
)[4];

let screens = document.querySelectorAll(".screen");

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
  isAnyBlankInputs: false,

  init: function () {
    this.addTitle();
    this.addEventListeners();
    this.checkBlankInputs();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    console.log("Start");

    appData.blockAfterCalculation();
    appData.addScreens();
    appData.addServices();

    appData.addPrices();
    appData.showResult();
  },

  reset: function () {
    appData.removeSreenBlocks();
    appData.nullValues();
    appData.cleanInputs();
    appData.returnButton();
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalNumber.value = this.count;
  },

  addEventListeners: function () {
    calculateBtn.addEventListener("click", this.start);

    rollbackRange.addEventListener("input", this.rollbackRangeChange);

    plusBtn.addEventListener("click", this.addScreenBlock);

    screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      select.addEventListener("change", this.checkBlankInputs);
      input.addEventListener("input", this.checkBlankInputs);
    });

    resetBtn.addEventListener("click", appData.reset);
  },

  addScreens: function () {
    this.count = 0;

    this.screens = [];

    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      const selectName =
        select.options[select.selectedIndex].textContent.split(" ")[0];

      this.count++;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },

  blockAfterCalculation: function () {
    const allInputs = document.querySelectorAll("input[type=text]");
    const allSelects = document.querySelectorAll("select");
    calculateBtn.style.display = "none";
    allInputs.forEach((input) => input.setAttribute("disabled", true));
    allSelects.forEach((input) => input.setAttribute("disabled", true));
    resetBtn.style.display = "block";
  },

  checkBlankInputs: function () {
    // console.log("Checking...");
    this.isAnyBlankInputs = false;

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value == "") {
        this.isAnyBlankInputs = true;
        // console.log("Check select input!");
      }
      if (isNaN(input.value) || input.value == 0) {
        this.isAnyBlankInputs = true;
        // console.log("Check input field!");
      }
    });

    if (this.isAnyBlankInputs) {
      calculateBtn.setAttribute("disabled", true);
      calculateBtn.style.backgroundColor = "gray";
      calculateBtn.style.cursor = "not-allowed";
    } else {
      calculateBtn.removeAttribute("disabled");
      calculateBtn.style.backgroundColor = "#A52A2A";
      calculateBtn.style.cursor = "pointer";
    }
  },

  rollbackRangeChange: function () {
    rollbackRangeNumber.textContent = `${rollbackRange.value}%`;
    appData.rollback = +rollbackRange.value;
    appData.servicePercentPrice = Math.round(
      appData.fullPrice * ((100 - appData.rollback) / 100)
    );
    totalCountRollback.value = appData.servicePercentPrice;
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.classList.add("created-screen");
    screens[screens.length - 1].after(cloneScreen);
    appData.addEventListeners();
    appData.checkBlankInputs();
  },

  removeSreenBlocks: function () {
    const createdScreens = document.querySelectorAll(".created-screen");
    createdScreens.forEach((screen) => screen.remove());
  },

  addServices: function () {
    extrasPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    extrasNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    this.screenPrice = 0;
    this.screenPrice = this.screens.reduce(
      (total, item) => total + item.price,
      0
    );

    this.servicePricesNumber = 0;
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    this.servicePricesPercent = 0;
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice = Math.round(
      this.fullPrice * ((100 - this.rollback) / 100)
    );
  },

  nullValues: function () {
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.count = 0;
    appData.showResult();

    rollbackRange.value = 0;
    appData.rollbackRangeChange();
  },

  cleanInputs: function () {
    const checkboxes = document.querySelectorAll(".custom-checkbox");
    checkboxes.forEach((checkbox) => (checkbox.checked = false));

    const select = screens[0].querySelector("select");
    const input = screens[0].querySelector("input");
    input.value = "";

    select.selectedIndex = 0;
    select.removeAttribute("disabled");
    input.removeAttribute("disabled");

    console.dir(select);
  },

  returnButton: function () {
    resetBtn.style.display = "none";
    calculateBtn.style.display = "block";
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  showTypeOf: function (variable) {
    return typeof variable;
  },

  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  },
};

appData.init();
