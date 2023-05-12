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
// Define the printf function for output
function printf(...args)
{
  // Concatenate the arguments into a single string and append it to the console
  console.log(args.reduce((acc, cur) => acc.concat(cur), ""));
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function requires(moduleName) {
  // Read the module code from a file with the same name as the module
  const fs = require('fs');
  const path = require('path');
  const modulePath = path.resolve(__dirname, `${moduleName}`);
  const moduleCode = fs.readFileSync(modulePath, 'utf8');
  
  // Evaluate the module code in the current scope
  eval(moduleCode);

  // Add any exported variables and functions to the global scope
  if (typeof exporting !== 'undefined') {
    for (let i = 0; i < exporting.length; i++) {
      const name = exporting[i];
      global[name] = eval(name);
    }
  }
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

function on_err(doaction)
{
  try {
    doaction();
  } catch (error) {
    console.error(error);
  }
}
function on(action, doaction)
{
    this.addEventListener(action, doaction)
}

function set(varname,varvalue)
{
    global[varname] = varvalue
}
// Define a function to replace the 'fun' keyword
function fun(name, ...params)
{
    // Define a new function with the given name and parameters
    const func = new Function(...params);
    // Add the function to the customFunctions object
    global[name] = func;
}

// Read the NetJS code from the file passed as argument
const fs = require('fs');
const path = require('path');
const filePath = process.argv[2];
const code = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
class netcode {
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
  http_request(method, url, data, headers, callback) {
    const http = require("http");
    const options = {
      method: method.toUpperCase(),
      headers: headers || {},
    };
    if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
      options.headers["Content-Type"] = "application/json";
      options.headers["Content-Length"] = data ? data.length : 0;
    }
    const request = http.request(url, options, (response) => {
      let responseData = "";
      response.on("data", (chunk) => {
        responseData += chunk;
      });
      response.on("end", () => {
        const result = {
          statusCode: response.statusCode,
          headers: response.headers,
          data: responseData,
        };
        callback(result);
      });
    });
    request.on("error", (error) => {
      console.error(error);
      callback(null, error);
    });
    if (data) {
      request.write(data);
    }
    request.end();
  }

  http_get(url, callback) {
    this.http_request("GET", url, null, null, callback);
  }

  http_post(url, data, headers, callback) {
    this.http_request("POST", url, JSON.stringify(data), headers, callback);
  }

  http_put(url, data, headers, callback) {
    this.http_request("PUT", url, JSON.stringify(data), headers, callback);
  }

  http_delete(url, callback) {
    this.http_request("DELETE", url, null, null, callback);
  }
}


netcode = new netcode()
// Evaluate the code in the global scope
eval(code);
