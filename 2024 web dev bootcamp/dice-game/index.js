var randomNumber1 = Math.floor(Math.random() * 6);
var randomNumber2 = Math.floor(Math.random() * 6);
var diceImages = ["./images/dice1.png", "./images/dice2.png", "./images/dice3.png", "./images/dice4.png", "./images/dice5.png", "./images/dice6.png"];

for (var i=0; i<1; i++) {
    document.querySelector("#dice1 .img1").setAttribute("src", diceImages[randomNumber1]);
    document.querySelector("#dice2 .img2").setAttribute("src", diceImages[randomNumber2]);
    if (randomNumber1>randomNumber2) {
        document.querySelector("h1").textContent = "Player 1 wins"
    } else if (randomNumber1<randomNumber2) {
        document.querySelector("h1").textContent = "Player 2 wins"
    } else if (randomNumber1==randomNumber2) {
        document.querySelector("h1").textContent = "Draw"
    } else {
        console.log("Error")
    }
}