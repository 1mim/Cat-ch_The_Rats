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
        this.image.src = 'https://i.ibb.co/7vMbCNQ/Rat.png';
        this.frame = 0;
        this.maxFrame = 3;
        this.timeSinceRun = 0;
        this.runInterval = Math.random() * 50 + 50;
        this.counted = false;

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

    requestAnimationFrame(animateRats);
}

animateRats(0);


// scoreboard 

function caughtRat(first, second){
    return !( first.frameX > second.x + second.width ||
        first.frameX + first.width < second.x ||
        first.frameY > second.y + second.height ||
        first.frameY + first.height < second.y)
}

function getPoints() {
    for (let i = 0; i< rats.length; i++){
        if (caughtRat(cat, rats[i])){
            if(!rats[i].counted){
            score += 2;
            rats[i].counted = true;
            rats.splice(i, 1);
        }}
}}






