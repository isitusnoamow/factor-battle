let seed = 1;
let currentAnswer = [];
let startTime = 0;
let question = 1;
let correctsfx = new Audio("correct.mp3");
let wrongsfx = new Audio("wrong.mp3");
let attempts = 0;
let generator;

// onclick function for the button with the id random to set the field with id number to a random number
function randomSeed() {
  document.getElementById("number").value = Math.floor(Math.random() * 100000);
}

function createEasyQuadratic() {
  let a = ""
  if (Math.random ()> 0.5){
    a += "-"
  }
  a += Math.ceil(generator()*9)
  let b = ""
  if (Math.random() > 0.5){
    b += "-"
  }
  b += Math.ceil(generator()*9)

  a = Number(a)
  b = Number(b)

  let bx = a+b
  let cx = a*b
  
  let quadraticString = "x^2 + " + bx + "x + " + cx
  document.getElementById("question").innerHTML = quadraticString
  currentAnswer = [a,b]
  currentAnswer.sort()
}

function createEasyCubic() {
  let a = ""
  if (Math.random() > 0.5) {
    a += "-"
  }
  a += Math.ceil(generator() * 9)
  let b = ""
  if (Math.random() > 0.5) {
    b += "-"
  }
  b += Math.ceil(generator() * 9)
  let c = ""
  if (Math.random() > 0.5) {
    c += "-"
  }
  c += Math.ceil(generator() * 9)

  a = Number(a)
  b = Number(b)
  c = Number(c)

  let bx = a+b+c
  let cx = a*b + b*c + a*c
  let dx = a*b*c

  let cubicString = "x^3 + " + bx + "x^2 + " + cx + "x + " + dx
  document.getElementById("question").innerHTML = cubicString
  currentAnswer = [a, b, c]
  currentAnswer.sort()
}


function start(){
  seed = document.getElementById("number").value;  
  generator = new Math.seedrandom(String(seed));
  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "block";  
  startTime = Date.now();
  createEasyQuadratic()
}

function checkQuestion() {
  attempts++;
  let a = Number(document.getElementById("sol1").value)
  let b = Number(document.getElementById("sol2").value)
  let userAnswer;
  if (question > 10) {
    let c = Number(document.getElementById("sol3").value)
    userAnswer= [a,b,c]
  } else{
    userAnswer = [a,b];
  }
  userAnswer.sort()
  if (String(userAnswer) == String(currentAnswer)){
    correctsfx.play()
    if (question >= 15) {
      finishGame()
    }
    if (question >= 10) {
      document.getElementById("cubic").style.display = "block";
      createEasyCubic()
    }
    else{
      createEasyQuadratic()
    }
    question++;
    document.getElementById("no").innerHTML = String(question) + "/15";
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
  let percent = String(Math.round(1500/attempts))
  let time = String((Date.now() - startTime)/1000)
  let seedString = String(seed)
  let hashString = percent + time + seedString + "dog"
  document.getElementById("game").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("time").innerHTML = "Time: " + time + "s";
  document.getElementById("accuracy").innerHTML = "Accuracy: " + percent + "%";
  document.getElementById("seedy").innerHTML = "Seed: " + seedString;
  document.getElementById("hash").innerHTML = "Anti-Cheat Hash: " + String(hashString.hashCode());
}