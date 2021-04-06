var width = screen.availWidth;
var height = screen.availHeight;

var game;
var gameOptions = {
    spriteSize: 64,
    cardWidth: 80,
    cardHeight: 120,
    cardMargin: 5,
    cardRepeat: 2,
    cardDiferent: 5,
    boardColumns:5,
    boardRows:5,
    texts: [],
    questions: []
}

function startGame() {
    gameOptions.boardRows = new Board({
        items : [0,1,2,3,4]
    }).getRows();

    document.getElementById("menu").style.display = "none";
    width = Math.max((gameOptions.cardWidth + gameOptions.cardMargin) * gameOptions.boardColumns, width);
    height = Math.max((gameOptions.cardHeight + gameOptions.cardMargin) * gameOptions.boardRows, height);

    var gameConfig = {
        //type: Phaser.AUTO,
        //scaleMode: Phaser.Scale. ScaleModes.FIT,
        scale: {
            //autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "Memorizando-e-aprendendo",
            width: width,
            height: height
        },
        scene: [start,gameplay]
    }
    jogo = new Phaser.Game(gameConfig);
    window.focus();
}
