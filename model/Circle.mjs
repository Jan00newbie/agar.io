import Vector from "./Vector.mjs";
import {radiusToSurfaceConverter} from "../utils.js"

export default class Circle{
    constructor(pos, radius, color){
        this.pos = pos
        this.radius = radius
        this.color=color
        this.size = radiusToSurfaceConverter(this.radius)
    }

    getCenter(){
        return new Vector(this.pos.x+this.radius, this.pos.y+this.radius)
    }
}
