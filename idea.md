## Overview
NetJS is a lightweight scripting language that is based on JavaScript. It is designed to be easy to learn and use, while still offering powerful features for web development. It consists of two parts: `netjs.linker.js` and `netjs.js`. 

`netjs.linker.js` is responsible for loading all the NetJS scripts in an HTML document and concatenating them into a single script. It defines a custom `<nts-j>` script tag that can be used to write NetJS code directly in an HTML document, or load a NetJS script from an external file. 

`netjs.js` provides a set of functions and a custom syntax that can be used to write NetJS code. It defines functions like `printf()` and `on()` that can be used to simplify coding, and provides a custom syntax for defining functions using the `fun` keyword. It also provides an `execute()` function that runs the concatenated NetJS code loaded by `netjs.linker.js`.

## Installation
To use NetJS, you need to include the `netjs.linker.js` and `netjs.js` scripts in your HTML document, like so:

```html
<script type="text/javascript" src="netjs.linker.js"></script>

<nts-j type="text/NetScript">
	<? NetJS code goes here ?>
</nts-j>

<script type="text/javascript" src="netjs.js"></script>
```

## Usage

### Writing NetJS Code
NetJS code can be written in an HTML document using the custom `<nts-j>` script tag defined in `netjs.linker.js`. The `type` attribute of the tag should be set to `"text/NetScript"`. The code can be written directly in the tag, or loaded from an external file using the `src` attribute. 

```html
<nts-j type="text/NetScript">
	<? NetJS code goes here ?>
</nts-j>
```

### Defining Functions
NetJS provides a custom syntax for defining functions using the `fun` keyword. The `fun` keyword takes a function name and any number of parameters as arguments, and defines a new function with the given name and parameters. 

```javascript
fun greet(name) {
  printf("Hello, ", name, "!");
}
```

### Outputting Messages
NetJS provides a `printf()` function that can be used to output messages to the console. The function takes any number of arguments and concatenates them into a single string, which is then appended to the `NetJSConsole` element.

```javascript
printf("Hello, world!");
```

### Adding Event Listeners
NetJS provides an `on()` function that can be used to add event listeners to elements. The function takes two arguments: the name of the event, and the function to be executed when the event is triggered.

```javascript
on("click", function() {
  printf("Button clicked!");
});
```

### Creating Global Variables
NetJS provides a `set()` function that can be used to create global variables with the specified name and value.

```javascript
set("name", "John");
printf(name); // Output: John
```

### Running NetJS Code
NetJS provides an `execute()` function that can be used to run the concatenated NetJS code loaded by `netjs.linker.js`. 

```javascript
execute();
```

## Requirements
To run NetJS with the `src` attribute, you need to have `live-server` installed on your system. You can install it using the following command:

```bash
npm install -g live-server
```

## Credits
NetJS was developed by Cross the Hedgehog (cts.neolang.br@gmail.com).