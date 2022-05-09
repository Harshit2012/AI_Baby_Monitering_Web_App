song = "";
objects = [];
status = "";

function preload(){
    song = loadSound("alert.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelloaded(){
    console.log("model Loaded!");
    status = ture;
}

function gotResults(error, results){
    if (error){
        console.log(error);
    }
    console.log(resutls);
    object = resutls;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = randome(255);
        g = randome(255);
        b = randome(255);
        objectDetector.detect(video, gotResults);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + precent + "%", objects[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby not Found";
                console.log("play");
                song.play();
            }
        }
        if(object.length == 0){
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();
        }
    }
}