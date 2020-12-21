const canvas = document.getElementById("app");

var para = document.createElement("p");
var node = document.createTextNode("This is new.");
para.appendChild(node);

var element = document.getElementById("app");
element?.appendChild(para);

const newPara = document.createElement("p");
const newNode = document.createTextNode("This is newer.");
newPara.appendChild(newNode);
element?.appendChild(newPara);