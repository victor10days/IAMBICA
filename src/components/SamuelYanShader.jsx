import WebGLShader from './WebGLShader';

const fragSrc = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const int GRID = 32;
const float CELL_SIZE = 1.0 / float(GRID);

float hash(float n){ return fract(sin(n)*43758.5453); }

float sampleCell(vec2 uv){
    uv = clamp(uv, 0.0, 1.0);
    float x = floor(uv.x * float(GRID));
    float y = floor(uv.y * float(GRID));
    float seed = x*127.0 + y*232.0;
    return 0.5 + 0.5*sin(u_time*0.5 + hash(seed)*6.2831);
}

float nextState(vec2 uv){
    float c  = sampleCell(uv);
    float n1 = sampleCell(uv + vec2(CELL_SIZE,0.0));
    float n2 = sampleCell(uv + vec2(-CELL_SIZE,0.0));
    float n3 = sampleCell(uv + vec2(0.0,CELL_SIZE));
    float n4 = sampleCell(uv + vec2(0.0,-CELL_SIZE));

    float sum = c + n1 + n2 + n3 + n4;

    float r = sin(sum*1.0 + u_time*0.5);
    return step(0.2+0.1*cos(u_time*0.1), r);
}

float boxSDF(vec2 p, vec2 b){
    vec2 d = abs(p) - b;
    return max(d.x,d.y);
}

void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy) / u_resolution.y;

    vec2 cellUV = floor((uv+0.5)*float(GRID))/float(GRID) + CELL_SIZE*0.5;

    float state = nextState(cellUV);

    float d = boxSDF(uv - cellUV, vec2(CELL_SIZE*0.45));

    float col = smoothstep(0.2, 0.02, 0.2 - d) * state;

    vec3 deadColor = vec3(0.961, 0.906, 0.776);
    vec3 aliveColor = vec3(0.824, 0.169, 0.169);
    vec3 color = mix(deadColor, aliveColor, col);

    gl_FragColor = vec4(color, 1.0);
}
`;

const SamuelYanShader = (props) => <WebGLShader fragSrc={fragSrc} {...props} />;

export default SamuelYanShader;
