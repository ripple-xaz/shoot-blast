cc.Class({
    extends: cc.Component,

    properties: {

        // hero:cc.Node,

        hero: { //
            default: null,
            type: require('hero'),
        }, 
        alert_start:cc.Node,
        bulletGroup:cc.Node,
        enemyGroup:cc.Node,
        backgroundMove:cc.Node
    },

    // use this for initialization
    onLoad: function () {

       

        this.bulletGroupComp = this.bulletGroup.getComponent('bulletGroup')
        this.enemyGroupComp = this.enemyGroup.getComponent('enemyGroup')
        this.heroComp = this.hero.getComponent('hero')
        this.backgroundMoveComp = this.backgroundMove.getComponent('backgroundMove')

        this.gameStar()
    },

    // called every frame
    update: function (dt) {

    },
    gameStar(){

        this.bulletGroupComp.startAction()
        this.enemyGroupComp.startAction()
        this.heroComp.startAction()
        this.backgroundMoveComp.onDrag()
        this.alert_start.destroy()

    },
    gameWin(){
        this.bulletGroupComp.stopAction()
        this.enemyGroupComp.stopAction()
        this.heroComp.stopAction()
        this.backgroundMoveComp.offDrag()
    },
    gameFail(){
        this.bulletGroupComp.stopAction()
        this.enemyGroupComp.stopAction()
        this.heroComp.stopAction()
        this.backgroundMoveComp.offDrag()
    },
    gameRestart(){

        this.bulletGroupComp.startAction()
        this.enemyGroupComp.startAction()
        this.heroComp.startAction()
        this.backgroundMoveComp.onDrag()
        
    },
    mraidOpen(){
        if(typeof mraid != 'undefine'){
            mraid.open('https://play.google.com/store/apps/details?id=com.jy.game.shoot.blast')
        }else{
            console.log('no mraid')
        }
    },

});
