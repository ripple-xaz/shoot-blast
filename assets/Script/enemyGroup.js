// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

/**
 * author 
 * email/phone
 * decription 
 */

//砖块组件
var enemyG = cc.Class({
    name:'enemyG',
    properties:{
        name:'enemy',
        freqTime:7,
        initPollCount:5,
        prefab:cc.Prefab
    }
})
//爆炸特效
var boomG = cc.Class({
    name:'boomG',
    properties:{
        name:'boom',
        initPollCount:5,
        prefab:cc.Prefab
    }
})
//金币
var jinbiG = cc.Class({
    name:'jinbiG',
    properties:{
        name:'',
        prefab:cc.Prefab,
        initPollCount:0,
        xSpeed:1000,
        ySpeed:1000,
    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        enemyG:enemyG,
        main:cc.Node,
        jinbiG:{
            default:[],
            type:jinbiG
        },
        boomG:boomG
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.eState = D.commonInfo.gameState.none
        D.common.initObjPool(this, this.enemyG)
        D.common.initObjPool(this, this.boomG)
        D.common.batchInitObjPool(this, this.jinbiG)
        
    },

    startAction(){
        this.eState = D.commonInfo.gameState.start;
        this.getNewEnemy(this.enemyG)
        //定时释放敌人
        this.schedule(function(){
            if(this.node.children.length >= 5 || this.eState != D.commonInfo.gameState.start){
                return
            }
            this.getNewEnemy(this.enemyG)
        }.bind(this), this.enemyG.freqTime)
    },
    getNewEnemy(objInfo){
        var poolName = objInfo.name + 'Pool';
        var newEnemy = D.common.genNewNode(this[poolName],objInfo.prefab,this.node);
        newEnemy.getComponent('enemy').enemyGroup = this
        newEnemy.getComponent('enemy').init()
        newEnemy.setPosition(cc.p(0,this.node.height/2 - newEnemy.height))
    },
    getNewJinbi(objInfo){
        var poolName = objInfo.name + 'Pool';
        return D.common.genNewNode(this[poolName],objInfo.prefab,this.node);
    },
    //生成爆炸特效
    getNewBoom(x,y){
        var poolName = this.boomG.name + 'Pool';
        var newBoom =  D.common.genNewNode(this[poolName],this.boomG.prefab,this.node);
        newBoom.getComponent('boom').enemyGroup = this
        newBoom.setPosition(cc.p(x,y))

       
    },
    enemyDied(thisEnemy){ 
        //释放金币
        var x = thisEnemy.x
        var y = thisEnemy.y
        for (var i = this.jinbiG.length - 1; i >= 0; i--) {
            var newJinbi = this.getNewJinbi(this.jinbiG[i])
            // console.log(newJinbi.getComponent('jinbi'))
            // newJinbi.getComponent(v.name).enemyGroup =  this
            newJinbi.getComponent('jinbi').init()
            newJinbi.setPosition(cc.p(x,y))
        }

        // 爆炸
        this.getNewBoom(x,y)
        
        
        // var boom = cc.instantiate(this.boomG.prefab);
        // this.node.addChild(boom)
        // boom.setPosition(cc.p(x,y))
        // this.scheduleOnce(function(){
        //     boom.destroy()
        // }.bind(this), 1.5)
        

    },
    stopAction(){ //停止游戏
        this.eState = D.commonInfo.gameState.stop;
    }
    // update (dt) {},
});
