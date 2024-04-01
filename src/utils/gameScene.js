import Phaser, { Scene } from 'phaser'

const canvasSize = {
  width: 750,
  height: 750
}

const birdStartingPosition = {
  x: canvasSize.width / 10,
  y: canvasSize.height / 2
}

const speedDown = 200
const gameDuration = 30000
const PLAYER_VELOCITY = 400
const PIPE_VELOCITY = -400
const PIPES_TO_RENDER = 4

function increasePlayerVelocity() {
  // Check if the spacebar is down

      // Increase player velocity here
      this.player.body.velocity.y = -PLAYER_VELOCITY; // Example: Increase vertical velocity by 10 units
  
}

function decreasePlayerVelocity() {
  // Check if the spacebar is down

      // Increase player velocity here
      this.player.body.velocity.y = PLAYER_VELOCITY; // Example: Increase vertical velocity by 10 units
  
}
class GameScene extends Scene {
  constructor() {
    super("scene-game")
    this.player
    this.upperPipe
    this.lowerPipe
    this.spaceBar

    this.emitter
  }

  preload() {
    this.load.image("bg", "/assets/bg.png")
    // this.load.image("bird", "/assets/single_bird.png")
    this.load.spritesheet("bird", "/assets/spritesheet.png", {frameWidth: 500, frameHeight: 500})
    this.load.image("pipe", '/assets/pipe.png')
    this.load.image("pipe2", '/assets/pipe2.png')
    
  }

  create() {
    // define all objects first
    let bird = null
    let upperPipe = null
    let lowerPipe = null
     //pause until game starts
    // this.scene.pause('scene-game')

    //adds background
    // alterntively config.width/2, config.height/2, "bg" instead of setOrigin
    // setOrigin is the grown up way

    // the canvas origin is in the top-left, but the image's origin is in the middle
    this.add.image(0,0, "bg").setOrigin(0,0)

    // define player
    bird = this.physics.add.sprite(birdStartingPosition.x, birdStartingPosition.y, 'bird')
    .setScale(0.15)
    .setOrigin(0)
    .setGravityY(speedDown)


    /* If you wanted the bird to go from lef to right*/
    // bird.body.velocity.x = PLAYER_VELOCITY;
    // bird.setVelocity(PLAYER_VELOCITY, 0)

    this.player = bird

    this.anims.create({
      key: 'fly',
      // frames: this.anims.generateFrameNumbers('bird', {start: 0, end: 1}),
      frames: [
        // {key: 'bird', frame: 0},
        {key: 'bird', frame: 1},
        {key: 'bird', frame: 2},
        // {key: 'bird', frame: 1},
    ],
      frameRate: 4,
      repeat: -1
    })

    // bird sprite animation
    this.player.play('fly')

    // pressing the spacebar makes the bird go up or down
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spaceBar.on('down', increasePlayerVelocity.bind(this));
    this.spaceBar.on('up', decreasePlayerVelocity.bind(this));

    Array.from({ length: PIPES_TO_RENDER }, (x, i) => {
      // pipes!
      const gap = 50
      const horizontalDistance = 400
      const upperHeight = Phaser.Math.Between(-500, -50)
      const pipeWidth = horizontalDistance + (horizontalDistance * i)
      upperPipe = this.physics.add.sprite(pipeWidth, upperHeight, 'pipe').setOrigin(0, 1).setFlipY(true)
      upperPipe.setImmovable(true)
      upperPipe.setGravity(0)
      upperPipe.setVelocity(-PIPE_VELOCITY, 0)
      upperPipe.setScale(1, 1.5)

      // pipes!
      const lowerHeight = Phaser.Math.Between(0 + 30, fg“ + gap)
      // lowerPipe = this.physics.add.sprite(pipeWidth, lowerHeight, 'pipe2').setOrigin(0)
      // lowerPipe.setImmovable(true)
      // lowerPipe.setGravity(0)
      // lowerPipe.setVelocity(-PIPE_VELOCITY, 0)
      // lowerPipe.setScale(1, 1.5)

      

      this.upperPipe = upperPipe
      // this.lowerPipe = lowerPipe
    })

    
  }


  // 60fps delta is 1/16 of a second
  update(time, delta) {
    
    if (this.player.body.y > canvasSize.height || this.player.body.y < 0) {
      this.player = restartBirdPosition(this.player, birdStartingPosition.x, birdStartingPosition.y)
    }

    if (this.upperPipe.body.x < 0 - this.upperPipe.displayWidth) {
      resetPipes(this.lowerPipe, this.upperPipe)
      // const uPipe = resetUpperPipe(this.upperPipe)
      // const lPipe = resetLowerPipe(this.lowerPipe, this.upperPipe.body.y)

      // this.upperPipe = uPipe
      // this.lowerPipe = result.lowerPipe

    }
    
    // if (this.player.x >= canvasSize.width - this.player.width) {
    //   this.player.body.velocity.x = -PLAYER_VELOCITY
    // } else if (this.player.x <= 0) {
    //   this.player.body.velocity.x = PLAYER_VELOCITY
    // }
    
  }
}

export const config = {
  type: Phaser.WEBGL,
  width: canvasSize.width,
  height: canvasSize.height,
  parent: 'gameCanvas',
  scene: [GameScene],
  physics: {
    default: "arcade"
  },
  autoFocus: false,
  pauseOnBlur: true,
  autoStart: false
}

function restartBirdPosition (player,x, y) {
  player.body.x = x
  player.body.y = y
  player.body.velocity.y = 0

  return player
}

function resetPipes(lowerPipe, upperPipe) {
  const gap = 200

  const upperHeight = Phaser.Math.Between(-500, -50)
  upperPipe.body.y = upperHeight
  upperPipe.body.x = canvasSize.height + upperPipe.displayWidth

  lowerPipe.body.y = Phaser.Math.Between(lowerPipe.displayHeight + 30, upperHeight + lowerPipe.displayHeight + gap)
  lowerPipe.body.x = canvasSize.height + lowerPipe.displayWidth + 25

  return { lowerPipe, upperPipe}
}
function resetUpperPipe(upperPipe) {
  const gap = 50

  //first reset upperPipe
  // ok, MATH
  // 
  const upperHeight = Phaser.Math.Between(-500, -50)
  //displayHeight = -643.5
  upperPipe.body.y = upperHeight 
  upperPipe.body.x = canvasSize.height + upperPipe.displayWidth
  
  return upperPipe
}

function resetLowerPipe(lowerPipe, upperPipeY) {
  const gap = 200

  lowerPipe.body.y = Phaser.Math.Between(lowerPipe.displayHeight + 30, upperPipeY + lowerPipe.displayHeight + gap)
  lowerPipe.body.x = canvasSize.height + lowerPipe.displayWidth + 25
  
  return lowerPipe
}

const startGame = (parent) => {
  return new Phaser.Game({...config, parent: parent})
}

export default startGame