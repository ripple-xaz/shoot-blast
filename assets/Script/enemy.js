// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled=true;
        this.enemyBackground = this.node.getChildByName('enemyBackground')
        this.enemyScore = this.node.getChildByName('enemyScore').getComponent(cc.Label)
        this.xSpeed = D.common.randomOne() * 1,
        this.ySpeed = -3.5
    },
    init (){
        this.enemyScore.string = Math.ceil(cc.random0To1()*30 + 10)

    },
    onCollisionEnter(other, self){

        if(other.node.group == 'bullet'){
            var curScoreString =  this.enemyScore.string
            if(curScoreString>0){
                this.enemyScore.string = eval(curScoreString) - 1
            }else{
                D.common.backObjPool(this.enemyGroup, this.node)
                this.enemyGroup.enemyDied(this.node)
                this.enemyGroup.getNewEnemy(this.enemyGroup.enemyG)
            }
        }else if(other.node.group == 'floor'){

            this.ySpeed = -this.ySpeed
        }else if(other.node.group == 'hero'){
            this.enemyGroup.main.getComponent('main').gameOver()
        }
        
    },
    start () {
       
    },

    update (dt) {


        var curEnemyScore = eval(this.enemyScore.string)
        var enemyGroupNode = this.enemyGroup.node
        var thisNode = this.node

        if(this.enemyGroup.eState != D.commonInfo.gameState.start){
            
            return
        }


        if(curEnemyScore>=0 && curEnemyScore<10){
            this.enemyBackground.color = new cc.color(104,199,207,255)

            this.node.width = 100
            this.node.height = 100

        }else if(curEnemyScore>=10 && curEnemyScore<30){
            this.enemyBackground.color = new cc.color(116,223,50,255)
            this.node.width = 200
            this.node.height = 200
        }else{
            this.enemyBackground.color = new cc.color(26,65,24,255)
            this.node.width = 300
            this.node.height = 300
        }

        if(this.node.y>enemyGroupNode.height/2-thisNode.height/2 && curEnemyScore<30){
            this.ySpeed = -this.ySpeed
        }

        if(this.node.x< -enemyGroupNode.width/2 + thisNode.width/2 || thisNode.x>enemyGroupNode.width/2 -thisNode.width/2 ){
            this.xSpeed = -this.xSpeed
        }
        
        this.node.x += this.xSpeed
        this.node.y += this.ySpeed

    },
});
