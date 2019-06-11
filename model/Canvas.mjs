import Vector from "./Vector.mjs";

export default class MyCanvas{
    constructor(canvas, window){
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.defaultColor = "white"
        this.ctx.imageSmoothingQuality = "high"
        this.resize(window)
        this.translate(this.getCenter())
    }

    translate(vector){
        this.ctx.translate(vector.x, vector.y)
    }

    update(state){
        this.renderState(state)
    }

    renderState(state){
        this.clear(state.map)
        this.drawCircle(state.player)
        this.drawCircles(state.food)
        this.drawCircles(state.enemies)
    }

    resize(window){
        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth
    }

    clear(gameMap){
        this.ctx.clearRect(gameMap.start.x, gameMap.start.y, gameMap.size, gameMap.size)
    }

    drawCircle(circle){
        if(this.ctx) {
            this.ctx.fillStyle = circle.color
            this.ctx.beginPath()
            this.ctx.arc(circle.pos.x, circle.pos.y, circle.radius, 0, 2 * Math.PI)
            this.ctx.fill()
        } else {
            throw new Exception("Coś jest nie tak z contextem!");
        }
    }

    drawCircles(circles){
        circles.forEach(circle => {
            this.drawCircle(circle)
        });
    }

    getCenter(){
        return new Vector(this.canvas.width/2, this.canvas.height/2)
    }
} 