// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

//子弹生成位置
var bulletPosition = cc.Class({
    properties: {
        xAxis:'',
        yAxis: '',
    },
});

//不限时长子弹
var bulletNormal = cc.Class({
    name:'bulletNormal',
    properties: {
        name:'',
        freqTime:0,
        initPollCount:0,
        prefab:cc.Prefab,
        x:'',
        y:''
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        bulletNormal:{
            default:null,
            type:bulletNormal, //
        },
        hero:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.eState = D.commonInfo.gameState.none
        //在this上添加 bullet_pool 对象池
        D.common.initObjPool(this,this.bulletNormal)
        
    },
   
    startAction(){
        this.eState = D.commonInfo.gameState.start;

        this.getNewbullet(this.bulletNormal)
        this.schedule(function(){
            if(this.eState != D.commonInfo.gameState.start){
                return
            }
            this.getNewbullet(this.bulletNormal)
        }, this.bulletNormal.freqTime)
    },
    getNewbullet(objInfo){

        var poolName = objInfo.name + 'Pool';
        var newBullet = D.common.genNewNode(this[poolName],objInfo.prefab,this.node)
        var heroPosition = this.hero.getPosition()
        newBullet.setPosition(cc.p(heroPosition.x,heroPosition.y+this.hero.height/2))
        //在预制节点上添加父节点
        newBullet.getComponent('bullet').bulletGroup = this;

    },
    stopAction(){
        this.eState = D.commonInfo.gameState.stop
    },

    // update (dt) {},
});
