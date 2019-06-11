export const randomRGB = (r = 255, g = 255, b = 255) => {
    return `rgb(${rand(r)},${rand(g)},${rand(b)})`
}
export const rand = (to) => {
    return Math.floor(Math.random() * to)
} 

export const surfaceToRadiusConverter = surface =>{
    return Math.sqrt(surface/Math.PI)
}

export const radiusToSurfaceConverter = radius =>{    
    return Math.pow(radius,2)*Math.PI
}