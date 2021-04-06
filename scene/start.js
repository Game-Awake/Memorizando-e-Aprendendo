class start extends Phaser.Scene{
    constructor(){
        super("Memorizando-e-aprendendo-start");
    }
    preload(){
    }
    create(){
        /*this.time.addEvent({
          delay: 2000,
          loop: false,
          callback: () => {
              
          }
        });*/
        this.scene.transition({ target: 'Memorizando-e-aprendendo', duration: 1000 });
    }
}
 