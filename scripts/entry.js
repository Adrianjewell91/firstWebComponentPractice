document.addEventListener("DOMContentLoaded", function(e) {
  console.log(e);
  var HelloWorldElement = document.registerElement('hello-world');
  document.body.appendChild(new HelloWorldElement());

});
