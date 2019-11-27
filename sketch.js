let squareX;
let squareY;

var score = 0

var dx = 1;
var dy = 1;

var speedIncrease = 5;
var hitBox = 1

var directionX = 1;
var directionY = 1;
var totalShots = 0
var hits = 0

var scene1 = true;
var scene2 = false;
var scene3 = false;
var scene4 = false;

var newLb = [];

let standardVar;
let distance;
let pg;
let delta;
var deviceDesktop = true;
var firstTime = true;
var lowestHigh = 100000000
var usernameText = ""

function preload() {
  lb = loadStrings('leaderboard.txt')
}

function setup() {

  for (var records of lb) {
    recordSplit = records.split("-");
    if (int(recordSplit[1]) < lowestHigh) {
      lowestHigh = int(recordSplit[1])
    }
  }

  createCanvas(windowWidth, windowHeight);
  noCursor();

  pg = createGraphics(windowWidth, windowHeight);
  pg.clear();

  squareX = windowWidth / 2;
  squareY = windowHeight / 2;
  standardVar = min(windowWidth, windowHeight) / 8
  delta = standardVar * 0.05

  if (displayWidth < 500 || displayHeight < 500) {
    deviceDesktop = false;
    speedIncrease = 4;
    hitBox = 1.1
  }
}

function draw() {
  background(200, 200, 200);
  image(pg, 0, 0)

  if (scene1) {
    drawScene1()
  }

  if (scene2) {
    drawScene2()
  }

  if (scene3) {
    drawScene3()
  }

  if (scene4) {
    drawScene4()
  }

  drawCursor();
}

function mousePressed() {
  if (deviceDesktop) {
    clickedMouse();
  }
}

function touchStarted() {
  if (!deviceDesktop) {
    clickedMouse();
  }
}

function drawScene1() {
  drawButton("NEW", width / 3, height / 2, standardVar * 2.5, standardVar * 0.8, delta * 5, delta * 0.4, delta * 1.6)
  drawButton("LEADERBOARD", width * 2 / 3, height / 2, standardVar * 2.5, standardVar * 0.8, delta * 5, delta * 0.4, delta * 1.6)
}

function drawScene2() {
  drawTopOfScreenData();
  drawTarget();
  moveTarget();

  drawButton("QUIT", width * 0.95, height * 0.95, standardVar * 0.7, standardVar * 0.35, delta * 5, delta * 0.2, delta * 0.4)
}

function drawScene3() {

  stroke(0)
  fill(180, 0, 0)
  textSize(standardVar * 2 / 3)
  text("CONGRATULATIONS!", width / 2 - standardVar * 3.5, height / 5)
  textSize(standardVar / 4)
  text("Enter Username:", width / 2 - standardVar * 1, height / 5 + 100)

  if (usernameText.length > 15) {
    usernameText = "";
  }
  text(str(usernameText), width / 2 - standardVar * 1, height / 5 + 200)
  text(key, 10, 10)

}

function keyTyped() {
  if (key === 'a') {
    usernameText += 'a'
  }
  if (key === 'b') {
    usernameText += 'b'
  }
  if (key === 'c') {
    usernameText += 'c'
  }
  if (key === 'd') {
    usernameText += 'd'
  }
  if (key === 'e') {
    usernameText += 'e'
  }
  if (key === 'f') {
    usernameText += 'f'
  }
  if (key === 'g') {
    usernameText += 'g'
  }
  if (key === 'h') {
    usernameText += 'h'
  }
  if (key === 'i') {
    usernameText += 'i'
  }
  if (key === 'j') {
    usernameText += 'j'
  }
  if (key === 'k') {
    usernameText += 'k'
  }
  if (key === 'l') {
    usernameText += 'l'
  }
  if (key === 'm') {
    usernameText += 'm'
  }
  if (key === 'o') {
    usernameText += 'o'
  }
  if (key === 'p') {
    usernameText += 'p'
  }
  if (key === 'q') {
    usernameText += 'q'
  }
  if (key === 'r') {
    usernameText += 'r'
  }
  if (key === 's') {
    usernameText += 's'
  }
  if (key === 't') {
    usernameText += 't'
  }
  if (key === 'u') {
    usernameText += 'u'
  }
  if (key === 'u') {
    usernameText += 'u'
  }
  if (key === 'v') {
    usernameText += 'v'
  }
  if (key === 'w') {
    usernameText += 'w'
  }
  if (key === 'x') {
    usernameText += 'x'
  }
  if (key === 'y') {
    usernameText += 'y'
  }
  if (key === 'z') {
    usernameText += 'z'
  }
  if (key === ' ') {
    usernameText += ' '
  }
  if (key === 'p') {
    usernameText = ''
  }
  if (key === 'o') {
    print("derp")
    username = usernameText;
    usernameText = '';
    saveRecords();
    scene1 = false;
    scene2 = false;
    scene3 = false;
    scene4 = true;
  }
}

function saveRecords() {

  newLb = []

  recordUser = str(username) + "-" + str(score)
  scoreWritten = false;

  for (var records of lb) {

    recordSplit = records.split("-");
    x = int(recordSplit[1])
    if (x > score) {
      newLb.push(recordSplit[0]+'-'+recordSplit[1]);

    } else {
      if (!scoreWritten){
        scoreWritten = true;
        newLb.push(recordUser);
      }else if(x > lowestHigh){
        newLb.push(recordSplit[0]+'-'+recordSplit[1]);
      }
    }
  }
  saveStrings(newLb, 'FPS Trainer/leaderboard.txt');
}

function drawScene4() {
  drawLeaderboard();
  drawButton("NEW", width / 2, height / 2 + 100, standardVar * 2.5, standardVar * 0.8, delta * 5, delta * 0.4, delta * 1.6)
  drawTopOfScreenData();

}

function drawLeaderboard() {
  stroke(0)
  fill(180, 0, 0)
  textSize(standardVar * 2 / 3)
  text("LEADERBOARD", width / 2 - standardVar * 3.5, height / 5)
  textSize(standardVar / 3)
  counterz = 1
  for (var records of lb) {
    recordSplit = records.split("-");
    text(str(counterz) + ".", width / 4 - delta * 8, height / 5 + counterz * delta * 8)
    text(recordSplit[0], width / 4, height / 5 + counterz * delta * 8)
    text(recordSplit[1], width * 3 / 4, height / 5 + counterz * delta * 8)
    counterz += 1
    if (int(recordSplit[1]) < lowestHigh) {
      lowestHigh = recordSplit[1]
    }
  }

}

function drawButton(t, x, y, w, h, ts, sw, rc) {
  stroke(0)
  strokeWeight(sw)
  fill(220)
  rectMode(CENTER)
  rect(x, y, w, h, rc)
  stroke(0)
  strokeWeight(sw)
  fill(180, 0, 0);
  strokeWeight(sw)
  textSize(ts)
  text(str(t), x - delta * int(t.length * 1.7), y + delta * 1.5)
}

function drawTarget() {
  stroke(255, 255, 255)
  strokeWeight(delta);
  fill(180, 0, 0);
  circle(squareX, squareY, standardVar)
  circle(squareX, squareY, standardVar * 0.75)
  circle(squareX, squareY, standardVar / 2)
  circle(squareX, squareY, standardVar / 4)
}

function moveTarget() {
  squareX += dx * directionX
  squareY += dy * directionY

  if (squareX >= width - delta * 10) {
    if (directionX > 0) {
      directionX *= -1
      score -= 1
    }
  }

  if (squareY >= height - delta * 10) {
    if (directionY > 0) {
      directionY *= -1
      score -= 1
    }
  }

  if (squareX <= delta * 10) {
    if (directionX < 0) {
      directionX *= -1
      score -= 1
    }
  }

  if (squareY <= delta * 10) {
    if (directionY < 0) {
      directionY *= -1
      score -= 1
    }
  }
}

function drawCursor() {
  stroke(0)
  strokeWeight(standardVar * 0.03)
  delta = standardVar * 0.05
  line(mouseX - delta, mouseY, mouseX - delta * 4, mouseY)
  line(mouseX + delta, mouseY, mouseX + delta * 4, mouseY)
  line(mouseX, mouseY + delta, mouseX, mouseY + delta * 4)
  line(mouseX, mouseY - delta, mouseX, mouseY - delta * 4)
}

function clickedMouse() {
  if (scene1) {
    if (mouseY >= height / 2 - standardVar * 0.4 && mouseY <= height / 2 + standardVar * 0.4) {
      if (mouseX >= width / 3 - standardVar * 1.25 && mouseX <= width / 3 + standardVar * 1.25) {
        newGame();
      }
      if (mouseX >= width * 2 / 3 - standardVar * 1.25 && mouseX <= width * 2 / 3 + standardVar * 1.25) {
        scene1 = false;
        scene2 = false;
        scene3 = false;
        scene4 = true;
      }
    }
  } else if (scene2) {

    if (mouseY >= height * 0.96 - standardVar * 0.35 / 2 && mouseY <= height * 0.96 + standardVar * 0.35 / 2) {
      if (mouseX >= width * 0.95 - standardVar * 0.7 / 2 && mouseX <= width * 0.95 + standardVar * 0.7 / 2) {
        quitGame();
      }
    } else {

      shot();
    }
  } else if (scene4) {
    if (mouseY >= height * 0.5 + 100 - standardVar * 0.8 / 2 && mouseY <= height * 0.5 + 100 + standardVar * 0.8 / 2) {
      if (mouseX >= width * 0.5 - standardVar * 2.5 / 2 && mouseX <= width * 0.5 + standardVar * 2.5 / 2) {
        newGame();
      }
    }
  }
}

function quitGame() {

  scene1 = false;
  scene2 = false;
  if (score > lowestHigh) {
    scene3 = true;
    scene4 = false;
  } else {
    scene3 = false;
    scene4 = true;
  }
}

function shot() {
  totalShots += 1
  distance = ((squareX - mouseX) ** 2 + (squareY - mouseY) ** 2) ** 0.5
  if (distance > delta * 10 * hitBox) {
    pg.noStroke()
    pg.fill(delta * 2)
    pg.circle(mouseX, mouseY, delta * 2)
    score -= 4

  } else {
    dx = dx * (1 + speedIncrease / 300) + 0.3
    dy = dy * (1 + speedIncrease / 300) + 0.3
    directionX = 1 - floor(random() * 2) * 2
    directionY = 1 - floor(random() * 2) * 2
    score += 20
    squareX = random(width / 4, width * 3 / 4)
    squareY = random(height / 4, height * 3 / 4)
    hits += 1
  }
}

function drawTopOfScreenData() {
  fill(180, 0, 0);
  strokeWeight(delta / 2)
  textSize(delta * 5)
  text('score', delta * 5, delta * 8)
  text(str(score), delta * 30, delta * 8)
  text('V0.5', windowWidth / 2, delta * 8)
  text('Accuracy', width - delta * 40, delta * 8)
  text(str(int(hits * 100 / totalShots)) + ' %', width - delta * 15, delta * 8)
}

function newGame() {
  scene1 = false;
  scene2 = true;
  scene3 = false;
  scene4 = false;
  score = 0;
  hits = 0;
  dx = 1;
  dy = 1;
  directionX = 1 - floor(random() * 2) * 2;
  directionY = 1 - floor(random() * 2) * 2;
  totalShots = 0;
  firstTime = false;

}