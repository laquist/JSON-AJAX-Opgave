// JSON Links: 
// https://learnwebcode.github.io/json-example/animals-1.json
// https://learnwebcode.github.io/json-example/animals-2.json
// https://learnwebcode.github.io/json-example/animals-3.json

var pageCounter = 1;
//getElementById gør at du kan gøre noget med det html element som har det id
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {
    var ourRequest = new XMLHttpRequest();
    //ved ourRequest.open, så skal du skrive GET hvis du vil hente data, og POST hvis du vil skrive data
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter +'.json');
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 &&  ourRequest.status < 400) {
            //JSON.parse laver vores JSON til objekter i stedet for bare rå tekst. Jeg går ud fra den separerer ved start { og slut }, og gør det til 1 objekt.
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        }
        else {
            console.log("We connected to the server, but it returned an error.");
        }
    };
    
    ourRequest.onerror = function () {
        console.log("Connection error");
    };

    //ourRequet.send, sender bare den request som vi har lavet ovenover. Så det er bare en slags, Send/Apply/Try knap. Her går vi jo bare ud fra at den virker, og at vi får den data vi ønsker.
    //husk .send er en metode der hører til XMLHttpRequest.
    ourRequest.send();
    pageCounter++;

    if (pageCounter > 3) {
        //classList.add vil tilføje en ny css class til det html element. Her vil det være class "hide-me"
        btn.classList.add("hide-me");  
    }
});

function renderHTML(data) {
    var htmlString = "";

    for (i=0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

        for (ii = 0; ii < data[i].foods.likes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii];
            }
            else {
                htmlString += " and " + data[i].foods.likes[ii];
            } 
        }

        htmlString += " and dislikes ";

        for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];
            }
            else {
                htmlString += " and " + data[i].foods.dislikes[ii];
            } 
        }
        
        htmlString += ".</p>"
    };

    // insertAdjacentHTML() parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.
    // element.insertAdjacentHTML(position, text);
    // Ved position findes der: beforebegin, afterbegin, beforeend, afterend -- se her for forklaring: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}