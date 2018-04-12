/*
[DATA POINT DETECTOR TEST FOR MENSTRUAL CALENDAR]

p5 Sketch

** In progress, the grid limit warping is still not fully functional **
This sketch was built with the help of Sejo Vega-Cebrián, using Daniel Shiffman's blob detection algorithm
https://github.com/CodingTrain/website/blob/master/Tutorials/Processing/11_video/sketch_11_7_BlobTracking/sketch_11_7_BlobTracking.pde
*/


/* G L O B A L  V A R I A B L E  D E C L A R A T I O N */

var video;
//IMPORTANT: the variable 'trackColor' defines which color the program will be looking out for, here the colors are currently hardcoded
var trackColor;
//The variable 'threshold' defines the minimum createCanvas of for a data point (an object defined in this program  of the Blob class, defined in the Blob.pde file) to be detected
var threshold = 30;

//The variable 'distThreshold' defines the minimum space that a data point must be from another so as not to be put into the same Blob object
var distThreshold = 15;

//The following variables ('gridLimitUp','gridLimitDown', 'gridLimitLeft','gridLimitRight' ) establish the area of the image the program must read in order to get the values
var gridLimitUp= 155; //y1
var gridLimitDown= 702; //y2
var gridLimitLeft= 142; //x1
var gridLimitRight= 782; //x2

// These are the temperature minimum and maximum ranges that will define the values of each data point, including decimals
var minTemp= 97; //
var maxTemp= 99; //

//CHANGE !!!! This is in Processingspeak

// 'dataPoints' is an array that stores the data points detected in the picture, uses the Blob class defined in the linked file
var dataPoints=[];


// 'tempValues' is an array that stores the temperature values of each data point detected in the picture
var tempValues=[];








/* S E T U P */

function  setup() {

//IMPORTANT: the variable 'trackColor' defines which color the program will be looking out for, here the colors are currently hardcoded
trackColor = color(107, 23, 25);


/*
function  captureEvent(Capture video) {
  video.read();
  */

video= createCapture(VIDEO)
video.size(800, 600);
//video.position(0, 0);
video.style('z-index', '-1');
video.style('display', 'none');

//size of viewport
createCanvas(800, 600);

}


/* K E Y P R E S S E S */

function  keyTyped() {

 if (key == 'q'){
    // Pressing 'q' on keyboard will reveal the number of data points detected by the program

    var dataPointCounter=0;
    for (let i in dataPoints) {
      b=dataPoints[i];
          if (b.size() > 35) {
            dataPointCounter++;
          }
        }
        console.log("There are "+dataPointCounter+" data points in this picture");
  }

  else if(key == 'w'){

        //console.log("The coordinates of all data points in this picture are: ");
        for (let i in dataPoints) {
          b=dataPoints[i];
          if (b.size() > 35) {
             //console.log("x: "+b.centerX+", y: "+b.centerY);

          console.log("The coordinates of of cycle day"+(int(i)+1)+" is x: "+b.centerX+", y: "+b.centerY);
          }
        }
    }


  else if(key == 'a'){
    for (var i=0; i < tempValues.length; i++)
    {
      console.log("The temperature for cycle day "+(i+1)+" is : "+tempValues[i]);
    }

  }

}

function draw(){
  drawUno();
}

/* D R A W */

function  drawUno() {

  video.loadPixels();
  image(video, 0, 0);

  stroke(0,255,0);
  noFill();
  strokeWeight(2);
  line(gridLimitLeft,gridLimitUp,gridLimitRight,gridLimitUp);
  line(gridLimitLeft,gridLimitDown,gridLimitRight,gridLimitDown);


  dataPoints = [];
  tempValues = [];



  // Begin loop to walk through every pixel
  for (let x = 0; x < video.width; x++ ) {
    for (let y = 0; y < video.height; y++ ) {
      let loc = (x + y * video.width)* 4 ;
      // What is current color
      //let currentColor = video.pixels[loc];
      let r1 = video.pixels[loc];
      let g1 = video.pixels[loc+1];
      let b1 = video.pixels[loc+2];

      let r2 = red(trackColor);
      let g2 = green(trackColor);
      let b2 = blue(trackColor);

      let d = distSq(r1, g1, b1, r2, g2, b2);

      if (d < threshold*threshold) {

        let found = false;
        for (let i in dataPoints) {
          b=dataPoints[i];
          //console.log(b);
          if (b.isNear(x, y)) {

            b.addPixels(x, y);
            found = true;
            //break;
          }
        }

        if (!found) {
          let b = new Blob(x, y);
          dataPoints.push(b);
        }
      }


    }
  }


  for (let i in dataPoints) {
    b=dataPoints[i];
    //IMPORTANT: here is where the size of the data points is defined
    if (b.size() > 10) {
     b.show();

     //IMPORTANT: here is where values of the data points on the screen are assigned/mapped to temperature values
     tempValues.push(map(b.centerY, gridLimitUp,gridLimitDown, maxTemp,minTemp));
    }
  }


}

/*
function distSq(x1, y1, x2, y2) {
  let d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
  return d;
}
*/

function distSq(x1, y1, z1, x2, y2, z2) {
  var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1);
  return d;
}
