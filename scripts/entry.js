document.addEventListener("DOMContentLoaded", function(e) {
  console.log(e);
  buildElement();

});


function getData() {
  let data = fetch('https://randomuser.me/api/').then((r) => r.json())
                                                      .then((r) => r);
  // debugger;
  return data;
}

async function buildElement() {

  const HelloWorld = document.registerElement('hello-world');

  var hello = new HelloWorld();

  var data = await getData();
  var results = data.results[0].login.username;


  const helloShadow = hello.attachShadow({mode: "open"});
  helloShadow.innerHTML = "<h1>This is a random user that from random users API:</h1>";
  helloShadow.innerHTML += `<h1>${results}</h1>`;

  document.body.appendChild(hello);
}


//Make a XhR request with async await
