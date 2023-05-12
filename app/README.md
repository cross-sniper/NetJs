# Updates
v0.3:modules update
v0.2:initial release
v0.1:concept

## Overview
NetJS is a lightweight scripting language that is based on JavaScript. It is designed to be easy to learn and use, while still offering powerful features for web development. It consists of two parts: `netjs.linker.js` and `netjs.js`. 

`netjs.linker.js` is responsible for loading all the NetJS scripts in an HTML document and concatenating them into a single script. It defines a custom `<nts-j>` script tag that can be used to write NetJS code directly in an HTML document, or load a NetJS script from an external file. 

## Installation
To use NetJS, you need to include the `netjs.linker.js` and `netjs.js` scripts in your HTML document, like so:

```html
<script type="text/javascript" src="netjs.linker.js"></script>

<nts-j type="text/NetScript">
	<? NetJS code goes here ?>
</nts-j>

<script type="text/javascript" src="netjs.js"></script>
```



### Writing NetJS Code
NetJS code can be written in an HTML document using the custom `<nts-j>` script tag defined in `netjs.linker.js`. The `type` attribute of the tag should be set to `"text/NetScript"`. The code can be written directly in the tag, or loaded from an external file using the `src` attribute. 

```html
<nts-j type="text/NetScript">
	<? NetJS code goes here ?>
</nts-j>
```

### Modules
NetJS supports modules, which can be used to organize code into reusable components. Modules are defined in separate files with the `.nts` extension, and can be loaded using the `requires` function. The name of the module should match the name of the file.

```javascript
//math.nts
fun("add","a","b","return a + b");
fun("sub","a","b","return a - b");
fun("mul","a","b","return a * b");
fun("dib","a","b","return a / b");
```

```javascript
//app.nts
requires("math");

printf(add(20, 40)); //60
printf(sub(20, 40)); //-20
printf(mul(20, 40)); //800
printf(dib(20, 40)); //0.5
```

### Functions
NetJS functions can be defined using the `fun` keyword, followed by the function name, parameter names, and the function body. Functions can then be called using the function name and passing in the required parameters.

```javascript
fun("add", "a", "b", "return a + b");
printf(add(20, 40)); //60
```

### HTTP Requests
NetJS includes a `netcode` class that provides methods for making HTTP requests. The `http_get` and `http_post` methods take in a URL, data (for `http_post`), and a callback function to handle the response.

```javascript
const nc = new netcode();
nc.http_get("https://jsonplaceholder.typicode.com/todos/1", (data) => {
    printf(data);
});
```

```javascript
const nc = new netcode();
const data = JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1
});
nc.http_post("https://jsonplaceholder.typicode.com/posts", data, (data) => {
    printf(data);
});
```