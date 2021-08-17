let timeToNextRat = 0;
let ratInterval = 500;
let lastTime = 0;

let rats = [];

class Rat {
    constructor(){
        this.ratSpriteWidth = 40;
        this.ratSpriteHeight = 40;
        this.width = 40;
        this.height = 40;
        this.x = canvas.width;
        this.y = Math.random() * (280 - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;

        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'Rat.png';
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
        // ctx.strokeRect(this.x, 120+this.y, this.width, this.height);
        ctx.drawImage(this.image, 45, 50, this.ratSpriteWidth, this.ratSpriteHeight, this.x, 120+this.y, this.width, this.height);
    }
}


const ratNoise = document.createElement('audio');
// ratNoise.src = 'qubodupSqueakyRatDeath.ogg';

const catMeow = document.createElement('audio');
// catMeow.src = 'Meow.ogg';


function animateRats(timestamp){
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRat += deltatime;
    if (timeToNextRat > ratInterval){
        rats.push(new Rat());
        timeToNextRat = 0;
    };
    [...rats].forEach(object => object.update(deltatime));
    [...rats].forEach(object => object.draw());
    rats = rats.filter(object => !object.markedForDeletion);

    animationIDRats = requestAnimationFrame(animateRats);

}

animateRats(0);


// +2 points for catching rats 

function caughtRat(first, second){
    return !( first.x > second.x + second.width ||
        first.x + (first.width*first.frameX) < second.x ||
        first.y > (120+second.y) + second.height ||
        first.y + (first.height*first.frameY) < (120+second.y))
}

function getPoints() {
    for (let i = 0; i< rats.length; i++){
        if (caughtRat(cat, rats[i])){
            if(!rats[i].counted){
            if(rats[i].sound == 'sound1'){
                catMeow.play();
            }else {
                catMeow.play();
            }
            score += 2;
            rats[i].counted = true;
            rats.splice(i, 1);
        }}
}}

// -2 points for rats eating cheese

function ratEatCheese(first, second){
    return !( first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > (120+second.y) + second.height ||
        first.y + first.height < (120+second.y))
}

function losePoints() {
    for (let i = 0; i< rats.length; i++){
        if (ratEatCheese(cheeseTable, rats[i])){
            if(!rats[i].counted){
            // if(rats[i].sound == 'sound1'){
            //     catMeow.play();
            // }else {
            //     catMeow.play();
            // }
            score -= 2;
            ratEatCheeseCount++;
            rats[i].counted = true;
            rats.splice(i, 1);
        }}
}}




