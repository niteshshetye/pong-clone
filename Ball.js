const INITIAL_VELOCITY = .025
const INCREASE_VELOCITY = .00001

export default class Ball {
    constructor(ballElement){
        this.ballElement = ballElement
        this.reset();
    }
    rect(){
        return this.ballElement.getBoundingClientRect()
    }
    // get helper method
    get x(){
        // getComputedStyle will give the element ball from dom 
        // and getPropertyValue will give the variable which created there in that style
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'))
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'))
    }

    // set helper method 
    set x(value){
        // setProperty will change the value in css variable
        return this.ballElement.style.setProperty('--x', value)
    }
    set y(value){
        return this.ballElement.style.setProperty('--y', value)
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = {x: 0}
        while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9){
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        console.log(this.direction)
        this.velocity = INITIAL_VELOCITY
    }


    update(delta, paddleRects){
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += INCREASE_VELOCITY * delta

        const rect = this.rect()
        if(rect.bottom >= window.innerHeight || rect.top <= 0){
            this.direction.y *= -1
        }
        if(paddleRects.some(r => isCollision(r, rect))){
            this.direction.x *= -1
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2){
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}