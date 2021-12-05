const SPEED = .02;


export default class Paddle {
    constructor(paddleElement){
        this.paddleElement = paddleElement;
        this.reset()
    }
    rect() {
        return this.paddleElement.getBoundingClientRect()
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--position-paddle'))
    }

    set position(value) {
        return this.paddleElement.style.setProperty('--position-paddle', value)
    }

    reset(){
        this.position = 50;
    }

    update(delta, ballPosition){
        this.position += SPEED * delta * (ballPosition - this.position)
    }

}