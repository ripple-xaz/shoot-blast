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
        this.ySpeed = -4.5
        cc.director.getCollisionManager().enabled=true;
        this.enemyGroupNode = this.node.parent
        this.enemyGroupNodeComp = this.enemyGroupNode.getComponent('enemyGroup')

        /**
         * 根据金币的大小设置脚本的初始速度
         * @type {[type]}
         */
        var randomZhengfu = D.common.randomOne()
        if(this.node.name === "bigJinbi"){
            this.xSpeed = randomZhengfu * 3
            this.jinbinumIncrease = 10
        }else{
            this.xSpeed = -(randomZhengfu * 5) 
            this.jinbinumIncrease = 5
        }
        
    },
    init(){
        
        this.ySpeed = -4.5
    },
    onCollisionEnter(other, self){
        if(other.node.group === 'floor'){
            this.xSpeed = 0
            this.ySpeed = 0
        }else if(other.node.group === 'hero'){
            D.commonInfo.gameState.jinbinum += this.jinbinumIncrease
            D.common.backObjPool(this.enemyGroupNodeComp, this.node)
        }
    },
    start () {

    },

    update (dt) {
        var thisNode = this.node
        if(thisNode.x< -this.enemyGroupNode.width/2 + thisNode.width/2 || thisNode.x>this.enemyGroupNode.width/2 -thisNode.width/2 ){
            this.xSpeed = -this.xSpeed
        }
        thisNode.x += this.xSpeed
        thisNode.y += this.ySpeed
    },
});
