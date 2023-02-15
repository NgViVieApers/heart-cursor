console.clear();

var vw = window.innerWidth;
var vh = window.innerHeight;

var pad = 6;
var minWidth = 70;
var maxWidth = 140;
var bubbleHeight = 70;
var tmp = 0

var elastic = Elastic.easeOut.config(0.3, 0.3);

var bubbles = [];

for (var i = 0; i < 200; i++) {
  var bubble = createBubble(i);
  bubbles.push(bubble);  
  placeBubble(bubble);
}

window.addEventListener("resize", resize);

function placeBubble(bubble) {
  
  bubble.placed = true;
  bubble.width  = tmp;
  bubble.left   = randomInt(pad, vw - (bubble.width + pad));
  bubble.top    = randomInt(pad, vh - (bubble.height + pad));
  bubble.right  = bubble.left + bubble.width;
  bubble.bottom = bubble.top  + bubble.height;
  
  // Loop through all bubbles
  for (var i = 0; i < bubbles.length; i++) {
    
    var b = bubbles[i];
    
    // Skip if b is this bubble or isn't placed
    if (b === bubble || !b.placed) {
      continue;
    }
    
    // Collision detected, can't place bubble
    if (intersects(bubble, b)) {
      bubble.placed = false;
      break;
    }    
  }
  
  if (bubble.placed) {    
    
    // No collisions detected. It's place is reserved and we can animate to it
    animateBubble(bubble);    
    
  } else {        
    
    // Can't place bubble. Try again on next animation frame
    requestAnimationFrame(function() {
      placeBubble(bubble);
    });
  }
}

function createBubble(index) {
  
  var element = document.createElement("div"); 
  document.body.appendChild(element);
  element.className = "bubble";
  tmp = randomInt(minWidth, maxWidth);
  //element.textContent = "YOU";
  element.style.height = tmp + "px";
  element.style.width = tmp + "px";
  //element.style.lineHeight = tmp + "px";
  //element.style.fontSize = tmp/5 + "px"
  element.style.filter = "hue-rotate("+(randomInt(-40,40) + "deg")+")";
  element.style.backgroundImage = "url(img" + (Math.floor(Math.random()*5)+1) + ".png)";
  
  return {
    element: element,
    placed: false,
    width: tmp,
    height: tmp,//bubbleHeight,
    left: 0,
    top: 0,
    right: tmp,
    bottom: tmp,//bubbleHeight,
    
  };
}

function animateBubble(bubble) {
  
  TweenLite.set(bubble.element, {
    width: tmp,
    height: tmp,
    x: bubble.left,
    y: vh
  });
  
  var tl = new TimelineLite({ onComplete: placeBubble, onCompleteParams: [bubble] })
    .to(bubble.element, 1, { autoAlpha: 1, y: bubble.top, ease: elastic }, random(10))
    .add("leave", "+=" + random(5, 10))
    .add(function() { bubble.placed = false; }, "leave") // When bubble is leaving, it is no longer placed
    .to(bubble.element, 1, { autoAlpha: 0, y: -vh }, "leave");
}



function intersects(a, b) {
  return !(b.left > a.right + pad || 
           b.right < a.left - pad || 
           b.top > a.bottom + pad || 
           b.bottom < a.top - pad);
}

function resize() {
  vw = window.innerWidth;
  vh = window.innerHeight;
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}

function randomInt(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return Math.floor(min + (max - min + 1) * Math.random());
}
