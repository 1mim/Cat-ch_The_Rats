// const ratsGreen = new Rat()
// ratsGreen.image.src = 'RatGreen.png';
let timeToNextGreenRat = 0;
let greenRatInterval = 500;
let lastTime = 0;

class GreenRats extends Rat {
    constructor (){
        this.image = new Image();
        this.image.src = 'RatGreen.png'
    }
}

let greenRats = [];


//rat animation

function animateGreenRats(timestamp){
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextGreenRat += deltatime;
    if (timeToNextGreenRat > ratInterval){
        greenRats.push(new ratsGreen());
        timeToNextGreenRat = 0;
    };
    [...greenRats].forEach(object => object.update(deltatime));
    [...greenRats].forEach(object => object.draw());
    rats = greenRats.filter(object => !object.markedForDeletion);

    animationIDRats = requestAnimationFrame(animateGreenRats);

}

animateGreenRats(0);