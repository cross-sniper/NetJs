//netjs.js, made to simplify coding, and to act as a scripting language
function round(num, decimalPlaces) {
  return Number(Math.round(num + 'e' + decimalPlaces) + 'e-' + decimalPlaces);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function lerp(start, end, t) {
  return start + (end - start) * t;
}
function map(num, min1, max1, min2, max2) {
  return (num - min1) * (max2 - min2) / (max1 - min1) + min2;
}
function getRandomItem(arr) {
  return arr[random(arr.length)];
}

function random(...args){
  return Math.floor(Math.random() * args)
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function shuffle(arr) {
  let currentIndex = arr.length;
  let temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}
// Define the printf function for output
function printf(...args) {
  // Concatenate the arguments into a single string and append it to the console
  NetJSConsole.value += args.reduce((acc, cur) => acc.concat(cur), "") + "\n";
}

function on(action, doaction){
	this.addEventListener(action, doaction)
}

function set(varname,varvalue){
	window[varname] = varvalue
}

// Create an object to store custom functions
const customFunctions = {};

// Define a function to replace the 'fun' keyword
function fun(name, ...params) {
  // Define a new function with the given name and parameters
  const func = new Function(...params);
  // Add the function to the customFunctions object
  window[name] = func;
}

class netcode{
  constructor(){

  }
  http_get(url, callback) {
    const http = require("http");
    http.get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        callback(data);
      });
    });
  }

  http_post(url, data, callback) {
    const http = require("http");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };
    const request = http.request(url, options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        callback(data);
      });
    });
    request.write(data);
    request.end();
  }

}

netcode = new netcode()

// Define the 'run' function for executing code
async function run(code=null) {
  // Clear the console
  NetJSConsole.value = '';
  // Evaluate the code in the global scope
  await linkNetJSScripts()
  gscript += code
  eval(gscript);
}

async function execute(){
  await run()
}

// add an event listener to run the linker when the page is loaded
window.addEventListener('load', execute);
