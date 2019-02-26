const obniz = new Obniz("");
let sending = false;

let tile = new Array(4);
for(let y = 0; y < 4; y++) {
  tile[y] = new Array(4).fill(0);
}

let tileColorR = new Array(4);
for(let y = 0; y < 4; y++) {
  tileColorR[y] = new Array(4).fill(255);
}

let tileColorG = new Array(4);
for(let y = 0; y < 4; y++) {
  tileColorG[y] = new Array(4).fill(255);
}

let tileColorB = new Array(4);
for(let y = 0; y < 4; y++) {
  tileColorB[y] = new Array(4).fill(255);
}

obniz.onconnect = async function () {
  obniz.io0.output(false) // for sharing GND.
  obniz.uart0.start({tx: 1, rx: 2, baud:115200});
}
/*
const test = () => {
  console.log("click");
  obniz.uart0.send([48, 0, 0, 0, 255, 0]);
}
*/
const sendLightOrder = (arduinoID, tileID, R, G, B, lightmode) => {
  obniz.uart0.send([arduinoID, tileID, R, G, B, lightmode]);
}

const sendTileStepped = (arduinoID, tileID) => {
  obniz.uart0.send(["t", arduinoID, tileID])
}

const drawTiles = (x, y ,r, g, b) => {
  fill(r, g, b);
  rect(x, y, 150, 150);
}

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(255);
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      drawTiles(i * 150 + 100, j * 150 + 100, tileColorR[3-i][j], tileColorG[3-i][j], tileColorB[3-i][j]);
    } 
  }
}

function mousePressed() {
  const tileX = 3 - int((mouseX - 100) / 150);
  const tileY = int((mouseY - 100) / 150);
  console.log(tileX + "," + tileY);
  if(sending === false){
    sendTileStepped(tileX, tileY);
    sending = true;
  }
}

function mouseReleased() {
  sending = false;
}

