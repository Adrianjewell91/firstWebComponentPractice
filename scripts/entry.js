document.addEventListener("DOMContentLoaded", function(e) {
  console.log(e);
  buildElement();

});

function buildElement() {

  const HelloWorld = document.registerElement('hello-world');

  var hello = new HelloWorld();

  const helloShadow = hello.attachShadow({mode: "open"});
  helloShadow.innerHTML = "<h1>This is information in my custom element</h1>";

  document.body.appendChild(hello);

}
