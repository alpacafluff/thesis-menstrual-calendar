/*
[DATA POINT DETECTOR TEST FOR MENSTRUAL CALENDAR]

Processing Sketch

** In progress, the grid limit warping is still not fully functional **

This sketch was built with the help of Sejo Vega-Cebrián, using Daniel Shiffman's blob detection algorithm
https://github.com/CodingTrain/website/blob/master/Tutorials/Processing/11_video/sketch_11_7_BlobTracking/sketch_11_7_BlobTracking.pde
*/

//Import Processing Video Library
import processing.video.*;

Capture video;

//IMPORTANT: the variable 'trackColor' defines which color the program will be looking out for, here the colors are currently hardcoded
color trackColor;
//The variable 'threshold' defines the minimum size of for a data point (an object defined in this program  of the Blob class, defined in the Blob.pde file) to be detected
float threshold = 15;

//The variable 'distThreshold' defines the minimum space that a data point must be from another so as not to be put into the same Blob object
float distThreshold = 20;

//The following variables ('gridLimitUp','gridLimitDown', 'gridLimitLeft','gridLimitRight' ) establish the area of the image the program must read in order to get the values
float gridLimitUp= 155; //y1
float gridLimitDown= 702; //y2
float gridLimitLeft= 142; //x1
float gridLimitRight= 782; //x2

// These are the temperature minimum and maximum ranges that will define the values of each data point, including decimals
float minTemp= 97; //
float maxTemp= 99; //


// 'dataPoints' is an array that stores the data points detected in the picture, uses the Blob class defined in the linked file
ArrayList<Blob> dataPoints = new ArrayList<Blob>();
// 'tempValues' is an array that stores the temperature values of each data point detected in the picture
ArrayList<Float> tempValues = new ArrayList<Float>();

void setup() {
  //size of viewport
  size(1296, 972);
  //calls all available cameras on device
  String[] cameras = Capture.list();
  //prints on console all available cameras on device
  printArray(cameras);
  //this code is using a WebCam on 'channel'/position 18 of the 'cameras' array
  video = new Capture(this, cameras[18]);
  video.start();

  //IMPORTANT: the variable 'trackColor' defines which color the program will be looking out for, here the colors are currently hardcoded
  trackColor = color(59, 23, 22);
}

void captureEvent(Capture video) {
  video.read();
}

void keyPressed() {

 if (key == 'q'){
    // Pressing 'q' on keyboard will reveal the number of data points detected by the program
    noLoop();
    int dataPointCounter=0;
        for (Blob b : dataPoints) {
          if (b.size() > 35) {
            dataPointCounter++;
          }
        }
        println("There are "+dataPointCounter+" data points in this picture");
  }

  else if(key == 'w'){
        noLoop();
        println("The coordinates of all data points in this picture are: ");
        for (Blob b : dataPoints) {
          if (b.size() > 35) {
             println("x: "+b.centerx+", y: "+b.centery);
          }
        }
    }


  else if(key == 'a'){
    for (int i=0; i < tempValues.size(); i++)
    {
      println("The temperature for cycle day "+(i+1)+" is : "+tempValues.get(i));
    }

  }

}

void draw() {
  video.loadPixels();
  image(video, 0, 0);

  stroke(0,255,0);
  noFill();
  strokeWeight(2);
  line(gridLimitLeft,gridLimitUp,gridLimitRight,gridLimitUp);
  line(gridLimitLeft,gridLimitDown,gridLimitRight,gridLimitDown);


  dataPoints.clear();
  tempValues.clear();



  // Begin loop to walk through every pixel
  for (int x = 0; x < video.width; x++ ) {
    for (int y = 0; y < video.height; y++ ) {
      int loc = x + y * video.width;
      // What is current color
      color currentColor = video.pixels[loc];
      float r1 = red(currentColor);
      float g1 = green(currentColor);
      float b1 = blue(currentColor);
      float r2 = red(trackColor);
      float g2 = green(trackColor);
      float b2 = blue(trackColor);

      float d = distSq(r1, g1, b1, r2, g2, b2);

      if (d < threshold*threshold) {

        boolean found = false;
        for (Blob b : dataPoints) {
          if (b.isNear(x, y)) {
            b.add(x, y);
            found = true;
            break;
          }
        }

        if (!found) {
          Blob b = new Blob(x, y);
          dataPoints.add(b);
        }
      }
    }
  }


  for (Blob b : dataPoints) {
    //IMPORTANT: here is where the size of the data points is defined
    if (b.size() > 35) {
     b.show();

     //IMPORTANT: here is where values of the data points on the screen are assigned/mapped to temperature values
     tempValues.add(map(b.centery, gridLimitUp,gridLimitDown, maxTemp,minTemp));
    }
  }
}


float distSq(float x1, float y1, float x2, float y2) {
  float d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
  return d;
}


float distSq(float x1, float y1, float z1, float x2, float y2, float z2) {
  float d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1);
  return d;
}
