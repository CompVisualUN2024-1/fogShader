let cubes = [];
let tex;
let fogShader;
let fogNearSlider, fogFarSlider;
let fogColor, backgroundColor;

function preload() {
  tex = loadImage("https://webglfundamentals.org/webgl/resources/f-texture.png");
  fogShader = loadShader('fog.vert', 'fog.frag');
}

function setup() {
  createCanvas(640, 480, WEBGL);

  backgroundColor = color(200);
  let nCubes = 40;
  let distance = 120;

  for (let i = 0; i < nCubes; i++) {
    cubes.push(new Cube(0, 0, i * distance, i));
  }

  camera(-width/4, 0, -200, 0, 0, nCubes*distance/8, 0, 1, 0);
  shader(fogShader);
  
  fogNearSlider = createSlider(0, 1, 0.7, 0.001);
  fogNearSlider.label = createP('Fog Near: ');
  fogNearSlider.label.position(10, height);
  fogNearSlider.position(100, height + 30);

  fogFarSlider = createSlider(0, 1, 0.9, 0.001);
  fogFarSlider.label = createP('Fog Far: ');
  fogFarSlider.label.position(10, height + 50);
  fogFarSlider.position(100, height + 85);

  let fogColorLabel = createP('Fog Color: ');
  fogColorLabel.position(250, height);
  fogColor = createColorPicker(color(200));
  fogColor.position(330, height + 30);
  fogColor.input(updateFogColor);

  noStroke();
}

function draw() {
  background(backgroundColor);
  orbitControl();

  fogShader.setUniform('uFogColor', [red(fogColor.color())/255, green(fogColor.color())/255, blue(fogColor.color())/255]);
  fogShader.setUniform('uFogNear', fogNearSlider.value());
  fogShader.setUniform('uFogFar', fogFarSlider.value());

  for (let cube of cubes) {
    fogShader.setUniform('uTexture', tex);
    cube.display();
  }
}

function Cube(x, y, z, i) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.display = function () {
    push();
    translate(this.x, this.y, this.z);
    rotateZ(-0.05 * i + frameCount * 0.01);
    rotateX(-0.05 * i + frameCount * 0.01);
    rotateY(-0.05 * i + frameCount * 0.01);
    box(50);
    pop();
  }
}


function updateFogColor() {
  fogShader.setUniform('uFogColor', [red(fogColor.color())/255, green(fogColor.color())/255, blue(fogColor.color())/255]);
}