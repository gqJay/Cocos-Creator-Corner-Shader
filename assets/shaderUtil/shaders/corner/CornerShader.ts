export default class CornerShader {
    static vert = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec4 a_color;

    varying vec4 v_fragmentColor; 
    varying vec2 v_texCoord;
    varying vec2 v_modifyCoord;

    void main() 
    { 
        gl_Position = CC_PMatrix * a_position;
        v_fragmentColor = a_color; 
        v_texCoord = a_texCoord;
        v_modifyCoord = v_texCoord - vec2(0.5, 0.5);
    }`;

    static frag = `
    #ifdef GL_ES
    precision high float;
    #endif

    varying vec4 v_fragmentColor;
    varying vec2 v_texCoord;
    varying vec2 v_modifyCoord;

    //圆角的半径,针对高的v坐标
    uniform float u_cornerSize;
    //alpha过度的范围
    uniform float u_interval;
    //宽高比
    uniform float u_ratio;

    void main()
    {
        vec4 sampleCol = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
        gl_FragColor.xyz = sampleCol.xyz;

        float greaterOne = step(1.0, u_ratio);

        //Map uv
        //v_modifyCoord = vec2(v_modifyCoord.y * u_ratio, v_modifyCoord.y);
        vec2 modifyCoord = vec2(v_modifyCoord.x * u_ratio, v_modifyCoord.y);

        //判断参数有效性
        float validOne = step(u_cornerSize, 0.5);
        float validTwo = step(u_cornerSize, u_ratio / 2.0);
        float validResult = step(2.0, validOne + validTwo);

        float judgeOne = step(abs(modifyCoord.x), u_ratio / 2.0 - u_cornerSize);
        float judgeTwo = step(abs(modifyCoord.y), 0.5 - u_cornerSize);

        float interval = distance(abs(modifyCoord), vec2(u_ratio / 2.0 - u_cornerSize, 0.5 - u_cornerSize));
        float judgeThree = step(interval, u_cornerSize - u_interval);

        //alpha过度区域检测
        float judgeFour = step(u_cornerSize - u_interval, interval);
        float judgeFive = step(interval, u_cornerSize);

        gl_FragColor.w = (step(1.0, judgeOne + judgeTwo + judgeThree) 
        + step(2.0, judgeFour + judgeFive) * (1.0 - (interval - (u_cornerSize - u_interval)) / u_interval)) * validResult + (1.0 - validResult);
    }
    `;
}