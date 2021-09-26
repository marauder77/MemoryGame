const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

//Copied most of this from the solution. couldn't figure any of it out on my own. 
//Hopefully I can come back to it and submit my own game with my own code later on
//but I need to move on.

function handleCardClick(e) {
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!card1 || !card2) {
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
        noClicking = true;
        let gif1 = card1.className;
        let gif2 = card2.className;

        if (gif1 === gif2) {
            cardsFlipped += 2;
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 500);
        }
    }

    if (cardsFlipped === COLORS.length) alert("game over!");
}

createDivsForColors(shuffledColors);


//CSS I wrote and adjusted from the provided code 

// #game div {
//     border - radius: 50px;
//     border: 1px solid black;
//     width: 15 %;
//     height: 200px;
//     margin: 20px;
//     display: inline - block;
//     background - color: white;
//     padding: 10px 9px;
// }

// body {
//     background - color: #0594c3;
// }

// h1 {
//     text - align: center;
//     font - family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans - serif;
//     font - size: 100px;
//     font - style: normal;
//     font - variant: normal;
//     font - weight: 100;
//     line - height: 30px;
// }
