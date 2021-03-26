class gameplay extends Phaser.Scene{
    constructor(){
        super("Memorizando-e-aprendendo");
    }
    preload(){
        this.load.spritesheet("logo", "static/sprites/logo.png", {
            frameWidth: gameOptions.spriteSize,
            frameHeight: gameOptions.spriteSize
        });
        this.load.spritesheet("animals", "static/sprites/animals.png", {
            frameWidth: gameOptions.spriteSize,
            frameHeight: gameOptions.spriteSize
        });
        this.load.spritesheet("fundocarta", "static/sprites/fundocarta.png", {
            frameWidth: 80,
            frameHeight: 120
        });
        this.objects = {};
    }
    create(){
        this.board = new Board({
            rows: gameOptions.cardRow,
            columns: gameOptions.cardColumn,
            items : [0,1,2,3,4]
        });

        this.objects.camera = this.cameras.add(0, 0, width, height);
        this.objects.camera.setBackgroundColor('rgba(255, 255, 255, 0.5)');

        this.board.generateField();
        this.canPick = true;
        this.canDrag = false;
        this.drawField();
        this.input.on("pointerdown", this.selectCard, this);
    }
    drawField(){
        this.poolArray = [];
        for(let i = 0; i < this.board.getRows(); i ++){
            for(let j = 0; j < this.board.getColumns(); j ++){
                var logoX = (gameOptions.cardWidth - gameOptions.spriteSize) / 2;
                var logoY = (gameOptions.cardHeight - gameOptions.spriteSize) / 2;
                var fundocarta = this.add.sprite(10,4, "fundocarta", 0);
                fundocarta.setOrigin(0, 0);
                var logo = this.add.sprite(this.board.leftMargin + logoX,this.board.topMargin + logoY, "logo", 0);
                logo.setOrigin(0, 0);
                var container = this.add.container(0,0);
                container.add([fundocarta,logo]);
                this.board.gameArray[i][j].container = container;
                var animalX = gameOptions.cardWidth * j;
                var animalY = gameOptions.cardHeight * i;
                this.tweens.add({
                    targets: container,
                    x:animalX + gameOptions.cardMargin,
                    y:animalY + gameOptions.cardMargin,
                    duration: 1000,
                    callbackScope: this,
                    onComplete: function(event, sprite){
                        
                    }
                });
            }
        }
    }
    selectCard(pointer){
        if(this.canPick){
            this.movingRow = false;
            this.movingCol = false;
            this.canPick = false;
            var card = this.board.valueAt(pointer.x, pointer.y);
            if(card){
              this.doMove(card);
            }
            else{
                this.canPick = true;
            }
        }
    }
    doMove(card) {
        var game = this;
        this.board.opened.push(card);
        var timeLine = this.tweens.createTimeline();       

        timeLine.add({
            targets: card.container,
            scaleX:0,
            scaleY:1.1,
            duration: 300,
            callbackScope: this,
            onComplete: function(event, container){
                container[0].list[0].setTexture('fundocarta',1);
                container[0].list[1].setTexture('animals',card.value);
            }
        });
        timeLine.add({
            targets: card.container,
            scaleX:1,
            scaleY:1,
            duration: 300,
            callbackScope: this,
            onComplete: function(event, container){
                if(game.board.opened.length == 2) {
                    if(game.board.opened[0].value == game.board.opened[1].value) {
                        game.board.opened = [];
                        game.canPick = true;
                    } else {
                        game.time.addEvent({
                            delay: 300,
                            loop: false,
                            callback: () => {
                                game.doFlip(game.board.opened);
                                game.board.opened = [];
                                game.canPick = true;
                            }
                        });
                    }
                } else {
                    game.canPick = true;
                }
            }
        });
        timeLine.play();
    }
    doFlip(cards) {
        try {
            var timeLines = [];
            for(var i=0;i<cards.length;i++) {
              var timeLine = this.tweens.createTimeline();
              timeLine.add({
                  targets: cards[i].container,
                  scaleX:0,
                  scaleY:1.1,
                  duration: 300,
                  callbackScope: this,
                  onComplete: function(event, container){
                      container[0].list[0].setTexture('fundocarta',0);
                      container[0].list[1].setTexture('logo',0);
                  }
              });
              timeLine.add({
                  targets: cards[i].container,
                  scaleX:1,
                  scaleY:1,
                  duration: 300,
                  callbackScope: this,
                  onComplete: function(event, container){
                      
                  }
              });
              timeLines.push(timeLine);
            }
            for(var i=0;i<cards.length;i++) {
              timeLines[i].play();
              cards[i].isFlipped = false;
            }
        } catch(ex) {
            alert(ex);
        }
    }
}