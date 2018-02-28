/** builds a simple web component with ES5 syntax */

export const buildHelloElement = function buildHelloElement(username) {
  const HelloWorld = document.registerElement('hello-world');

  var hello = new HelloWorld();

  const helloShadow = hello.attachShadow({mode: "open"});
  helloShadow.innerHTML += `<h1>Username: ${username}</h1>`;

  document.body.appendChild(hello);
};
