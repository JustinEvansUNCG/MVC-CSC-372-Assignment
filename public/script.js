"use strict";

const category_form = document.getElementById("category-btn");
category_form.addEventListener("click", categoryGetter);

const rand_form = document.getElementById("random-button");
rand_form.addEventListener("click", randomHandler);

const category_joke_form = document.getElementById("get-by-category-form");
category_joke_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const form_data = event.target.type.value;
    console.log(form_data);
    fetch(`http://localhost:3000/jokebook/joke?type=` + form_data + "&quantity=" + event.target.quantity.value)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Invalid joke type");
            }
            return response.json();
        })
        .then((data) => { // Process the retrieved data
            console.log("My Data:", data[0]["setup"]);
            document.getElementById("joke").innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                document.getElementById("joke").innerHTML += data[i]["setup"] + `<br>` + data[i]["delivery"] + `<br><br>`;
            }

            document.getElementById("joke-box").style.display = "block";
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("joke").innerHTML = "Invalid joke type entered";
            document.getElementById("joke-box").style.display = "block";
        });
})

function randomHandler() {
    fetch(`http://localhost:3000/jokebook/random`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => { // Process the retrieved data
            console.log("My Data:", data[0]["setup"]);
            document.getElementById("joke").innerHTML = data[0]["setup"] + `<br>` + data[0]["delivery"];
            document.getElementById("joke-box").style.display = "block";
        })
        .catch((error) => {
            console.error("Error:", error);
        });

}

function categoryGetter() {
    fetch(`http://localhost:3000/jokebook/categories`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => { // Process the retrieved data
            document.getElementById("joke").innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                document.getElementById("joke").innerHTML += data[i]["type"] + `<br>`;
            }

            
            document.getElementById("joke-box").style.display = "block";
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}


const joke_add_form = document.getElementById("adder-form");
joke_add_form.addEventListener("submit", function(event) {
    event.preventDefault();

    const setup = event.target.setup.value;
    const delivery = event.target.delivery.value;
    const joke_type = event.target.joke_type.value;
    console.log(setup + " " + delivery);

    const add_form = new FormData(joke_add_form);
    let form_info = JSON.stringify(Object.fromEntries(add_form));

    console.log(form_info);
    fetch(`http://localhost:3000/jokebook/joke/add`, {
        method: "POST",
        headers: { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json" },
        body: form_info

    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Field empty or invalid joke type!");
            }
            return response.json();
        })
        .then((data) => { // Process the retrieved data
        })
        .catch((error) => {
            document.getElementById("joke").innerHTML = error;
            console.error("Error:", error);
            document.getElementById("joke-box").style.display = "block";
        });
})
