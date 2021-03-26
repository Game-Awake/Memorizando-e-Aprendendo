class Board {

    // Construtor
    constructor(obj){
        if(obj == undefined){
            obj = {}
        }
        this.rows = (obj.rows != undefined) ? obj.rows : 5;
        this.columns = (obj.columns != undefined) ? obj.columns : 2;
        this.items = (obj.items != undefined) ? obj.items : [0,1,2,3,4];
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
        // Cria lista com as cartas possíveis
        for(var i = 0; i < this.items.length; i ++){
            for(var j=0;j<2;j++) {
                stack.push(i);
            }
        }

        // Para cada posição de carta no tabuleiro, escolhe uma das possibilidades e remove a lista de possibilidades
        for(let i = 0; i < this.rows; i ++){
            this.gameArray[i] = [];
            for(let j = 0; j < this.columns; j ++){
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

    // Retorna o total de linhas
    getRows(){
        return this.rows;
    }

    // Retorna o total de colunas
    getColumns(){
        return this.columns;
    }

}
