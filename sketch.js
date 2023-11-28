let classifier;
let video;
let flippedVideo;
let result;
let div;
let img1;
let img2;
let img3;

// paste your url from teachable machine here
let modelURL = "https://teachablemachine.withgoogle.com/models/AMh57X1xr/";

function preload() {
  // load image before we start setup
  // note that this image has been uploaded (see sketch files to left)
  img1 = loadImage("images/a-01.png");
  img2 = loadImage("images/Friends-01.png");
  img3 = loadImage("images/bFriends-01.png");
  // Load image classifier model before setting up canvas
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  createCanvas(240, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  div = createDiv("Loading model...");
  flippedVideo = ml5.flipImage(video);
  
  classifyVideo();
}

function draw() {
  flippedVideo = ml5.flipImage(video)
  image(flippedVideo, 0, 0);
  if (result == 'Acquaintance') {
    div.html('Acquaintance');
    image(img1, 0, 0, 240, 240);
  } else if (result == 'Friends') {
    div.html('Friends');
    image(img2, 0, 0, 240, 240);
  } else if (result == 'Best friends') {
     div.html('Best friends');
    image(img3, 0, 0, 240, 240);
  }  
}

function classifyVideo() {
  // call gotResult when classification is done
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(err, results) {
  if (results.length > 0) {
    if (results[0].label != result) {
      // look at first (most likely) result
      result = results[0].label;
    }
  }
  
  // start a new classification after 100 ms
  setTimeout(classifyVideo, 100);
}
