
function startGame(){
    const myCanvas = new MyCanvas(document.querySelector("canvas"), window)
    const gameMap = new GameMap(10000)
    const player = new Player(new Vector(0, 0), config.player.radius, randomRGB(), config.player.speed)
    const mouse = new Mouse(new Vector(0, 0))

    const foodArray = []
    gameMap.foodFactory(1000, foodArray, config.food);

    (function draw(){
        myCanvas.clear(gameMap)
        myCanvas.drawCircle(player)
        myCanvas.drawCircles(foodArray)
        requestAnimationFrame(draw)
    })()

    //gamelogic
    setInterval(()=>{
        const directionMove = player.movement(mouse.pos)

        myCanvas.translate(directionMove.oppositeVector())

        foodArray.forEach((food, index) => {
            if(player.checkForEat(food)){
                player.eat(food)
                foodArray.splice(index, 1)
            }
        });
    }, 5)

    document.addEventListener('mousemove', event =>{
        mouse.updateMousePosition(event, myCanvas.getCenter(), player.pos)
    }, false);
}

window.addEventListener("load", startGame)