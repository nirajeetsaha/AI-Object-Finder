status = "";
object = "";
objects = [];

function preload()
{

}



function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects == object)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("number_of_objects").innerHTML = "Object mentioned found";
            document.getElementById("status").innerHTML = "Status: Object Detected";

            var synth = window.speechSynthesis;

            var utterThis = new SpeechSynthesisUtterance("Object mentioned found");
        
            synth.speak(utterThis);
        }
        else {
            document.getElementById("number_of_objects").innerHTML = "Object mentioned not found";   
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error) {
        console.log(error);
    }
    else {
    console.log(results);
    objects = results;
    }
}
