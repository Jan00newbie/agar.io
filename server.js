import Vector from './model/Vector.mjs';
import Map from './model/Map.mjs';
import Player from './model/Player.mjs'
import config from './server/config.js'
import {
  randomRGB
} from './utils.js'

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use('/js', express.static('model'))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

const game = {
  map: new Map(10000),
  players: [],
  food: []
}

io.on('connection', socket => {

  function update(target) {
    target.emit('update', {
      players: game.players,
      food: game.food
    })
  }

  const playerID = game.players.length
  const startingPosition = game.map.randomPosition()

  game.players.push(new Player(startingPosition, config.player, randomRGB()))
  game.map.foodFactory(game.food, config.food)

  socket.emit('init', {
    map: game.map,
    id: playerID
  })

  socket.emit('shift', {
    shift: Object.create(startingPosition).oppositeVector()
  })

  update(io)

  socket.on("mouseMove", data => {

    const shift = game.players[playerID].movement(data.mousePos)

    game.players.forEach((currentPlayer, currentPlayerIndex) => {

      game.food.forEach((food, index) => {
        if (currentPlayer.checkForEat(food)) {
          currentPlayer.eat(food)
          game.food.splice(index, 1)
          game.map.foodFactory(game.food, 5)
        }
      })

      game.players.forEach((player, index) => {
        if(currentPlayerIndex !== index){
          if(currentPlayer.checkForEat(player)){
            currentPlayer.eat(player)
            game.players.splice(index, 1)
          }
        }
      })
    })
    update(io)

    socket.emit('shift', {
      shift: shift.oppositeVector()
    })
  })
});

server.listen(80);