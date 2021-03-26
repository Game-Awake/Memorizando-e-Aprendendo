class start extends Phaser.Scene{
    constructor(){
        super("Memorizando-e-aprendendo-start");
    }
    preload(){
        this.load.html('start', 'html/start.html');
        this.objects = {};
    }
    create(){
        var title = this.add.text(
            640,
            360,
            "Memorizando e Aprendendo",
            {
                fontSize: 50,
                color: "#0000FF",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        this.time.addEvent({
          delay: 2000,
          loop: false,
          callback: () => {
              this.scene.transition({ target: 'Memorizando-e-aprendendo', duration: 1000 });
          }
        });
    }
}
 