class Board {

    // Construtor
    constructor(obj){
        if(obj == undefined){
            obj = {}
        }
        this.items = (obj.items != undefined) ? obj.items : [0,1,2,3,4];
    }

    getRows() {
        var total = gameOptions.cardDiferent * gameOptions.cardRepeat;
        var rows = Math.trunc(total / gameOptions.boardColumns);
        if(total % gameOptions.boardColumns > 0) {
            rows++;
        }
        return rows;
    }

    // Cria o campo do jogo.
    generateField(){
        this.gameArray = [];
        this.selectedItem = -1;
        this.foundCount = 0;
        this.opened = [];
        this.leftMargin = 10;
        this.topMargin = 10;

        var stack = [];
        var total = gameOptions.cardDiferent * gameOptions.cardRepeat;

        // Cria lista com as cartas possíveis
        let i = 0;
        for(; i < gameOptions.cardDiferent; i ++){
            for(var j=0;j<gameOptions.cardRepeat;j++) {
                stack.push(i % this.items.length);
            }
        }

        // Para cada posição de carta no tabuleiro, escolhe uma das possibilidades e remove a lista de possibilidades
        i = 0;
        let current = 0;

        while(current + gameOptions.boardColumns <= total) {
            this.gameArray[i] = [];
            for(let j = 0; j < gameOptions.boardColumns; j++){
                let randomIndex = Math.floor(Math.random() * stack.length);
                let randomValue = stack[randomIndex];                
                stack.splice(randomIndex,1);

                this.gameArray[i][j] = {
                    container:null,
                    value: randomValue,
                    isFlipped: false,
                }
                current++;
            }
            i++;
        }

        if(stack.length > 0) {
            gameArray[i] = [];
            var rest = stack.length;
            for(let j = 0; j < rest; j++){
                let randomIndex = Math.floor(Math.random() * stack.length);
                let randomValue = stack[randomIndex];                
                stack.splice(randomIndex,1);
    
                this.gameArray[i][j] = {
                    container:null,
                    value: randomValue,
                    isFlipped: false,
                }
            }
        }
    }

    // Retorna a carta na área do clique. Se não encontra retorna falso
    valueAt(x, y){
        var column = Math.floor(x / (gameOptions.cardWidth + gameOptions.cardMargin));
        var row = Math.floor(y / (gameOptions.cardHeight + gameOptions.cardMargin));

        var item = false;
        try {
            item = this.gameArray[row][column];
            if(item.isFlipped) {
                return false;
            } else {
                item.isFlipped = true;
            }
        } catch {
        } 
        return item;
    }

}
