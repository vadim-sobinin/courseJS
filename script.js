"use strict";

const title = prompt("What is the name of your project?");
const screens = prompt("What types of screens need to be developed?", "Simple, Complex, Interactive");
const screenPrice = +prompt("How much will this work cost?($)", "100");
const adaptive = (prompt("Do you need an adaptive site?", "true")) === "true" ? true : false; 
const rollback = 20;
const service1 = prompt("(1)What additional type of service is needed?");
const servicePrice1 = +prompt("(1)How much will it cost?");
const service2 = prompt("(2)What additional type of service is needed?");
const servicePrice2 = +prompt("(2)How much will it cost?");

const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.round((fullPrice * (rollback / 100)));


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Layouts price is " + screenPrice + " USD.");
console.log("Site development price is " + fullPrice + " USD.");
console.log(screens.toLowerCase().split(", "));
console.log("Percentage of payback to the broker for the work: " + (fullPrice * (rollback / 100)));


// Lesson 3

console.log(adaptive);
console.log(servicePercentPrice);

if (fullPrice >= 500) {
  console.log("Your discount is 10%");
} else if (fullPrice >= 250) {
  console.log("Your discount is 5%");
} else if (fullPrice >= 0 && fullPrice < 250) {
  console.log("You have no discount.");
} else {
  console.log("Oops... Something went wrong.");
}