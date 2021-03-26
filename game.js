var width = screen.width;
var height = screen.height;

var game;
var gameOptions = {
    spriteSize: 64,
    cardWidth: 80,
    cardHeight: 120,
    cardMargin: 5,
    cardRow:2,
    cardColumn:5,
}

window.onload = function() {
    var gameConfig = {
        type: Phaser.AUTO,
        scaleMode: Phaser.Scale. ScaleModes.FIT,
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "Memorizando-e-aprendendo",
            width: width,
            height: height
        },
        scene: [start,gameplay]
    }
    jogo = new Phaser.Game(gameConfig);
    window.focus();
}
