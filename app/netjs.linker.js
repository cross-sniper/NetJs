// netjs.linker.js

let gscript
// define the custom NetJS script tag
var NetJSTag = document.createElement('nts-j');
// define the NetJS linker function
async function linkNetJSScripts() {
  gscript = ""
  // find all the NetJS script tags in the document
  var scripts = document.getElementsByTagName('nts-j');

  // loop through each script tag and load the script
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    script.style.display = 'none'

    // check if the script has a "src" attribute
    if (script.hasAttribute('src')) {
      // load the script from the external file asynchronously
      await fetch(script.getAttribute('src')).then(response => response.text()).then(data => {
        script.textContent = data;
      }).catch(error => {
        console.error(`Failed to load script ${script.getAttribute('src')}: ${error}`);
      });
    }

    // evaluate the script
    var code = script.textContent;
    gscript += code;
  }
}

