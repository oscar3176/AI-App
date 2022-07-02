video = "";
objects = [];
Status = "";
function preload() {
}
function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(600,250);
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function draw() {
    if (Status != ""){
    image(video, 0, 0, 500, 500);
    objectDetector.detect(video, gotResults);
    r = random(255);
    g = random(255);
    b = random(255);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status: Detecting Objects";
        document.getElementById("status").innerHTML = "Object Detected: " + objects[i].label;
        document.getElementById("no.ofObjectsDetected").innerHTML = "NO. Of Objects Detected: " + objects.length;
        stroke(r, g, b); 
        fill(r, g, b);
        height = Math.round(objects[i].height);
        width = Math.round(objects[i].width);
        x = objects[i].x;
        y = objects[i].y;
        confidence = Math.round(objects[i].confidence);
        text(objects[i].label, x, y, confidence);
        noFill()
        rect(x, y, width, height);
    }
    }
    


}
function start() {
    objectDetector = ml5.objectDetector('cocossd', ModalLoaded);
    image(video, 0, 0, 500, 500);
    document.getElementById("status").innerHTML = "Status: Loading Cam...";
}
function ModalLoaded() {
    console.log("Modal Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}
function  gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
