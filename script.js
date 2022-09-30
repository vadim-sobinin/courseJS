let title = "Sites";
let screens = "Simple, Complex, Interactive";
let screenPrice = 100;
let rollback = 20;
let fullPrice = 120;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Layouts price is " + screenPrice + " USD.");
console.log("Site development price is " + fullPrice + " USD.");
console.log(screens.toLowerCase().split(", "));
console.log("Percentage of payback to the broker for the work: " + (fullPrice * (rollback / 100)));
