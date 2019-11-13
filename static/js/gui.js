//---------------
// Adapted from https://bensonruan.com/handwritten-digit-recognition-with-tensorflow-js/
//---------------

//Variables
let model;
var canvasWidth = 150;
var canvasHeight = 150;
var canvasStrokeStyle = "white";
var canvasLineJoin = "round";
var canvasLineWidth = 10;
var canvasBackgroundColor = "black";
var canvasId = "canvas";
var clickX = new Array();
var clickY = new Array();
var clickD = new Array();
var moving;
var currX = 0;
var currY = 0;
var canvasBox = document.getElementById('canvas_box');
var canvas    = document.createElement("canvas");


//---------------
// Create canvas
//---------------
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("id", canvasId);
canvas.style.backgroundColor = canvasBackgroundColor;
canvasBox.appendChild(canvas);

//Check if the browser support the content
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

//Get the 2D content of the Canvas
ctx = canvas.getContext("2d");

//Get the current position of the mouse X and Y coordinates relatively to the canvas
//The window X and Y coordinates minus the canvas offset values.
function getCurrPos(e) {
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
}

//---------------------
// Move down function
//---------------------
$("#canvas").mousedown(function(e) {
	var rect = canvas.getBoundingClientRect();
    getCurrPos(e);
    moving = true;
    onClick(currX, currY);
    draw();
});

//---------------------
// move function
//---------------------
$("#canvas").mousemove(function(e) {
    if(moving) {
	    getCurrPos(e);
	   onClick(currX, currY, true);
       draw();
    }
});
 
//-------------------
// move up function
//-------------------
$("#canvas").mouseup(function(e) {
    moving = false;
});
 
 
//----------------------
// leave canvas function
//----------------------
$("#canvas").mouseleave(function(e) {
    moving = false;
});
 
 
//--------------------
// click function
//--------------------
function onClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickD.push(dragging);
}
 
//-------------------
// draw function
//-------------------
function draw() {
	
	//clear everything in the canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
	//Line colour
	ctx.strokeStyle = canvasStrokeStyle;
	//Join lines with rounded corners equal to the line width
	ctx.lineJoin    = canvasLineJoin;
	//line tickness
	ctx.lineWidth   = canvasLineWidth;
    
	//start a new path.
	for (var i = 0; i < clickX.length; i++) {
		ctx.beginPath();
		//If mouse is held down and moving(draging)
		if(clickD[i] && i) {
			ctx.moveTo(clickX[i-1], clickY[i-1]);
		} else {
			ctx.moveTo(clickX[i]-1, clickY[i]);
		}
		//connect the current sub-path
        //to the last sub-path with a straight line
		ctx.lineTo(clickX[i], clickY[i]);
		//close the path.
		ctx.closePath();
		ctx.stroke();
	}
}

//------------------------
// clear button function
//------------------------
$("#clearBtn").click(async function () {
	//clear the canvas, result text and result box
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    clickX = new Array();
    clickY = new Array();
    clickD = new Array();
    $(".prediction-text").empty();
    $("#resultBoX_ID").addClass('d-none');
});


//-------------------------------------
// read and load model from model file.
//-------------------------------------
async function loadModel() {
    // clear the model variable
    model = undefined; 
    // load the model using a HTTPS request (where you have stored your model files)
    model = await tf.loadLayersModel("static/models/model.json");
    console.log("model loading 1..");
  }
   
 loadModel();
 
 
//-----------------------------------------------
// preprocess the canvas image
//-----------------------------------------------
function preprocessCanvas(image) {
    // resize the input image to target size of (1, 28, 28)
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    return tensor.div(255.0);
}

//--------------------------------------------
// predict results
//--------------------------------------------
//Call the server(Flask) once and store or cache the data from the model
//on the browser and then use it from the browser.
$("#predictBtn").click(async function () {
    // preprocess canvas
    let tensor = preprocessCanvas(canvas);
 
    // make predictions on the preprocessed image tensor
	//Connect to the server once upon the first click and cache the data to ther browser
	//From the second click serve from the cache data on the browser
    let predictions = await model.predict(tensor).data();
 
    // get the model's prediction results
    let results = Array.from(predictions);
 
    // display the predictions in chart
    $("#resultBoX_ID").removeClass('d-none');
    displayChart(results);
    displayLabel(results);
   //console.log(results);
});


//------------------------------
// plot bar chart and display result
//------------------------------
var chart = "";
var firstTime = 0;
function loadChart(label, data, modelSelected) {
	var ctx = document.getElementById('chartBox_ID').getContext('2d');
	chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'bar',

	    // The data for our dataset
	    data: {
	        labels: label,
	        datasets: [{
	            label: modelSelected + " prediction",
	            backgroundColor: '#f50057',
	            borderColor: 'rgb(255, 99, 132)',
	            data: data,
	        }]
	    },

	});
}

//----------------------------
// display chart with image data predicted from the model
// gotten from updated image from the canvas.
//----------------------------
function displayChart(data) {
	var select_model  = document.getElementById("select_model");
  	var select_option = "CNN";

	label = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	if (firstTime == 0) {
		loadChart(label, data, select_option);
		firstTime = 1;
	} else {
		chart.destroy();
		loadChart(label, data, select_option);
	}
	document.getElementById('chartBox_ID').style.display = "block";
}

//----------------------------
//Display result as a text format
//----------------------------
function displayLabel(data) {
	var max = data[0];
    var maxIndex = 0;

    for (var i = 1; i < data.length; i++) {
        if (data[i] > max) {
            maxIndex = i;
            max = data[i];
        }
    }
	$(".prediction-text").html("Predicting you draw <b>"+maxIndex+"</b> with <b>"+Math.trunc( max*100 )+"%</b> confidence")
}


//-----------------------
// TOUCH SCREEN EVENT LISTENNERS
//-----------------------
//Touch start function
canvas.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }

    var rect = canvas.getBoundingClientRect();
    var touch = e.touches[0];
 
    var mouseX = touch.clientX - rect.left;
    var mouseY = touch.clientY - rect.top;
 
    moving = true;
	 addUserGesture(mouseX, mouseY);
    draw();
 
}, false);

//Touch move function
canvas.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    if(moving) {
		
		var rect = canvas.getBoundingClientRect();
        var touch = e.touches[0];
 
        var mouseX = touch.clientX - rect.left;
        var mouseY = touch.clientY - rect.top;
 
		addUserGesture(mouseX, mouseY, true);
        draw();
    }
}, false);


//Touch click function
function addUserGesture(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickD.push(dragging);
}

//Touch end function
canvas.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    moving = false;
}, false);

//Touch leave function
canvas.addEventListener("touchleave", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    moving = false;
}, false);
