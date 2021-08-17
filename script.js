const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 650;
canvas.height = 400;


//display at gameover
const restart = document.querySelector('#restart');
const gameOverUI = document.querySelector('.gameOverUI');
const finalScore = document.querySelector('.yourscore');


//display at start of game
const start = document.querySelector('#play');
const startGameUI = document.querySelector('.startGameUI');

let keys = [];

let score = 0;
ctx.font = '30px Impact';

let catchCount = 0;
let ratEatCheeseCount = 0;

let frame = 0;



// character animation

const cat = {
    x: 300,
    y: 175,
    width: 70,
    height: 70,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false

};

const cheeseTable = {
    x: 0,
    y: 135,
    width: 145,
    height: 193,
    frameX: 0,
    frameY: 0,
    moving: false

};

const catSprite = new Image();
catSprite.src = "CatSprite.png";

const cheeseImage = new Image();
cheeseImage.src = "cheese_table.png";

const background = new Image();
background.src = "r3_LivingRoom.png";

function drawCharacter(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

//arrow key controls 

window.addEventListener("keydown", function(e){
    keys[e.key] = true;
    cat.moving = true;
});

window.addEventListener("keyup", function(e){
    delete keys[e.key];
    cat.moving = false;
});

//arrow key controls | moving cat

function moveCat() {
    if (keys['ArrowUp'] && cat.y > 100){
        cat.y -= cat.speed;
        cat.frameY = 3;
        cat.moving = true;
    }
    if (keys['ArrowLeft'] && cat.x > 140){
        cat.x -= cat.speed;
        cat.frameY = 1;
        cat.moving = true;
    }
    if (keys['ArrowDown'] && cat.y < canvas.height - cat.height){
        cat.y += cat.speed;
        cat.frameY = 0;
        cat.moving = true;
    }
    if (keys['ArrowRight'] && cat.x < canvas.width - cat.width){
        cat.x += cat.speed;
        cat.frameY = 2;
        cat.moving = true;
    }
}

//animating walking cat +


function handleCatFrame() {
    if (cat.frameX < 2 && cat.moving) {
        cat.frameX++
    } else {
        cat.frameX = 0;
    } 
    
}


// scoreboard 

function drawScore(){
    ctx.textAlign = 'center';
    ctx.fillStyle = 'orange';
    ctx.font = '10px Arial';
    ctx.fillText("SCORE", 95, 22);
    ctx.fillStyle = 'white';
    ctx.font = '30px Impact';
    ctx.fillText(score, 95, 57)
}

//restart game

const init = () => {
    keys = [];
    rats = [];
    score = 0;
    ratEatCheeseCount = 0;
    currentTime = 5;
    countDownTimerId = setInterval(countdown, 1000);

}


//countdown timer

function drawTime(){
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.font = '17px Arial';
    ctx.fillText(currentTime, 595, 35);

}

let currentTime = 5;


function countdown() {
    currentTime--;

    if(currentTime == 0) {
        clearInterval(countDownTimerId);
        setTimeout(animateRats);
        // alert('GAME OVER. Your total score: ' + score);
        gameOverUI.style.display = 'initial';
        finalScore.innerHTML = score;

        restart.addEventListener('click', ()=>{
            gameOverUI.style.display = 'none';
            init();
            startAnimating(40);
            animateRats();
            })
        
    }
}

let countDownTimerId = setInterval(countdown, 1000);


//animate

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        drawCharacter(catSprite, cat.width*cat.frameX, cat.height*cat.frameY, cat.width, cat.height,
            cat.x, cat.y, cat.width, cat.height);

        drawCharacter(cheeseImage, cheeseTable.width*cheeseTable.frameX, cheeseTable.height*cheeseTable.frameY, cheeseTable.width, cheeseTable.height,
            cheeseTable.x, cheeseTable.y, cheeseTable.width, cheeseTable.height);
            

        getPoints();
        drawScore();
        
        losePoints();
        drawScore();
        
        moveCat();  
        handleCatFrame();
        
        drawTime();

    }
}
gameOverUI.style.display = 'none'
startAnimating(40);

// startButton.addEventListener('click', ()=>{
//     startAnimating(40);
//     animateRats(0);
//     startGameUI.style.display = 'none';
// })

