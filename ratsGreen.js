let timeToNextGreen = 0;
let greenInterval = 500;
let lastTimeGreen = 0;

let green = [];

class Green {
    constructor(){
        this.greenSpriteWidth = 40;
        this.greenSpriteHeight = 40;
        this.width = 40;
        this.height = 40;
        this.x = canvas.width;
        this.y = Math.random() * (280 - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;

        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'RatGreen.png';
        this.frame = 0;
        this.maxFrame = 3;
        this.timeSinceRun = 0;
        this.runInterval = Math.random() * 50 + 50;
        this.counted = false;
        this.sound = 'sound1'

    }
    update(deltatime){
        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1
        }
        this.x -= this.directionX;
        this.y -= this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceRun += deltatime;
        if (this.timeSinceRun > this.runInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceRun = 0;
        }
    }
    draw(){
        ctx.drawImage(this.image, 45, 50, this.greenSpriteWidth, this.greenSpriteHeight, this.x, 120+this.y, this.width, this.height);
    }
}

//green animation

function animateGreen(timestamp){
    let deltatime = timestamp - lastTimeGreen;
    lastTimeGreen = timestamp;
    timeToNextGreen += deltatime;
    if (timeToNextGreen > greenInterval){
        green.push(new Green());
        timeToNextGreen = 0;
    };
    [...green].forEach(object => object.update(deltatime));
    [...green].forEach(object => object.draw());
    green = green.filter(object => !object.markedForDeletion);

    animationIDGreen = requestAnimationFrame(animateGreen);

}


// +5 points for catching Green rats 

function caughtGreen(first, second){
    return !( first.x > second.x + second.width ||
        first.x + (first.width*first.frameX) < second.x ||
        first.y > (120+second.y) + second.height ||
        first.y + (first.height*first.frameY) < (120+second.y))
}

function getPointsG() {
    for (let i = 0; i< green.length; i++){
        if (caughtGreen(cat, green[i])){
            if(!green[i].counted){
            if(green[i].sound == 'sound1'){
                catMeow.play();
            }
            score += 5;
            green[i].counted = true;
            green.splice(i, 1);
        }}
}}


// -5 points for rats eating cheese

function greenEatCheese(first, second){
    return !( first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > (120+second.y) + second.height ||
        first.y + first.height < (120+second.y))
}

function losePointsG() {
    for (let i = 0; i< green.length; i++){
        if (greenEatCheese(cheeseTable, green[i])){
            if(!green[i].counted){
            if(green[i].sound == 'sound1'){
                ratNoise.play();
            }
            score -= 5;
            ratEatCheeseCount++;
            green[i].counted = true;
            green.splice(i, 1);
        }}
}}


//Start Game

function startGame (){
    startGameUI.style.display = 'none';
    gameOverUI.style.display = 'none';
    startAnimating(40);
    animateRats(0);
    animateGreen(0);
    currentTime = 60;
    clearInterval(countDownTimerId);
    countDownTimerId = setInterval(countdown, 1000);
    mySound.play();
    mySound.volume = 0.6;
    
}


window.addEventListener('DOMContentLoaded', ()=>{
    mySound.play();
    mySound.volume = 0.6;
})  


startButton.addEventListener('click', startGame);

//restart game

const init = () => {
    currentTime = 30;
    clearInterval(countDownTimerId);
    countDownTimerId = setInterval(countdown, 1000);
    keys = [];
    rats = [];
    score = 0;
    ratEatCheeseCount = 0;
}


//countdown timer

function drawTime(){
    ctx.textAlign = 'center';
    ctx.fillStyle = 'tan';
    ctx.font = '16px Arial';
    ctx.fillText(currentTime, 564, 38);

}

let currentTime = 15;


function countdown() {
    currentTime--;

    if(currentTime == 0) {
        clearInterval(countDownTimerId);
        cancelAnimationFrame(animationIDRats);
        cancelAnimationFrame(animationIDGreen);
        mySound.volume = 0.2;
        gameOverUI.style.display = 'initial';
        finalScore.innerHTML = score;

        restart.addEventListener('click', ()=>{
            init();
            startAnimating(40);
            animateRats(0);
            animateGreen(0);
            mySound.play();
            mySound.volume = 0.6;
            gameOverUI.style.display = 'none';
            })
    }
}

let countDownTimerId = setInterval(countdown, 1000);