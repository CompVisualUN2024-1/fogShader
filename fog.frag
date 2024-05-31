precision mediump float;  
varying vec2 vTexCoord;
varying float vDist;

uniform sampler2D uTexture;
uniform vec4 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

void main() {
vec4 texColor = texture2D(uTexture, vTexCoord);
float fogFactor = smoothstep(uFogNear, uFogFar, vDist);
vec4 finalColor = mix(texColor, uFogColor, fogFactor); 
finalColor.a = texColor.a;
gl_FragColor = finalColor;
}