export default class Vector{
    constructor(x, y){
        this.x = parseFloat(x)
        this.y = parseFloat(y)
    }

    sumVector(vector){
        this.x += vector.x
        this.y += vector.y
        
        return this
    }

    subVector(vector){
        this.x -= vector.x
        this.y -= vector.y

        return this
    }

    oppositeVector(){
        return {
            x: -this.x,
            y: -this.y
        }
    }

    countDistance(destPoint){
        return Math.sqrt(Math.abs(Math.pow(destPoint.x - this.x, 2) + Math.pow(destPoint.y - this.y, 2)))
    }
}