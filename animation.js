const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const car1 = document.getElementById("car1")
const car2 = document.getElementById("car2")

let buttonclicked1 = false;

button1.addEventListener('click', () => {
    if (buttonclicked1) {
        car1.style = "animation: in 5s forwards";
        buttonclicked1 = false;
    } else {
        car1.style = "animation: out 5s forwards";
        buttonclicked1 = true;
    }
});

let buttonclicked2 = false;

button2.addEventListener('click', () => {
    if (buttonclicked2) {
        car2.style = "animation: in 5s forwards";
        buttonclicked2 = false;
    } else {
        car2.style = "animation: out 5s forwards";
        buttonclicked2 = true;
    }
});