var ShaderUtils = {
	shaderPrograms: {},

	/**
	 * 
	 * @param {cc.Sprite} sprite 
	 * @param {string} shaderName 
	 * @param {string} vert 
	 * @param {string} frag 
	 * @param  {...any} args shader custom parameters
	 */
	setShader: function(sprite, shaderName, vert, frag, ...args) {
		var glProgram = this.shaderPrograms[shaderName];
		if (!glProgram) {
			glProgram = new cc.GLProgram();
			glProgram.initWithString(vert, frag);
			if (!cc.sys.isNative) {  
				glProgram.initWithVertexShaderByteArray(vert, frag);
				glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
				glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
				glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
			}
			else
			{
				glProgram.initWithString(vert, frag);
			}
			glProgram.link();  
            glProgram.updateUniforms();
			this.shaderPrograms[shaderName] = glProgram;
		}
		
		switch(shaderName)
		{
			case "CornerShader":
			case "CornerShader2":
			case "CornerPortrait":
			case "CornerDialogBg":
			case "cornerShader14":
				if(cc.sys.isNative)
				{
					let glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(glProgram);
					glProgramState.setUniformFloat("u_cornerSize", args[0]);
					glProgramState.setUniformFloat("u_interval", args[1]);
					glProgramState.setUniformFloat("u_ratio", args[2]);
					glProgramState.setUniformFloat("u_FirstQuaDrant", args[3]);
					glProgramState.setUniformFloat("u_SecondQuaDrant", args[4]);
					glProgramState.setUniformFloat("u_ThirdQuaDrant", args[5]);
					glProgramState.setUniformFloat("u_FourthQuaDrant", args[6]);
				}
				else
				{
					let cornerSize = glProgram.getUniformLocationForName("u_cornerSize");
					glProgram.setUniformLocationWith1f(cornerSize, args[0]);
					let interval = glProgram.getUniformLocationForName("u_interval");
					glProgram.setUniformLocationWith1f(interval, args[1]);
					let ratio = glProgram.getUniformLocationForName("u_ratio");
					glProgram.setUniformLocationWith1f(ratio, args[2]);
					let firstQuaDrant = glProgram.getUniformLocationForName("u_FirstQuaDrant");
					glProgram.setUniformLocationWith1f(firstQuaDrant, args[3]);
					let secondQuaDrant = glProgram.getUniformLocationForName("u_SecondQuaDrant");
					glProgram.setUniformLocationWith1f(secondQuaDrant, args[4]);
					let thirdQuaDrant = glProgram.getUniformLocationForName("u_ThirdQuaDrant");
					glProgram.setUniformLocationWith1f(thirdQuaDrant, args[5]);
					let fourthQuaDrant = glProgram.getUniformLocationForName("u_FourthQuaDrant");
					glProgram.setUniformLocationWith1f(fourthQuaDrant, args[6]);
				}
				break;
			default:
				break;
		}

		if(cc.sys.isNative)
		{
			let glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(glProgram);
			sprite._sgNode.setGLProgramState(glProgramState);
		}
		else
		{
			sprite._sgNode.setShaderProgram(glProgram);
		}
		
		return glProgram;
	},
};

module.exports = ShaderUtils;