import Phaser, { Scene } from 'phaser'

const canvasSize = {
  width: 1024,
  height: 1024
}

const speedDown = 200
const gameDuration = 30000

class GameScene extends Scene {
  constructor() {
    super("scene-game")
  }

  preload() {
    this.load.image("bg", "/assets/bg.png")
  }

  create() {

    //adds background
    this.add.image(0,0, "bg").setOrigin(0,0)
    console.debug("added image?")
  }
}

export const config = {
  type: Phaser.WEBGL,
  width: canvasSize.width,
  height: canvasSize.height,
  parent: 'gameCanvas',
  scene: [GameScene]
}

const startGame = (parent) => {
  return new Phaser.Game({...config, parent: parent})
}

export default startGame