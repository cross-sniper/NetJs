//netjs.js, made to simplify coding, and to act as a scripting language

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
