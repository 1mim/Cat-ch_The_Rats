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

const catSprite = new Image();
catSprite.src = "https://i.ibb.co/kXmqvCD/Cat-Sprite.png";


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
