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
            /**最后四个形参，分别代表1到4象限，1为圆角，0为不裁剪 */
            ShaderUtils.setShader(this.testSprite1, "CornerShader", CornerShader.vert, CornerShader.frag, 0.5, 0.002, 16 / 9, 1.0, 1.0, 0.0, 0.0);
        }

        if(this.testSprite2)
        {
            ShaderUtils.setShader(this.testSprite2, "CornerShader2", CornerShader.vert, CornerShader.frag, 0.1, 0.002, 9 / 16, 1.0, 1.0, 1.0, 1.0);
        }
    },

    start () {

    },

    // update (dt) {},
});
