import Circle from "./Circle.mjs";
import Vector from "./Vector.mjs";
import {surfaceToRadiusConverter} from "../utils.js"

export default class Player extends Circle{
    constructor(pos, config, color){
        super(pos, config.radius, color)
        this.speed = config.speed
    }

    movement(mousePos){
        const destinationX = mousePos.x - this.pos.x
        const destinationY = mousePos.y - this.pos.y

        const angle = Math.atan2(destinationY, destinationX)

        const directionMove = new Vector(
            Math.cos(angle) * this.speed, Math.sin(angle) * this.speed
        )

        this.pos.sumVector(directionMove)

        return directionMove
    }

    eat(food){
        this.size += food.size
        this.radius = surfaceToRadiusConverter(this.size)
    }

    checkForEat(food){
        const distance = this.pos.countDistance(food.pos)
        const range = this.radius + food.radius
        return distance <= range
    }
}
