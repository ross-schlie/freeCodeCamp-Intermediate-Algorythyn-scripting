/**
 * Convert the characters &, <, >, " (double quote), and ' (apostrophe), 
 * in a string to their corresponding HTML entities.
 * @param {String} str 
 * @return {String} - The converted string
 */
function convertHTML(str) {
  // const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"};
  const ENTITIES = [ 
    ["&", "&amp;"],
    ["<", "&lt;"], 
    [">", "&gt;"], 
    ['"', "&quot;"], 
    ["'", "&apos;"]
  ];

  ENTITIES.forEach(function(key) {
    str = str.replaceAll(key[0], key[1]);
  });

  // console.log(str);
  return str;
}

convertHTML("Dolce & Gabbana");