import CornerShader from "../../shaders/corner/CornerShader";
import ShaderUtils from "../../ShaderUtils";

cc.Class({
    extends: cc.Component,

    properties: {
        testSprite1: cc.Sprite,
        testSprite2: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.testSprite1)
        {
            ShaderUtils.setShader(this.testSprite1, "CornerShader", CornerShader.vert, CornerShader.frag, 0.5, 0.002, 16 / 9);
        }

        if(this.testSprite2)
        {
            ShaderUtils.setShader(this.testSprite2, "CornerShader2", CornerShader.vert, CornerShader.frag, 0.1, 0.002, 9 / 16);
        }
    },

    start () {

    },

    // update (dt) {},
});
