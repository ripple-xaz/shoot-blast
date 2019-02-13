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

        var fire = this.node.getChildByName("fire")
        var lunzi = this.node.getChildByName("pic_paotai2_02")
        this.fire = fire
        this.lunzi = lunzi
        this.fireAnim = fire.getComponent(cc.Animation)
        this.lunziAnim = lunzi.getComponent(cc.Animation)
        cc.director.getCollisionManager().enabled=true;

    },
    startAction(){

        this.fireAnim.play('fire')
        this.lunziAnim.play('chelunzi')

    },
    stopAction(){

        this.fireAnim.stop('fire')
        this.lunziAnim.stop('chelunzi')
        
    },
    update (dt) {
        // this.fire()
    },
});
