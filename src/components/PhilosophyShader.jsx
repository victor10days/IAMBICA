import WebGLShader from './WebGLShader';

const fragSrc = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.25;
    for (int i = 0; i < 2; i++) {
        value += amplitude * noise(p);
        p *= 1.25;
        amplitude *= 0.125;
    }
    return value;
}

float contourLines(float v, float frequency, float line_thickness) {
    float lines = abs(fract(v * frequency) - 0.299);
    return smoothstep(0.5 - line_thickness, 0.499 + line_thickness, lines);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * -4.0 - 10.0;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 warp1 = vec2(
        noise(uv * 1.0 + vec2(u_time * 1.3, u_time * 0.2)),
        noise(uv * 120.0 + vec2(-u_time * 0.4, u_time * 0.2))
    );
    vec2 uv2 = uv + (warp1 - 0.25) * 0.6;

    vec2 warp2 = vec2(
        noise(uv2 * 1.0 + vec2(-u_time * 0.6, u_time * 0.4)),
        noise(uv2 * 190.0 + vec2(u_time * 2.5, u_time * 0.3))
    );
    vec2 uvFinal = uv2 + (warp2 - 1.5) / 0.995;

    vec2 flow = uvFinal + vec2(u_time * 0.26, u_time * 0.1);
    float n = fbm(flow);

    float n1 = fbm(flow + vec2(0.001, 0.0));
    float n2 = fbm(flow + vec2(0.0, 0.001));
    float grad = length(vec2(n1 - n, n2 - n));
    float edge = smoothstep(0.02, 0.2, grad);

    float frequency = sin(u_time * 0.1) * 5.0 + 10.0;
    float thickness = 0.125;
    float lines = contourLines(n, frequency, thickness);

    // Site palette
    vec3 creamColor = vec3(0.98, 0.953, 0.882);   // #FAF3E1
    vec3 tanColor = vec3(0.961, 0.906, 0.776);     // #F5E7C6
    vec3 redColor = vec3(0.824, 0.169, 0.169);     // #D22B2B

    // Background: cream to tan
    float nSmooth = smoothstep(0.02, 0.06, n);
    vec3 bgColor = mix(tanColor, creamColor, nSmooth);

    // Cream glow around lines (only in the surrounding area, not on the line itself)
    float glowZone = smoothstep(1.0, 0.2, lines) * smoothstep(0.0, 0.15, lines);
    vec3 color = mix(bgColor, creamColor, glowZone * 0.6);

    // Red contour lines on top (lines = 0 means line center)
    float lineMask = 1.0 - smoothstep(0.0, 0.12, lines);
    color = mix(color, redColor, lineMask);

    gl_FragColor = vec4(color, 1.0);
}
`;

const PhilosophyShader = (props) => <WebGLShader fragSrc={fragSrc} {...props} />;

export default PhilosophyShader;
