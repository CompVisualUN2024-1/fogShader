precision mediump float;
attribute vec4 aPosition;
attribute vec2 aTexCoord;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying vec2 vTexCoord;
varying float vDist;

void main() {
vec4 position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition);
vDist = position.z / position.w;
vTexCoord = aTexCoord;
gl_Position = position;
}