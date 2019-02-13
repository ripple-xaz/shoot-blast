/**
 * [小球爆炸脚本]
 * @author {[lyzhou]}
 * @telephony {[16607134217]}
 */
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

    onLoad () {
        
    },
    init(){
       // var anim =  this.getChildByName('boom').getComponent(cc.animation)
       // anim.
    },
    start () {
        
    },
    init(){

    },
    //爆炸结束动画
    onAnimCompleted(){
        D.common.backObjPool(this.enemyGroup, this.node)
    }
    // update (dt) {},
});
