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
        hero:{
            default:null,
            type:require('hero')
        },
        main:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onDrag()
        this.main = this.main.getComponent('main')
    },
    onDrag(){
      this.node.on('touchmove',this.dragMove,this)
    },
    offDrag(){
      this.node.off('touchmove',this.dragMove,this)  
    },
    dragMove(event){

        var location = D.common.getConvertToNodeSpace(event,this)

        if(Math.abs(location.location_different.x) > 50){
            this.main.gameStar()
        }
        

    },
    start () {
       
    },

    // update (dt) {},
});
