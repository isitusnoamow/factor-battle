let seed = 1;
let ogseed = 1;
let currentAnswer = [];
let startTime = 0;
let question = 1;
let correctsfx = new Audio("correct.mp3");
let wrongsfx = new Audio("wrong.mp3");
let attempts = 0;

function random() {
  var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// onclick function for the button with the id random to set the field with id number to a random number
function randomSeed() {
  document.getElementById("number").value = Math.floor(Math.random() * 100000);
}

function createEasyQuadratic() {
  let a = ""
  if (Math.random ()> 0.5){
    a += "-"
  }
  a += Math.ceil(random()*9)
  let b = ""
  if (Math.random() > 0.5){
    b += "-"
  }
  b += Math.ceil(random()*9)

  a = Number(a)
  b = Number(b)

  let bx = a+b
  let cx = a*b
  
  let quadraticString = "x^2 + " + bx + "x + " + cx
  document.getElementById("question").innerHTML = quadraticString
  currentAnswer = [a,b]
  currentAnswer.sort()
}


function start(){
  seed = document.getElementById("number").value;  
  ogseed = seed;
  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "block";  
  startTime = Date.now();
  createEasyQuadratic()
}

function checkQuestion() {
  attempts++;
  let a = Number(document.getElementById("sol1").value)
  let b = Number(document.getElementById("sol2").value)
  let userAnswer = [a,b];
  userAnswer.sort()
  if (userAnswer[0] == currentAnswer[0] && userAnswer[1] == currentAnswer[1]){
    correctsfx.play()
    if (question >= 10) {
      finishGame()
    }
    question++;
    document.getElementById("no").innerHTML = String(question) + "/10";
    createEasyQuadratic()
  } else {
    wrongsfx.play()
  }
}

String.prototype.hashCode = function() {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function finishGame() {
  let percent = String(Math.round(1000/attempts))
  let time = String((Date.now() - startTime)/1000)
  let seedString = String(ogseed)
  let hashString = percent + time + seedString + "dog"
  document.getElementById("game").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("time").innerHTML = "Time: " + time + "s";
  document.getElementById("accuracy").innerHTML = "Accuracy: " + percent + "%";
  document.getElementById("seedy").innerHTML = "Seed: " + seedString;
  document.getElementById("hash").innerHTML = "Hash: " + String(hashString.hashCode());
}