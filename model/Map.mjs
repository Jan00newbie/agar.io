import Vector from "./Vector.mjs";
import Circle from "./Circle.mjs"
import { randomRGB } from "../utils.js";

export default class GameMap{
    constructor(size){
        this.size = size //x==y
        this.center = new Vector(0, 0)
        this.start = new Vector(-(this.size / 2), -(this.size / 2))
        this.end = new Vector(this.start.x + this.size, this.start.y + this.size)
    }

    randomPosition(){
        return new Vector(
            Math.random()*this.size - this.end.x,
            Math.random()*this.size - this.end.y
        )
    }

    foodFactory(foodArray, foodConfig){
        for (let i = 0; i < foodConfig.perPlayer; i++) {
           foodArray.push(new Circle(this.randomPosition(), foodConfig.radius, randomRGB()))
        }
    }
}