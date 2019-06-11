import Vector from "/js/Vector.mjs";
import Canvas from "/js/Canvas.mjs";
import Mouse from "/js/Mouse.mjs";

const socket = io.connect('http://192.168.1.17:80', {'forceNew': true});

const canvas = new Canvas(document.querySelector("canvas"), window)
const mouse = new Mouse(new Vector(0, 0))

canvas.ctx.scale(0.5, 0.5)

const state = {
    socketId: undefined,
    map: undefined,
    player: undefined,
    food: [],
    players: []
}

const clearState = (state) => {
    state.socketId = undefined
        state.map = undefined
        state.player = undefined
        state.food = []
        state.players = []
}

socket.on("init", data => {
    state.map = data.map
    state.socketId = data.id
})

socket.on("update", data => {
    state.player = data.players.splice(state.socketId, 1)[0]
    state.food = data.food
    state.enemies = data.players

    canvas.update(state)
})

socket.on("death", () => {
    clearState(state)
})

socket.on("shift", data => {
    canvas.translate(data.shift)
})

canvas.canvas.addEventListener('mousemove', event => {

    mouse.updateMousePosition(event, canvas.getCenter(), state.player.pos)

    socket.emit("mouseMove", {
        mousePos: mouse.pos
    })

}, false);