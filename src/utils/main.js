import Phaser, { Scene } from 'phaser'

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 768,
    parent: 'gameCanvase',
    backgroundColor: '#028af8'
};

const StartGame = () => {

    return new Phaser.Game({...config});
}

export default StartGame;
