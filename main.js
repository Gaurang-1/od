img="";
status="";
objects=[];

function preload(){
    img=loadImage('dog_cat.jpg');
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modalLoaded);
    document.getElementById("status").innerHTML="Status = Detecting objects";
}

function modalLoaded(){
    console.log("Modal Loaded");
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(img,0,0,640,420);

    if (status !="") {
        for (i=0; i < objects.length ;i++){
            document.getElementById("status").innerHTML="Staus = Object detected";

            fill("#FF0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" " + percent + " % ", + objects[i].x + 15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        } 
    }

}