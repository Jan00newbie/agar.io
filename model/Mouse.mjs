import Vector from "./Vector.mjs";

export default class Mouse{
    constructor(pos){
        this.pos = pos
    }

    updateMousePosition(e, canvasCenter, playerPos){
        this.pos = new Vector(
           e.clientX,
           e.clientY
        )
        .subVector(canvasCenter)
        .sumVector(playerPos)
    }
} 